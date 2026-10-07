import { QueryClient } from '@tanstack/react-query'
import { ofetch } from 'ofetch'
import { API_BASE_URL } from '#/libraries/constants'
import { clearAuth } from '#/libraries/guard/auth-store'
import { authWorker } from '#/libraries/guard/auth-worker-client'

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
 * - Sends the HttpOnly cookie session with every request (`credentials: 'include'`).
 * - On 401, performs a single-flight silent refresh via the auth worker and
 *   retries the request (the browser attaches the fresh cookie automatically).
 * - Base URL from `PUBLIC_API_URL` envar defaults to `/api`.
 *
 * All backend API calls should import `api` from here.
 */
export const api = ofetch.create({
  baseURL: API_BASE_URL,
  credentials: 'include',
  retry: 1,
  retryStatusCodes: [401],
  async onResponseError({ response }) {
    if (response.status !== 401) return
    const refreshed = await authWorker().refresh()
    if (!refreshed) {
      clearAuth()
    }
  }
})
