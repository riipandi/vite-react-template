import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GoTrue, { User } from 'gotrue-js'

const GOTRUE_URL: string = import.meta.env.API_GOTRUE_URL

// Instantiate the GoTrue auth client.
export const auth = new GoTrue({
  APIUrl: GOTRUE_URL,
  audience: '',
  setCookie: false,
})

type AuthContext = {
  loggedIn: boolean
  loggedOut: boolean
  isAdmin: boolean
  login: () => void
  logout: () => void
  user?: User | null
}

export const DefaultUserContext: AuthContext = {
  user: null,
  loggedIn: false,
  loggedOut: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
}

export const UserContext = createContext(DefaultUserContext)

export function AuthProvider({ children }: { children?: ReactNode }) {
  const navigate = useNavigate()
  const user: any = auth.currentUser()
  const [loggedIn, setLoggedIn] = useState(user !== null)
  const [loggedOut, setLoggedOut] = useState(false)
  const [isAdmin] = useState(false)

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
    <UserContext.Provider value={{ user, loggedIn, loggedOut, isAdmin, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
