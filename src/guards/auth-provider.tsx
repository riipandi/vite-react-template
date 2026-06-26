import { useNavigate } from '@tanstack/react-router'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  getToken,
  getStoredUser,
  login,
  me,
  setToken,
  clearTokens,
  setStoredUser,
  tryRefresh
} from '#/libraries/auth'
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
  // Hydrate from cache immediately so the UI isn't blank on page reload.
  const [user, setUser] = useState<User | null>(() => getStoredUser())
  const [loggedIn, setLoggedIn] = useState(() => getStoredUser() !== null && getToken() !== null)
  const [isLoading, setIsLoading] = useState(() => getToken() !== null)

  // On mount, validate stored token by fetching the user profile.
  // If the stored token is stale, attempt a refresh before giving up.
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setIsLoading(false)
      return
    }

    me()
      .then((profile) => {
        setUser(profile)
        setStoredUser(profile)
        setLoggedIn(true)
      })
      .catch(async () => {
        // Token might be expired — try to refresh first.
        const refreshed = await tryRefresh()
        if (refreshed) {
          try {
            const profile = await me()
            setUser(profile)
            setStoredUser(profile)
            setLoggedIn(true)
          } catch {
            clearTokens()
            setStoredUser(null)
            setUser(null)
            setLoggedIn(false)
          }
        } else {
          clearTokens()
          setStoredUser(null)
          setUser(null)
          setLoggedIn(false)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleLogin = async (credentials: { username: string; password: string }) => {
    const response = await login(credentials)
    setToken(response.accessToken, response.refreshToken)
    const profile: User = {
      id: response.id,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      username: response.username,
      image: response.image
    }
    setUser(profile)
    setStoredUser(profile)
    setLoggedIn(true)
    navigate({ to: '/dashboard/overview' })
  }

  const handleLogout = () => {
    clearTokens()
    setStoredUser(null)
    setUser(null)
    setLoggedIn(false)
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
