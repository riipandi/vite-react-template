import type { FetchError } from 'ofetch'
import { ofetch } from 'ofetch'
import type { LoginCredentials, LoginResponse } from '#/schemas/auth.schema'
import type { User } from '#/schemas/user.schema'

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return ofetch<LoginResponse>('https://dummyjson.com/auth/login', {
    method: 'POST',
    body: credentials
  })
}

export async function me(token: string): Promise<User> {
  return ofetch<User>('https://dummyjson.com/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem('access_token')
}

export function setToken(token: string | null) {
  if (typeof window === 'undefined') return
  if (token) {
    window.localStorage.setItem('access_token', token)
  } else {
    window.localStorage.removeItem('access_token')
  }
}

export function isAuthenticated(): boolean {
  return getToken() !== null
}

/**
 * Extract a user-facing error message from an `ofetch` FetchError.
 * Falls back to a generic message when the shape is unexpected.
 */
export function getErrorMessage(error: unknown): string {
  const fetchError = error as FetchError
  if (fetchError?.data?.message) return fetchError.data.message
  if (fetchError?.message) return fetchError.message
  if (error instanceof Error) return error.message
  return 'An unexpected error occurred'
}
