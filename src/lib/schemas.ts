import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, { error: 'Username is required' }),
  password: z.string().min(1, { error: 'Password is required' })
})

export const recoverySchema = z.object({
  email: z.email({ error: 'Invalid email address' })
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { error: 'Password must have at least 8 characters' })
    .max(128, { error: 'Password must be less than 128 characters' })
})

export type LoginFields = z.infer<typeof loginSchema>
export type RecoveryFields = z.infer<typeof recoverySchema>
export type ResetPasswordFields = z.infer<typeof resetPasswordSchema>
