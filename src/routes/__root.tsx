import { createRootRouteWithContext, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '@lonik/themer'

import { AuthProvider } from '#/context/auth/AuthProvider'

/** The shape injected into every route's context */
export interface RouterContext {
  queryClient: QueryClient
}

function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })
  return isLoading ? (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm shadow-md dark:bg-zinc-800">
      <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      Loading...
    </div>
  ) : null
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => <Outlet />, // handled by `/$` catch-all
})

function RootComponent() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterSpinner />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
        <TanStackRouterDevtools position="bottom-right" />
      </AuthProvider>
    </ThemeProvider>
  )
}
