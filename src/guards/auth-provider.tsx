import { useNavigate } from '@tanstack/react-router'
import { createContext, useContext, useEffect } from 'react'
import { login, me, tryRefresh } from '#/guards/auth-api'
import {
  authStore,
  setAuthTokens,
  setAuthUser,
  setAuthLoading,
  clearAuth,
  useAuth
} from '#/guards/auth-store'
import type { User } from '#/schemas/user.schema'

interface AuthContext {
  user: User | null
  loggedIn: boolean
  /** True while validating a stored token on initial load. */
  isLoading: boolean
  login: (credentials: { username: string; password: string }) => Promise<void>
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

export function AuthProvider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate()
  const { user, isLoading } = useAuth()
  const loggedIn = user !== null

  // On mount, validate stored token by fetching the user profile.
  // If the stored token is stale, attempt a refresh before giving up.
  useEffect(() => {
    const token = authStore.state.accessToken
    if (!token) {
      setAuthLoading(false)
      return
    }

    me()
      .then((profile) => {
        setAuthUser(profile)
      })
      .catch(async () => {
        // Token might be expired — try to refresh first.
        const refreshed = await tryRefresh()
        if (refreshed) {
          try {
            const profile = await me()
            setAuthUser(profile)
          } catch {
            clearAuth()
          }
        } else {
          clearAuth()
        }
      })
      .finally(() => {
        setAuthLoading(false)
      })
  }, [])

  const handleLogin = async (credentials: { username: string; password: string }) => {
    const response = await login(credentials)
    setAuthTokens(response.accessToken, response.refreshToken)
    const profile: User = {
      id: response.id,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      username: response.username,
      image: response.image
    }
    setAuthUser(profile)
    navigate({ to: '/dashboard/overview' })
  }

  const handleLogout = () => {
    clearAuth()
    navigate({ to: '/login', search: { loggedOut: 'true' } })
  }

  return (
    <UserContext.Provider
      value={{ user, loggedIn, isLoading, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useAuthentication() {
  return useContext(UserContext)
}
