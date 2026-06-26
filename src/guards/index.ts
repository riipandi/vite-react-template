export { AuthProvider, useAuthentication } from '#/guards/auth-provider'
export {
  authStore,
  getAccessToken,
  isAuthenticated,
  setAuthTokens,
  setAuthUser,
  setAuthLoading,
  clearAuth,
  useAuth,
  useLoggedIn,
  useAuthLoading,
  useAuthUser
} from '#/guards/auth-store'
export { loginSchema } from '#/guards/auth-types'
export { getErrorMessage } from '#/guards/auth-utils'
export { login, me, tryRefresh } from '#/guards/auth-api'
export type { LoginCredentials, LoginResponse } from '#/guards/auth-types'
export type { AuthState } from '#/guards/auth-store'
