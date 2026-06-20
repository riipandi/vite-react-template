import { createFileRoute } from '@tanstack/react-router'
import ResetPassword from '#/pages/auth/reset-password'

export const Route = createFileRoute('/reset-password')({
  component: ResetPassword,
})
