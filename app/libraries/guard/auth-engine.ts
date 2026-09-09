import { ofetch } from 'ofetch'
import type { LoginCredentials, LoginResponse } from '#/schemas/auth.schema'
import type { User } from '#/schemas/user.schema'

/**
 * Base URL for all auth requests. Defaults to `/api` — the same-origin Vite
 * dev proxy (see `vite.config.ts`) which forwards to the demo backend. In
 * production, point `PUBLIC_API_URL` at the real backend (same parent domain
 * so the HttpOnly session cookies are first-party).
 */
export const API_BASE_URL = import.meta.env.PUBLIC_API_URL ?? '/api'

/** Session TTL requested from the backend, in minutes. Cookie Max-Age follows this. */
const SESSION_TTL_MINS = 60

/** TTL requested for a "remember me" session: 30 days. */
const PERSISTENT_TTL_MINS = 60 * 24 * 30

/** Refresh this long before the session expires. */
const PROACTIVE_MARGIN_MS = 60_000

/** Skip repeated refresh attempts within this window after a failure. */
const REFRESH_COOLDOWN_MS = 5_000

/** Options for {@link AuthEngineApi.login}. */
export interface AuthLoginOptions {
  /**
   * Persistent session. The backend should honor this by issuing a long-lived
   * refresh cookie (production contract); the demo backend approximates it by
   * extending both cookie lifetimes to 30 days.
   */
  rememberMe?: boolean
}

/**
 * Transport-agnostic authn engine. Runs inside the Comlink worker (default) or
 * on the main thread as a fallback (SSR, tests, CSP-restricted environments).
 *
 * The session lives in HttpOnly cookies set by the backend — no token ever
 * passes through this module's API or the main thread's JS. The engine only
 * orchestrates: login, single-flight refresh, and proactive renewal.
 */
export interface AuthEngineApi {
  /** Validate credentials and establish the cookie session. Resolves with the user profile. */
  login(credentials: LoginCredentials, options?: AuthLoginOptions): Promise<User>
  /** Silent refresh — single-flight. Resolves `true` when a session is established. */
  refresh(): Promise<boolean>
  /** Refresh only when the session expires within `withinMs`. Resolves `true` when still valid. */
  maybeRefresh(withinMs: number): Promise<boolean>
  /** Terminate the session server-side (the backend clears the HttpOnly cookies). */
  logout(): Promise<void>
}

export function createAuthEngine(baseURL: string = API_BASE_URL): AuthEngineApi {
  const request = ofetch.create({ baseURL, credentials: 'include', retry: 0 })

  let expiresAt = 0
  let refreshInFlight: Promise<boolean> | null = null
  let lastFailedRefreshAt = 0
  let refreshTimer: ReturnType<typeof setTimeout> | null = null
  /** Session generation — bumped by login/logout to discard stale in-flight refreshes. */
  let sessionEpoch = 0
  /** TTL requested for the active session — remember-me sessions live longer. */
  let sessionTtlMins = SESSION_TTL_MINS

  function clearTimer() {
    if (refreshTimer) {
      clearTimeout(refreshTimer)
      refreshTimer = null
    }
  }

  function scheduleProactiveRefresh() {
    clearTimer()
    const delay = Math.max(expiresAt - PROACTIVE_MARGIN_MS - Date.now(), 0)
    refreshTimer = setTimeout(() => {
      refreshTimer = null
      void api.refresh()
    }, delay)
  }

  async function doRefresh(): Promise<boolean> {
    // Snapshot the generation: if logout (or a fresh login) happens while the
    // request is in flight, its result must not resurrect the old session.
    const epoch = sessionEpoch
    try {
      await request('/auth/refresh', {
        method: 'POST',
        body: { expiresInMins: sessionTtlMins }
      })
      if (epoch !== sessionEpoch) return false
      expiresAt = Date.now() + sessionTtlMins * 60_000
      scheduleProactiveRefresh()
      return true
    } catch {
      if (epoch !== sessionEpoch) return false
      expiresAt = 0
      lastFailedRefreshAt = Date.now()
      clearTimer()
      return false
    }
  }

  const api: AuthEngineApi = {
    async login(credentials, { rememberMe = false }: AuthLoginOptions = {}) {
      // A new session supersedes any in-flight refresh from the previous one.
      sessionEpoch++
      sessionTtlMins = rememberMe ? PERSISTENT_TTL_MINS : SESSION_TTL_MINS
      // Tokens arrive as HttpOnly cookies and are intentionally stripped —
      // only the user profile crosses back to the main thread. The
      // `rememberMe` flag is part of the production backend contract.
      const response = await request<LoginResponse>('/auth/login', {
        method: 'POST',
        body: { ...credentials, rememberMe, expiresInMins: sessionTtlMins }
      })
      expiresAt = Date.now() + sessionTtlMins * 60_000
      scheduleProactiveRefresh()
      return toUser(response)
    },

    refresh() {
      // Single-flight: concurrent callers share one in-flight refresh.
      if (refreshInFlight) return refreshInFlight
      // Cooldown: a refresh that just failed stays failed for a moment.
      if (Date.now() - lastFailedRefreshAt < REFRESH_COOLDOWN_MS) return Promise.resolve(false)
      refreshInFlight = doRefresh().finally(() => {
        refreshInFlight = null
      })
      return refreshInFlight
    },

    async maybeRefresh(withinMs) {
      if (expiresAt && Date.now() < expiresAt - withinMs) return true
      return api.refresh()
    },

    async logout() {
      // Invalidate any in-flight refresh first — its result must not land
      // after the session is gone.
      sessionEpoch++
      clearTimer()
      expiresAt = 0
      sessionTtlMins = SESSION_TTL_MINS
      try {
        // Best effort: the demo proxy middleware clears the cookies; the real
        // backend must implement this endpoint. Ignore 404/network failures.
        await request('/auth/logout', { method: 'POST' })
      } catch {
        // Session cleanup is not critical — cookies expire on their own.
      }
    }
  }

  return api
}

/** Pick only the profile fields — drop the token pair from the response body. */
function toUser(response: LoginResponse): User {
  const { id, email, firstName, lastName, username, image } = response
  return { id, email, firstName, lastName, username, image }
}
