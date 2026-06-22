// oxlint-disable import/no-unassigned-import

// @ref: https://dev.to/codeparrot/test-your-react-apps-with-vitest-2llb
// @ref: https://www.machinet.net/tutorial-eng/vitest-coverage-comprehensive-guide

import '@testing-library/jest-dom/vitest'
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
