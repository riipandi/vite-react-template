import { FetchError } from 'ofetch'

/**
 * Extract a human-readable message from an error.
 * Handles `ofetch` FetchError shapes, standard Errors, and fallback text.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof FetchError) {
    return error.data?.message ?? error.message
  }
  if (error instanceof Error) return error.message
  return 'An unexpected error occurred'
}

/**
 * Validate a `return_to` redirect target. Only same-origin relative paths
 * are allowed (must start with a single `/`) — blocks open redirects like
 * `//evil.com` or `https://evil.com`.
 */
export function safeReturnTo(value: string | undefined | null): string | null {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return null
  return value
}
