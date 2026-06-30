import * as stylex from '@stylexjs/stylex'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AnyRouteMatch } from '@tanstack/react-router'
import { Outlet, createRootRouteWithContext, useMatches } from '@tanstack/react-router'
import { Fragment, useEffect } from 'react'
import { AuthProvider } from '#/guards/auth-provider'
import { ThemeProvider } from '#/routes/-theme'
import { color } from '#/styles/tokens.stylex'
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

const styles = stylex.create({
  base: {
    backgroundColor: color.bgPage,
    color: color.fgNeutral,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    transitionDuration: '200ms',
    transitionProperty: 'background-color, color'
  }
})

function ThemedRoot({ children }: { children: React.ReactNode }) {
  // Fix StyleX's broken `[data-theme="dark"] :root` descendant selector.
  // StyleX generates `[data-theme="dark"] :root` which never matches
  // because :root IS html — can't be a descendant of itself.
  // This copies the dark variable declarations onto the correct selector.
  useEffect(() => {
    const sheets = document.styleSheets
    for (let i = 0; i < sheets.length; i++) {
      const sheet = sheets[i]
      try {
        const rules = sheet?.cssRules || sheet?.rules
        if (!rules) continue
        for (let j = 0; j < rules.length; j++) {
          const rule = rules[j] as CSSStyleRule
          if (
            'selectorText' in rule &&
            rule.selectorText &&
            rule.selectorText.includes('[data-theme="dark"] :root')
          ) {
            const fixed = document.createElement('style')
            fixed.textContent = rule.cssText.replace(
              '[data-theme="dark"] :root',
              ':root[data-theme="dark"]'
            )
            document.head.appendChild(fixed)
            return
          }
        }
      } catch {
        // cross-origin stylesheets throw on cssRules access
      }
    }
  }, [])

  return <div {...stylex.props(styles.base)}>{children}</div>
}

function RootComponent() {
  const matches = useMatches()
  const { queryClient } = Route.useRouteContext()
  const pageTitle = matches.findLast((match) => match.staticData?.pageTitle)?.staticData?.pageTitle

  return (
    <Fragment>
      <title>{pageTitle ? `${pageTitle} - MyApplication` : 'MyApplication'}</title>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <ThemedRoot>
              <Outlet />
              <DevTools queryClient={queryClient} />
            </ThemedRoot>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Fragment>
  )
}
