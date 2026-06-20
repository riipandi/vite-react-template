import { createFileRoute } from '@tanstack/react-router'
import UserDashboard from '#/pages/users/dashboard'

export const Route = createFileRoute('/dashboard/overview')({
  component: UserDashboard,
})
