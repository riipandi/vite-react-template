import { type User, type UserData } from 'gotrue-js'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { auth } from '#/lib/auth'

export type { User, UserData }

interface AuthContext {
  user?: User | null
  loggedIn: boolean
  loggedOut: boolean
  login: () => void
  logout: () => void
}

export const DefaultUserContext: AuthContext = {
  user: null,
  loggedIn: false,
  loggedOut: false,
  login: () => {},
  logout: () => {},
}

export const UserContext = createContext(DefaultUserContext)

export function AuthProvider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate()
  const user = auth.currentUser()
  const [loggedIn, setLoggedIn] = useState(user !== null)
  const [loggedOut, setLoggedOut] = useState(false)

  const login = () => {
    setLoggedIn(true)
    navigate({ to: '/' })
  }

  const logout = () => {
    user
      ?.logout()
      .then(() => {
        setLoggedIn(false)
        setLoggedOut(true)
        navigate({ to: '/login', search: { loggedOut: 'true' } })
      })
      .catch((error: unknown) => {
        console.info('Failed to logout user: %o', error)
      })
  }

  return (
    <UserContext.Provider value={{ user, loggedIn, loggedOut, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useAuthentication() {
  return useContext(UserContext)
}
