import { QueryClient } from '@tanstack/react-query'
import { ofetch } from 'ofetch'
import { getAccessToken } from '#/guards/auth-store'

export const API_BASE_URL = import.meta.env.PUBLIC_API_URL ?? 'https://dummyjson.com'

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

/**
 * - Attaches `Authorization: Bearer <token>` from localStorage automatically.
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
  }
})
