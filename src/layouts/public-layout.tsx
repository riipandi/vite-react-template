import { Navigate, Outlet } from '@tanstack/react-router'
import { useAuthentication } from '#/context/auth/AuthProvider'

export function PublicLayout() {
  const { loggedIn } = useAuthentication()

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
