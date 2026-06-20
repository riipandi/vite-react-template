import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '#/lib/auth'
import Login from '#/pages/auth/login'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard/overview' })
    }
  },
  component: Login,
})
