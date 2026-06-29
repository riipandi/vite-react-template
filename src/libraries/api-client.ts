import { QueryClient } from '@tanstack/react-query'
import { ofetch } from 'ofetch'
import { authStore, getAccessToken, setAuthTokens, clearAuth } from '#/guards/auth-store'

export const API_BASE_URL = import.meta.env.PUBLIC_API_URL ?? 'https://dummyjson.com'

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0
    },
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      retry: 1
    }
  }
})

/**
 * Try to refresh the access token using the stored refresh token.
 * Inlined here to avoid circular dependency with auth-api.ts.
 */
async function tryRefreshToken(): Promise<boolean> {
  const storedRefreshToken = authStore.state.refreshToken
  if (!storedRefreshToken) return false

  try {
    const result = await ofetch<{ accessToken: string; refreshToken: string }>(
      `${API_BASE_URL}/auth/refresh`,
      {
        method: 'POST',
        body: { refreshToken: storedRefreshToken, expiresInMins: 30 }
      }
    )
    setAuthTokens(result.accessToken, result.refreshToken)
    return true
  } catch {
    return false
  }
}

/**
 * - Attaches `Authorization: Bearer <token>` from auth store automatically.
 * - On 401, attempts silent token refresh and retries the request.
 * - Base URL from `PUBLIC_API_URL` env var (defaults to dummyjson for demos).
 *
 * All backend API calls should import `api` from here.
 */
export const api = ofetch.create({
  baseURL: API_BASE_URL,
  onRequest({ options }) {
    const token = getAccessToken()
    if (!token) return
    const headers = new Headers(options.headers)
    headers.set('Authorization', `Bearer ${token}`)
    options.headers = headers
  },
  async onResponseError({ response }) {
    // Silently refresh the token on 401, then retry with the new token.
    // If refresh fails, clear auth — the route beforeLoad guard redirects to login.
    if (response.status !== 401) return
    const refreshed = await tryRefreshToken()
    if (!refreshed) {
      clearAuth()
    }
  },
  retry: 1,
  retryStatusCodes: [401]
})
