import { api } from '#/libraries/api-client'
import type { User } from '#/schemas/user.schema'

/**
 * Fetch the current user profile.
 * The cookie session is attached automatically by the browser
 * (`credentials: 'include'`); a 401 triggers the api client's
 * silent-refresh-and-retry flow via the auth worker.
 */
export async function me(): Promise<User> {
  return api<User>('/auth/me')
}
