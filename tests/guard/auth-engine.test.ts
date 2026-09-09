import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createAuthEngine } from '#/libraries/guard/auth-engine'

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  })
}

const profile = {
  id: 1,
  email: 'emilys@x.dummyjson.com',
  firstName: 'Emily',
  lastName: 'Johnson',
  username: 'emilys',
  image: 'emilys.png',
  accessToken: 'at',
  refreshToken: 'rt'
}

describe('auth engine', () => {
  let fetchMock: ReturnType<typeof vi.fn<(input: unknown, init?: unknown) => Promise<Response>>>

  beforeEach(() => {
    fetchMock = vi.fn<(input: unknown, init?: unknown) => Promise<Response>>()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('dedupes concurrent refreshes into a single network request', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ accessToken: 'a', refreshToken: 'r' }))
    const engine = createAuthEngine('http://test.local')

    const results = await Promise.all([engine.refresh(), engine.refresh(), engine.refresh()])

    expect(results).toEqual([true, true, true])
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain('/auth/refresh')
  })

  it('short-circuits during the cooldown after a failed refresh', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ message: 'invalid token' }, 401))
    const engine = createAuthEngine('http://test.local')

    await expect(engine.refresh()).resolves.toBe(false)
    const callsAfterFailure = fetchMock.mock.calls.length

    await expect(engine.refresh()).resolves.toBe(false)
    expect(fetchMock.mock.calls.length).toBe(callsAfterFailure)
  })

  it('discards an in-flight refresh that settles after logout', async () => {
    let release!: () => void
    const gate = new Promise<void>((resolve) => (release = resolve))
    fetchMock.mockImplementationOnce(() =>
      gate.then(() => jsonResponse({ accessToken: 'a', refreshToken: 'r' }))
    )
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }))

    const engine = createAuthEngine('http://test.local')
    const pendingRefresh = engine.refresh()

    await engine.logout()
    release()

    await expect(pendingRefresh).resolves.toBe(false)
  })

  it('resolves login with the user profile only — token fields are stripped', async () => {
    fetchMock.mockResolvedValue(jsonResponse(profile))
    const engine = createAuthEngine('http://test.local')

    const user = await engine.login({ username: 'emilys', password: 'emilyspass' })

    expect(user).toEqual({
      id: 1,
      email: 'emilys@x.dummyjson.com',
      firstName: 'Emily',
      lastName: 'Johnson',
      username: 'emilys',
      image: 'emilys.png'
    })
    expect(user).not.toHaveProperty('accessToken')
    expect(user).not.toHaveProperty('refreshToken')
  })

  it('skips the network in maybeRefresh while the session is still fresh', async () => {
    fetchMock.mockResolvedValue(jsonResponse(profile))
    const engine = createAuthEngine('http://test.local')
    await engine.login({ username: 'emilys', password: 'emilyspass' })
    const callsAfterLogin = fetchMock.mock.calls.length

    await expect(engine.maybeRefresh(5 * 60_000)).resolves.toBe(true)
    expect(fetchMock.mock.calls.length).toBe(callsAfterLogin)
  })
})
