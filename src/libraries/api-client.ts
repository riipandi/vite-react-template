import { QueryClient } from '@tanstack/react-query'
import { ofetch } from 'ofetch'

// Initialize a QueryClient instance with default options.
export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0
    },
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1
    }
  }
})

// Define a custom fetcher using ofetch with some options.
export const fetcher = ofetch.create({
  baseURL: '/api'
})
