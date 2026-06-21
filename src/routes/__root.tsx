import { createRootRouteWithContext, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from '@lonik/themer'
import * as stylex from '@stylexjs/stylex'
import type { QueryClient } from '@tanstack/react-query'

import { AuthProvider } from '#/context/auth/AuthProvider'
import { colors, darkTheme } from '../assets/styles/tokens.stylex'
import { useTheme } from '#/stores/app-store'

/** The shape injected into every route's context */
export interface RouterContext {
  queryClient: QueryClient
}

const spinKeyframes = stylex.keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const styles = stylex.create({
  root: {
    minHeight: '100vh',
    backgroundColor: colors.zinc50,
    color: colors.zinc900,
  },
  spinner: {
    display: 'inline-block',
    height: '0.75rem',
    width: '0.75rem',
    borderRadius: '9999px',
    borderWidth: '2px',
    borderColor: colors.blue500,
    borderTopColor: 'transparent',
    animationName: spinKeyframes,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  },
  spinnerContainer: {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderRadius: '0.375rem',
    backgroundColor: colors.white,
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
})

function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })
  return isLoading ? (
    <div {...stylex.props(styles.spinnerContainer)}>
      <span {...stylex.props(styles.spinner)} />
      Loading...
    </div>
  ) : null
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => <Outlet />, // handled by `/$` catch-all
})

function RootComponent() {
  const theme = useTheme()

  return (
    <div {...stylex.props(styles.root, theme === 'dark' && darkTheme)}>
      <ThemeProvider>
        <AuthProvider>
          <RouterSpinner />
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
          <TanStackRouterDevtools position="bottom-right" />
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}
