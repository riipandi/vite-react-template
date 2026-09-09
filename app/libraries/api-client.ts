import { QueryClient } from '@tanstack/react-query'
import { ofetch } from 'ofetch'
import { API_BASE_URL } from '#/libraries/guard/auth-engine'
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
 * - Base URL from `PUBLIC_API_URL` env var (defaults to `/api` — the same-origin
 *   dev proxy to the demo backend; see `vite.config.ts`).
 *
 * All backend API calls should import `api` from here.
 */
export const api = ofetch.create({
  baseURL: API_BASE_URL,
  credentials: 'include',
  retry: 1,
  retryStatusCodes: [401],
  async onResponseError({ response }) {
    // Silent refresh on 401, then ofetch retries the request. If the refresh
    // fails, clear auth — the route beforeLoad guard redirects to login.
    if (response.status !== 401) return
    const refreshed = await authWorker().refresh()
    if (!refreshed) {
      clearAuth()
    }
  }
})
