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
