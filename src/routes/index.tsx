import { useRoutes } from 'react-router-dom'

import { AppLayout, AuthLayout } from '@/components/Layouts'
import { withAdmin, withLoggedIn, withLoggedOut } from '@/hooks/AuthContext'
import Error404 from '@/pages/404'
import { AdminDashboard } from '@/pages/admin'
import { Login, Recovery, ResetPassword } from '@/pages/auth'
import Home from '@/pages/Home'
import { UserDashboard } from '@/pages/users'

export const AppRoutes = () => {
  return useRoutes([
    { path: '/', element: <Home /> },
    {
      element: <AuthLayout />,
      children: [
        { path: 'login', element: withLoggedOut(Login)() },
        { path: 'recovery', element: withLoggedOut(Recovery)() },
        { path: 'reset-password', element: withLoggedOut(ResetPassword)() },
      ],
    },
    {
      element: <AppLayout />,
      children: [
        { path: 'dashboard', element: withLoggedIn(UserDashboard)() },
        { path: 'admin', element: withAdmin(AdminDashboard)() },
      ],
    },
    { path: '*', element: <Error404 /> },
  ])
}
