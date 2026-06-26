import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AnyRouteMatch } from '@tanstack/react-router'
import { Outlet, createRootRouteWithContext, useMatches } from '@tanstack/react-router'
import { Fragment } from 'react'
import { ThemeProvider, useTheme } from '#/routes/-theme'
import { colors, darkTheme } from '#/styles/token.stylex'
import { GlobalNotFound, GlobalError } from './-boundaries'
import DevTools from './-devtools'

export interface GlobalContext {
  queryClient: QueryClient
}

export type BreadcrumbValue = string | string[] | ((match: AnyRouteMatch) => string | string[])

export const Route = createRootRouteWithContext<GlobalContext>()({
  notFoundComponent: GlobalNotFound,
  errorComponent: GlobalError,
  component: RootComponent,
  loader({ context }) {
    return { ...context }
  }
})

/**
 * Applies root-level background/text color and the StyleX dark theme CSS
 * variable override, so theme toggling works consistently on every page.
 */
function ThemedRoot({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()

  return (
    <div
      {...stylex.props(
        x.minHeight['100vh'],
        x.display.flex,
        x.flexDirection.column,
        rootStyles.base,
        resolvedTheme === 'dark' && darkTheme
      )}
    >
      {children}
    </div>
  )
}

const rootStyles = stylex.create({
  base: {
    backgroundColor: colors.zinc50,
    color: colors.zinc900,
    transitionProperty: 'background-color, color',
    transitionDuration: '200ms'
  }
})

function RootComponent() {
  const matches = useMatches()
  const { queryClient } = Route.useRouteContext()
  const pageTitle = matches.findLast((match) => match.staticData?.pageTitle)?.staticData?.pageTitle

  return (
    <Fragment>
      <title>{pageTitle ? `${pageTitle} - MyApplication` : 'MyApplication'}</title>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ThemedRoot>
            <Outlet />
            <DevTools queryClient={queryClient} />
          </ThemedRoot>
        </ThemeProvider>
      </QueryClientProvider>
    </Fragment>
  )
}
