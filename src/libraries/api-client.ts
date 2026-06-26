import { QueryClient } from '@tanstack/react-query'
import { ofetch } from 'ofetch'

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0
    },
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1
    }
  }
})

const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL ?? 'https://dummyjson.com'

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem('access_token')
}

/**
 * - Attaches `Authorization: Bearer <token>` from localStorage automatically.
 * - Base URL from `PUBLIC_API_BASE_URL` env var (defaults to dummyjson for demos).
 *
 * All backend API calls should import `api` from here.
 */
export const api = ofetch.create({
  baseURL: BASE_URL,
  onRequest({ options }) {
    const token = getAccessToken()
    if (!token) return
    const headers = new Headers(options.headers)
    headers.set('Authorization', `Bearer ${token}`)
    options.headers = headers
  }
})

/**
 * Attempt to refresh tokens using a stored refresh token.
 * Throws on failure — caller should handle the error.
 */
export async function refreshTokens(): Promise<{
  accessToken: string
  refreshToken: string
}> {
  const storedRefreshToken =
    typeof window !== 'undefined' ? window.localStorage.getItem('refresh_token') : null

  if (!storedRefreshToken) {
    throw new Error('No refresh token available')
  }

  return ofetch<{ accessToken: string; refreshToken: string }>(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    body: { refreshToken: storedRefreshToken, expiresInMins: 30 }
  })
}
