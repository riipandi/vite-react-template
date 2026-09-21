import { Outlet, createRootRoute, createRoute } from '@tanstack/react-router'

// Minimal root route without DevTools for testing.
export const rootRoute = createRootRoute({
  component: () => (
    <div>
      <Outlet />
    </div>
  )
})

// Home route
export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomeComponent
})

function HomeComponent() {
  return (
    <main>
      <h1>Start simple, ship quickly.</h1>
      <p>
        This starter keeps things light: typed routes, StyleX design tokens, and the essentials you
        need to build from scratch.
      </p>
    </main>
  )
}

// Create the route tree
export const routeTree = rootRoute.addChildren([homeRoute])
