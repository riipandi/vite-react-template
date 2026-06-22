import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AnyRouteMatch } from '@tanstack/react-router'
import { Outlet, createRootRouteWithContext, useMatches } from '@tanstack/react-router'
import { Fragment } from 'react'
import { ThemeProvider } from '#/routes/-theme'
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

function RootComponent() {
  const matches = useMatches()
  const { queryClient } = Route.useRouteContext()
  const pageTitle = matches.findLast((match) => match.staticData?.pageTitle)?.staticData?.pageTitle

  return (
    <Fragment>
      <title>{pageTitle ? `${pageTitle} - MyApplication` : 'MyApplication'}</title>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
        <DevTools queryClient={queryClient} />
      </QueryClientProvider>
    </Fragment>
  )
}
