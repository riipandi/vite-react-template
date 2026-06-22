import { useNavigate } from '@tanstack/react-router'
import { createContext, useContext, useEffect, useState } from 'react'
import { getToken, login, me, setToken } from '#/libraries/auth'
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
  const [user, setUser] = useState<User | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // On mount, validate stored token by fetching the user profile.
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setIsLoading(false)
      return
    }

    me(token)
      .then((profile) => {
        setUser(profile)
        setLoggedIn(true)
      })
      .catch(() => {
        // Token is invalid or expired — clear it.
        setToken(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleLogin = async (credentials: { username: string; password: string }) => {
    const response = await login(credentials)
    setToken(response.accessToken)
    setUser({
      id: response.id,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      username: response.username,
      image: response.image
    })
    setLoggedIn(true)
    navigate({ to: '/dashboard/overview' })
  }

  const handleLogout = () => {
    setToken(null)
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
