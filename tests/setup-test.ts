// @ref: https://dev.to/codeparrot/test-your-react-apps-with-vitest-2llb
// @ref: https://www.machinet.net/tutorial-eng/vitest-coverage-comprehensive-guide

import '@testing-library/jest-dom/vitest'
import type { ReactNode } from 'react'
import { vi } from 'vitest'

// @stylexjs/atoms is a compile-time transform — the runtime module is a Proxy
// that throws on property access. Vitest doesn't run the babel transform, so
// we mock it to return a no-op proxy that silently handles all property access.
vi.mock('@stylexjs/atoms', () => {
  const handler: ProxyHandler<object> = {
    get(_target, prop) {
      if (prop === 'default' || prop === '__esModule') {
        return undefined
      }
      // Return a proxy for any property access so x.display.flex works
      return new Proxy(() => ({}), handler)
    },
    apply() {
      return {}
    }
  }
  const proxy = new Proxy({}, handler)
  return { default: proxy }
})

// @lonik/themer renders <ScriptOnce> from @tanstack/react-router, which calls
// useRouter() returning null in test env (no RouterProvider context at that
// render point). Mock themer as a passthrough — tests don't need theme logic.
vi.mock('@lonik/themer', () => ({
  ThemeProvider: ({ children }: { children: ReactNode }) => children,
  useTheme: () => ({ theme: 'light', setTheme: vi.fn<() => void>() })
}))

// TanStack DevTools call useRouter/useRouterState at module level, which warns
// and can trigger ScriptOnce errors. Mock the entire devtools stack to no-op.
vi.mock('@tanstack/react-devtools', () => ({
  TanStackDevtools: () => null
}))
vi.mock('@tanstack/react-router-devtools', () => ({
  TanStackRouterDevtoolsPanel: () => null
}))
vi.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtoolsPanel: () => null
}))

// Development build of @tanstack/router-core/isServer exports undefined.
// ScriptOnce does: if (!(isServer ?? router.isServer)) — when isServer is
// undefined and useRouter() returns null, this throws. Mock to false.
vi.mock('@tanstack/router-core/isServer', () => ({
  isServer: false
}))
