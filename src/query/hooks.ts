import { useQuery } from '@tanstack/react-query'
import { auth } from '#/context/auth/AuthProvider'

/** Fetch current user profile */
export function useCurrentUser() {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const user = auth.currentUser()
      return user ?? null
    },
    staleTime: 1000 * 60 * 2,
  })
}
