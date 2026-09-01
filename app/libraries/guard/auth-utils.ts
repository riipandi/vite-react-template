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
