import { authStore, clearAuth, setAuthLoading, setAuthUser } from '#/libraries/auth.store'
import { me } from './auth-api'
import { authWorker } from './auth-worker-client'

let bootPromise: Promise<void> | null = null

/**
 * Restore the session once per app lifecycle, from the HttpOnly cookie.
 *
 * Awaited by route guards (`beforeLoad`) and kicked off by `AuthProvider`, so
 * the silent refresh never races navigation. On reload this runs `me()`; a 401
 * triggers the api client interceptor, which refreshes through the auth worker
 * and retries before the guard decides anything.
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
    setAuthUser(await me())
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
