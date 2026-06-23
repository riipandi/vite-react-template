import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, { error: 'Username is required' }),
  password: z.string().min(1, { error: 'Password is required' })
})

export interface LoginResponse {
  id: number
  email: string
  firstName: string
  lastName: string
  username: string
  image: string
  gender: string
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  username: string
  password: string
}
