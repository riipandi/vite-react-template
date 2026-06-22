import { createRouter } from '@tanstack/react-router'
import { queryClient } from './query/client'
import { routeTree } from './routes.gen'

// Set up a Router instance
export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  scrollRestoration: true
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
