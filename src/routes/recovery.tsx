import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '#/lib/auth'
import Recovery from '#/pages/auth/recovery'

export const Route = createFileRoute('/recovery')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard/overview' })
    }
  },
  component: Recovery,
})
