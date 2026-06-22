export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  username: string
  image: string
}

import { useNavigate } from '@tanstack/react-router'
import { createContext, useContext, useState } from 'react'
import { isAuthenticated, login, setToken, type LoginResponse } from '#/libraries/auth'

export type { LoginResponse }

interface AuthContext {
  user: User | null
  loggedIn: boolean
  loggedOut: boolean
  login: (credentials: { username: string; password: string }) => Promise<void>
  logout: () => void
}

export const DefaultUserContext: AuthContext = {
  user: null,
  loggedIn: false,
  loggedOut: false,
  login: async () => {},
  logout: () => {}
}

export const UserContext = createContext(DefaultUserContext)

export function AuthProvider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate()
  const token = isAuthenticated()
  const [user, setUser] = useState<User | null>(null)
  const [loggedIn, setLoggedIn] = useState(token)
  const [loggedOut, setLoggedOut] = useState(false)

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

  const logout = () => {
    setToken(null)
    setUser(null)
    setLoggedIn(false)
    setLoggedOut(true)
    navigate({ to: '/login', search: { loggedOut: 'true' } })
  }

  return (
    <UserContext.Provider value={{ user, loggedIn, loggedOut, login: handleLogin, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useAuthentication() {
  return useContext(UserContext)
}
