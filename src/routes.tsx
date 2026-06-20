import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import { AppLayout } from './layouts/app-layout'
import { AuthLayout } from './layouts/auth-layout'
import { PublicLayout } from './layouts/public-layout'
import { RootLayout } from './layouts/root-layout'
import { Login, Recovery, ResetPassword } from './pages/auth'
import Home from './pages/home'
import { UserDashboard } from './pages/users'
import Error404 from './pages/404'

// Ideally this would be an API call to server to get logged in user data
const getUserData = () => {
  return new Promise((resolve, _reject) =>
    setTimeout(() => {
      const user = window.localStorage.getItem('user')
      resolve(user)
      // reject('Error')
    }, 3000)
  )
}

const rootRoute = createRootRoute({
  component: RootLayout,
  beforeLoad: async () => {
    return { userPromise: getUserData() }
  },
})

const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: PublicLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/',
  component: Home,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'login-layout',
  component: AuthLayout,
})

const loginIndexRoute = createRoute({
  getParentRoute: () => loginRoute,
  path: '/login',
  component: Login,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: AppLayout,
})

const overviewRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/overview',
  component: UserDashboard,
})

const recoveryLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: 'recovery-layout',
  component: AuthLayout,
})

const recoveryRoute = createRoute({
  getParentRoute: () => recoveryLayout,
  path: '/recovery',
  component: Recovery,
})

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reset-password',
  component: ResetPassword,
})

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$',
  component: Error404,
})

const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([indexRoute]),
  loginRoute.addChildren([loginIndexRoute]),
  recoveryLayout.addChildren([recoveryRoute]),
  dashboardRoute.addChildren([overviewRoute]),
  resetPasswordRoute,
  notFoundRoute,
])

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export { router }
