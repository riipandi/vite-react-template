import GoTrue, { type User, type UserData } from 'gotrue-js'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export type { User, UserData }

// Instantiate the GoTrue auth client.
export const auth = new GoTrue({
  APIUrl: import.meta.env.VITE_GOTRUE_URL,
  audience: 'vite-react-template',
  setCookie: true,
})

type AuthContext = {
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

  // This methods would communicate with a backend, obtain/verify a token, etc.
  const login = () => {
    setLoggedIn(true)
    navigate('/')
  }

  // Clear stored cookies and set false for loggedIn state.
  const logout = () => {
    user
      ?.logout()
      .then((_response: any) => {
        setLoggedIn(false)
        setLoggedOut(true)
        navigate('/login?loggedOut=true')
      })
      .catch((error: any) => {
        console.info('Failed to logout user: %o', error)
        throw error
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
