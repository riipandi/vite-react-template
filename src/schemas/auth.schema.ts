import { z } from 'zod'
import type { User } from '#/schemas/user.schema'

export const loginSchema = z.object({
  username: z.string().min(1, { error: 'Username is required' }),
  password: z.string().min(1, { error: 'Password is required' })
})

/** Auth response includes the user profile plus token pair. */
export interface LoginResponse extends User {
  gender: string
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  username: string
  password: string
}
