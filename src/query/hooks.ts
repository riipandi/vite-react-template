import { useQuery } from '@tanstack/react-query'
import { getToken, me } from '#/lib/auth'

/** Fetch current user profile */
export function useCurrentUser() {
  const token = getToken()
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      if (!token) return null
      const user = await me(token)
      return user
    },
    staleTime: 1000 * 60 * 2,
    enabled: !!token,
  })
}
