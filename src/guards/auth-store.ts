import { createStore, useSelector } from '@tanstack/react-store'
import type { User } from '#/schemas/user.schema'

// ── Types ──────────────────────────────────────────────────────────────────

export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  /** True while validating a stored token on initial load. */
  isLoading: boolean
}

// ── Internal localStorage helpers ──────────────────────────────────────────
// These are kept private to the store module. External consumers read from
// `authStore.state` or use the exported hooks.

const USER_STORAGE_KEY = 'auth_user'

function getStoredAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem('access_token')
}

function getStoredRefreshToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem('refresh_token')
}

function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(USER_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

function persistTokens(accessToken: string, refreshToken?: string | null) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem('access_token', accessToken)
  if (refreshToken !== undefined) {
    if (refreshToken) {
      window.localStorage.setItem('refresh_token', refreshToken)
    } else {
      window.localStorage.removeItem('refresh_token')
    }
  }
}

function persistUser(user: User | null) {
  if (typeof window === 'undefined') return
  if (user) {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  } else {
    window.localStorage.removeItem(USER_STORAGE_KEY)
  }
}

function clearPersistedAuth() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem('access_token')
  window.localStorage.removeItem('refresh_token')
  window.localStorage.removeItem(USER_STORAGE_KEY)
}

// ── Store ──────────────────────────────────────────────────────────────────

/** Hydrate from localStorage so the UI isn't blank on page reload. */
const initial: AuthState = {
  accessToken: getStoredAccessToken(),
  refreshToken: getStoredRefreshToken(),
  user: getStoredUser(),
  isLoading: getStoredAccessToken() !== null
}

export const authStore = createStore<AuthState>(initial)

// ── Sync reads (for non-React contexts: route guards, API interceptors) ────

/** Read access token synchronously. */
export function getAccessToken(): string | null {
  return authStore.state.accessToken
}

/** Returns true when an access token exists. */
export function isAuthenticated(): boolean {
  return authStore.state.accessToken !== null
}

// ── Store actions ──────────────────────────────────────────────────────────

/** Persist tokens to localStorage and update the store reactively. */
export function setAuthTokens(accessToken: string, refreshToken?: string | null) {
  persistTokens(accessToken, refreshToken)
  authStore.setState((prev) => ({
    ...prev,
    accessToken,
    refreshToken: refreshToken !== undefined ? refreshToken : prev.refreshToken
  }))
}

/** Persist the user profile to localStorage and update the store reactively. */
export function setAuthUser(user: User | null) {
  persistUser(user)
  authStore.setState((prev) => ({ ...prev, user }))
}

export function setAuthLoading(isLoading: boolean) {
  authStore.setState((prev) => ({ ...prev, isLoading }))
}

/** Clear tokens, user, and loading state — used on logout / failed validation. */
export function clearAuth() {
  clearPersistedAuth()
  authStore.setState(() => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    isLoading: false
  }))
}

// ── Hooks ──────────────────────────────────────────────────────────────────

export function useAuth(): AuthState {
  return useSelector(authStore, (state) => state)
}

export function useLoggedIn(): boolean {
  return useSelector(authStore, (state) => state.accessToken !== null && state.user !== null)
}

export function useAuthLoading(): boolean {
  return useSelector(authStore, (state) => state.isLoading)
}

export function useAuthUser(): User | null {
  return useSelector(authStore, (state) => state.user)
}
