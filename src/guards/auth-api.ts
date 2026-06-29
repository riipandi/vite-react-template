import { ofetch } from 'ofetch'
import { authStore, setAuthTokens } from '#/guards/auth-store'
import { api, API_BASE_URL } from '#/libraries/api-client'
import type { LoginCredentials, LoginResponse } from '#/schemas/auth.schema'
import type { User } from '#/schemas/user.schema'

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
 * Call the refresh endpoint with the stored refresh token.
 * Returns new tokens, throws on failure.
 */
async function refreshTokens(): Promise<{ accessToken: string; refreshToken: string }> {
  const storedRefreshToken = authStore.state.refreshToken

  if (!storedRefreshToken) {
    throw new Error('No refresh token available')
  }

  return ofetch<{ accessToken: string; refreshToken: string }>(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    body: { refreshToken: storedRefreshToken, expiresInMins: 30 }
  })
}

/**
 * Try to refresh the access token. Returns true on success, false on failure.
 * Stores the new tokens on success.
 */
export async function tryRefresh(): Promise<boolean> {
  try {
    const result = await refreshTokens()
    setAuthTokens(result.accessToken, result.refreshToken)
    return true
  } catch {
    return false
  }
}
