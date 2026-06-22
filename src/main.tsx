// oxlint-disable import/no-unassigned-import
import { RouterProvider, createRouter } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { queryClient } from '#/libraries/api-client'
import type { BreadcrumbValue } from '#/routes/__root'
import './main.css'
import { routeTree } from './routes.gen'

// Create the application router instance.
const appRoutes = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: {
    queryClient: undefined!
  }
})

// Register the router instance for type safety.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof appRoutes
  }
  interface StaticDataRouteOption {
    pageTitle?: string
    breadcrumb?: BreadcrumbValue
  }
}

// Create root element and ensure exists.
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element missing. Verify the element exists and the ID is correct.')
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<RouterProvider router={appRoutes} context={{ queryClient }} />)
}
