import { createStore } from '@tanstack/react-store'
import type { User } from '#/schemas/user.schema'

// ── Types ──────────────────────────────────────────────────────────────────

export interface AuthState {
  user: User | null
  /** True while the initial session bootstrap is running. */
  isLoading: boolean
}

// ── Store ──────────────────────────────────────────────────────────────────

/**
 * UI-facing session state — memory only.
 *
 * The session itself lives in HttpOnly cookies owned by the backend, so no
 * token or profile is persisted to localStorage (XSS-safe by construction).
 * On reload the session is restored silently via the auth worker before any
 * route guard runs (see `guard/auth-session.ts`).
 */
export const authStore = createStore<AuthState>({ user: null, isLoading: false })

// ── Sync reads (for non-React contexts: route guards, API interceptors) ────

/** Returns true when a session is established (user profile present). */
export function isAuthenticated(): boolean {
  return authStore.state.user !== null
}

// ── Store actions ──────────────────────────────────────────────────────────

/** Store the authenticated user profile (memory only). */
export function setAuthUser(user: User | null) {
  authStore.setState((prev) => ({ ...prev, user }))
}

export function setAuthLoading(isLoading: boolean) {
  authStore.setState((prev) => ({ ...prev, isLoading }))
}

/** Clear the session — used on logout / failed validation. */
export function clearAuth() {
  authStore.setState(() => ({ user: null, isLoading: false }))
}
