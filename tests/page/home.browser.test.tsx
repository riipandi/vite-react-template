import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createMemoryHistory, createRouter } from '@tanstack/react-router'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { routeTree } from '../test-routes'

describe('Homepage (browser)', () => {
  it('should render successfully', async () => {
    const queryClient = new QueryClient()
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/'] }),
      context: { queryClient }
    })

    await router.load()

    const screen = await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    )

    await expect.element(screen.getByRole('main')).toBeVisible()
    await expect.element(screen.getByText('Start simple, ship quickly.')).toBeVisible()
  })
})
