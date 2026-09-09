export { AuthProvider, useAuthentication } from '#/libraries/guard/auth-provider'
export {
  authStore,
  isAuthenticated,
  setAuthUser,
  setAuthLoading,
  clearAuth
} from '#/libraries/auth.store'
export { useAuth, useLoggedIn, useAuthLoading, useAuthUser } from '#/libraries/guard/auth-hooks'
export { getErrorMessage } from '#/libraries/guard/auth-utils'
export { me } from '#/libraries/guard/auth-api'
export { ensureSessionLoaded, refreshIfExpiring } from '#/libraries/guard/auth-session'
export { authWorker } from '#/libraries/guard/auth-worker-client'
export { API_BASE_URL, type AuthEngineApi } from '#/libraries/guard/auth-engine'
