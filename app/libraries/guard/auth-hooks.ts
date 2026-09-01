import { useSelector } from '@tanstack/react-store'
import { authStore, type AuthState } from '#/libraries/auth.store'
import type { User } from '#/schemas/user.schema'

export function useAuth(): AuthState {
  return useSelector(authStore, (state) => state)
}

export function useLoggedIn(): boolean {
  return useSelector(authStore, (state) => state.accessToken !== null && state.user !== null)
}

export function useAuthLoading(): boolean {
  return useSelector(authStore, (state) => state.isLoading)
}

export function useAuthUser(): User | null {
  return useSelector(authStore, (state) => state.user)
}
