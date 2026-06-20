import { Navigate, Outlet } from '@tanstack/react-router'
import { useAuthentication } from '#/context/auth/AuthProvider'

import { SideNavbar } from './sidebar'

export function AppLayout() {
  const { loggedIn } = useAuthentication()

  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    <main className="flex h-full min-h-screen items-center bg-gray-100 dark:bg-slate-900">
      <SideNavbar collapsed={false} />
      <Outlet />
    </main>
  )
}
