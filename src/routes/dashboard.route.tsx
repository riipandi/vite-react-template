import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '#/lib/auth'
import { SideNavbar } from '#/layouts/sidebar'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <main className="flex h-full min-h-screen items-center bg-gray-100 dark:bg-slate-900">
      <SideNavbar collapsed={false} />
      <Outlet />
    </main>
  )
}
