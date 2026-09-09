import { api } from '#/libraries/api-client'
import type { User } from '#/schemas/user.schema'
import { API_BASE_URL } from './auth-engine'
import { authStore, clearAuth, setAuthLoading, setAuthUser } from './auth-store'
import { authWorker } from './auth-worker-client'

/**
 * Fetch the current user profile. The cookie session is attached
 * automatically by the browser (`credentials: 'include'`); a 401 triggers the
 * api client's silent-refresh-and-retry flow via the auth worker.
 */
export async function me(): Promise<User> {
  return api<User>('/auth/me')
}

/**
 * Cheap session presence probe — responds 200 (demo middleware or the real
 * backend), so anonymous visitors never trigger a 401 console error.
 *
 * The endpoint is part of the production backend contract. When it is not
 * reachable (e.g. a purely static deployment without a same-site API), warn
 * once and treat the visitor as logged out.
 */
let probeWarned = false
async function hasSessionCookie(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/session`)
    if (!response.ok) {
      throw new Error(`unexpected status ${response.status}`)
    }
    const data = (await response.json()) as { authenticated?: boolean }
    return data.authenticated === true
  } catch {
    if (!probeWarned) {
      probeWarned = true
      console.warn(
        '[auth] GET /auth/session unreachable — treat as logged out. ' +
          'Cookie auth requires a same-site API: set PUBLIC_API_URL to your backend ' +
          '(same parent domain) or proxy /api server-side. See README "Deploying the SPA".'
      )
    }
    return false
  }
}

let bootPromise: Promise<void> | null = null

/**
 * Restore the session once per app lifecycle, from the HttpOnly cookie.
 *
 * Awaited by route guards (`beforeLoad`) and kicked off by `AuthProvider`, so
 * the silent refresh never races navigation. On reload this first probes for
 * cookie presence (never a 401); only when a session cookie exists does it
 * call `me()` — whose 401 path triggers the api client interceptor (refresh
 * through the auth worker, then retry).
 */
export function ensureSessionLoaded(): Promise<void> {
  if (!bootPromise) bootPromise = bootstrap()
  return bootPromise
}

async function bootstrap() {
  // Session already in memory (e.g. HMR or a completed bootstrap).
  if (authStore.state.user) return

  setAuthLoading(true)
  try {
    if (await hasSessionCookie()) {
      setAuthUser(await me())
    } else {
      clearAuth()
    }
  } catch {
    clearAuth()
  } finally {
    setAuthLoading(false)
  }
}

/**
 * Proactive refresh for tab-focus events. No-op when logged out; clears the
 * session when the worker reports it can no longer be renewed.
 */
export async function refreshIfExpiring(withinMs: number): Promise<void> {
  if (!authStore.state.user) return
  const ok = await authWorker().maybeRefresh(withinMs)
  if (!ok) clearAuth()
}
