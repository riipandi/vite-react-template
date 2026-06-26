import { api, refreshTokens } from '#/libraries/api-client'
import type { LoginCredentials, LoginResponse } from '#/schemas/auth.schema'
import type { User } from '#/schemas/user.schema'

// ── Token management ─────────────────────────────────────────────────────

/** Read the stored access token (or null if absent). */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem('access_token')
}

/** Persist (or clear) tokens. Pass null to remove. */
export function setToken(accessToken: string | null, refreshToken?: string | null) {
  if (typeof window === 'undefined') return
  if (accessToken) {
    window.localStorage.setItem('access_token', accessToken)
  } else {
    window.localStorage.removeItem('access_token')
  }
  if (refreshToken !== undefined) {
    if (refreshToken) {
      window.localStorage.setItem('refresh_token', refreshToken)
    } else {
      window.localStorage.removeItem('refresh_token')
    }
  }
}

/** Remove all auth tokens from storage. */
export function clearTokens() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem('access_token')
  window.localStorage.removeItem('refresh_token')
}

// ── User persistence ─────────────────────────────────────────────────────

const USER_STORAGE_KEY = 'auth_user'

/** Read cached user profile from storage (null if absent). */
export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(USER_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

/** Persist or clear the cached user profile. */
export function setStoredUser(user: User | null) {
  if (typeof window === 'undefined') return
  if (user) {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  } else {
    window.localStorage.removeItem(USER_STORAGE_KEY)
  }
}

// ── Auth status ──────────────────────────────────────────────────────────

/** Returns true when an access token exists in storage. */
export function isAuthenticated(): boolean {
  return getToken() !== null
}

// ── API calls ────────────────────────────────────────────────────────────

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return api<LoginResponse>('/auth/login', {
    method: 'POST',
    body: credentials
  })
}

/** Fetch the current user profile. Token is auto-attached by the `api` client. */
export async function me(): Promise<User> {
  return api<User>('/auth/me')
}

/**
 * Try to refresh the access token. Returns true on success, false on failure.
 * Stores the new tokens on success.
 */
export async function tryRefresh(): Promise<boolean> {
  try {
    const result = await refreshTokens()
    setToken(result.accessToken, result.refreshToken)
    return true
  } catch {
    return false
  }
}

// ── Error handling ───────────────────────────────────────────────────────

/**
 * Extract a human-readable message from an error.
 * Handles `ofetch` FetchError shapes, standard Errors, and fallback text.
 */
export function getErrorMessage(error: unknown): string {
  const fetchError = error as {
    data?: { message?: string }
    message?: string
    status?: number
  }
  if (fetchError?.data?.message) return fetchError.data.message
  if (fetchError?.message) return fetchError.message
  if (error instanceof Error) return error.message
  return 'An unexpected error occurred'
}
