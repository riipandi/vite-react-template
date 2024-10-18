import { Navigate, Outlet } from 'react-router-dom'

import { useAuthentication } from '@/hooks/AuthProvider'

export function PublicLayout() {
  const { loggedIn } = useAuthentication()

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
