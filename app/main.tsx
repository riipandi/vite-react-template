import { RouterProvider, createRouter } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { queryClient } from '#/libraries/api-client'
import { ensureSessionLoaded } from '#/libraries/guard/auth-session'
import type { BreadcrumbValue } from '#/routes/__root'
import { routeTree } from './routes.gen'
import './assets/globals.css'

// Kick off the silent session bootstrap in parallel with the first render.
// Route guards (`beforeLoad`) await the same cached promise, so the session
// fetch overlaps JS loading instead of delaying it serially before paint.
void ensureSessionLoaded()

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

// Create root element and ensure exists. React clears the static shell on first commit.
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element missing. Verify the element exists and the ID is correct.')
}

const root = ReactDOM.createRoot(rootElement)
root.render(<RouterProvider router={appRoutes} context={{ queryClient }} />)
