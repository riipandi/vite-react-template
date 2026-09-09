import { z } from 'zod'
import type { User } from '#/schemas/user.schema'

export const loginSchema = z.object({
  username: z.string().min(1, { error: 'Username is required' }),
  password: z.string().min(1, { error: 'Password is required' })
})

/**
 * Login response body. Tokens arrive as HttpOnly cookies and are
 * intentionally not modeled here — only the user profile is consumed.
 */
export type LoginResponse = User & Record<string, unknown>

/** Login request payload — single source of truth is the validation schema. */
export type LoginCredentials = z.infer<typeof loginSchema>
