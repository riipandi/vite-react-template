import { useNavigate } from '@tanstack/react-router'
import { createContext, useContext, useEffect } from 'react'
import { clearAuth, setAuthUser } from '#/libraries/auth.store'
import { useAuth } from '#/libraries/guard/auth-hooks'
import { ensureSessionLoaded, refreshIfExpiring } from '#/libraries/guard/auth-session'
import { authWorker } from '#/libraries/guard/auth-worker-client'
import type { LoginCredentials } from '#/schemas/auth.schema'
import type { User } from '#/schemas/user.schema'

interface AuthContext {
  user: User | null
  loggedIn: boolean
  /** True while the initial session bootstrap is running. */
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

export const DefaultUserContext: AuthContext = {
  user: null,
  loggedIn: false,
  isLoading: false,
  login: async () => {},
  logout: () => {}
}

export const UserContext = createContext(DefaultUserContext)

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

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export function useAuthentication() {
  return useContext(UserContext)
}
