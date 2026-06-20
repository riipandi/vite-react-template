import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '#/lib/auth'
import Home from '#/pages/home'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard/overview' })
    }
  },
  component: Home,
})
