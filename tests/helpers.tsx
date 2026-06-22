import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createMemoryHistory, createRouter } from '@tanstack/react-router'
import { act, render, type RenderResult } from '@testing-library/react'
import { routeTree } from '#/routes.gen'
import DevTools from '#/routes/-devtools'
import { ThemeProvider } from '#/routes/-theme'

interface RenderPageOptions {
  initialLocation?: string
}

interface RenderPageResult extends RenderResult {
  queryClient: QueryClient
}

export async function renderPage(
  initialLocation = '/',
  options: RenderPageOptions = {}
): Promise<RenderPageResult> {
  const queryClient = new QueryClient()
  const location = options.initialLocation ?? initialLocation

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [location] }),
    context: { queryClient }
  })

  await router.load()

  let result: RenderResult
  await act(async () => {
    result = render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
        <DevTools queryClient={queryClient} />
      </QueryClientProvider>
    )
  })

  return { ...result!, queryClient }
}
