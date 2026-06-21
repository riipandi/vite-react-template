import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export const recoverySchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must have at least 8 characters')
    .max(128, 'Password must be less than 128 characters'),
})

export type LoginFields = z.infer<typeof loginSchema>
export type RecoveryFields = z.infer<typeof recoverySchema>
export type ResetPasswordFields = z.infer<typeof resetPasswordSchema>
