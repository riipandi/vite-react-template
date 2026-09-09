import { useNavigate } from '@tanstack/react-router'
import { useSelector } from '@tanstack/react-store'
import { createContext, useContext, useEffect } from 'react'
import type { LoginCredentials } from '#/schemas/auth.schema'
import type { User } from '#/schemas/user.schema'
import { ensureSessionLoaded, refreshIfExpiring } from './auth-session'
import { authStore, clearAuth, setAuthUser, type AuthState } from './auth-store'
import { authWorker } from './auth-worker-client'

/** Subscribe to the session state (selector-based, minimal re-renders). */
export function useAuth(): AuthState {
  return useSelector(authStore, (state) => state)
}

interface AuthContext {
  user: User | null
  loggedIn: boolean
  /** True while the initial session bootstrap is running. */
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

const DefaultAuthContext: AuthContext = {
  user: null,
  loggedIn: false,
  isLoading: false,
  login: async () => {},
  logout: () => {}
}

const AuthContextReact = createContext(DefaultAuthContext)

/** Refresh when the session expires within this window after the tab refocuses. */
const REFRESH_ON_VISIBLE_WITHIN_MS = 5 * 60_000

export function AuthProvider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate()
  const { user, isLoading } = useAuth()
  const loggedIn = user !== null

  // Kick off the silent session bootstrap. Route guards await the same
  // promise, so navigation never races the refresh.
  useEffect(() => {
    void ensureSessionLoaded()
  }, [])

  // The worker's proactive timer is throttled in background tabs — refresh
  // on tab focus when the session is about to expire.
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState !== 'visible') return
      void refreshIfExpiring(REFRESH_ON_VISIBLE_WITHIN_MS)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  const handleLogin = async (credentials: LoginCredentials) => {
    // The worker establishes the cookie session; tokens never reach JS.
    const profile = await authWorker().login(credentials)
    setAuthUser(profile)
    navigate({ to: '/overview' })
  }

  const handleLogout = () => {
    void authWorker()
      .logout()
      .finally(() => {
        clearAuth()
        navigate({ to: '/login', search: { loggedOut: true } })
      })
  }

  const context = {
    user,
    loggedIn,
    isLoading,
    login: handleLogin,
    logout: handleLogout
  } satisfies AuthContext

  return <AuthContextReact.Provider value={context}>{children}</AuthContextReact.Provider>
}

export function useAuthentication() {
  return useContext(AuthContextReact)
}
