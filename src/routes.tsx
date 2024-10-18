import { Route, createBrowserRouter, createRoutesFromElements, defer } from 'react-router-dom'

import { AppLayout, AuthLayout, PublicLayout } from './components/layouts'
import { Login } from './pages/auth'
import Home from './pages/home'
import { UserDashboard } from './pages/users'

// Ideally this would be an API call to server to get logged in user data
const getUserData = () => {
  return new Promise((resolve, _reject) =>
    setTimeout(() => {
      const user = window.localStorage.getItem('user')
      resolve(user)
      // reject('Error')
    }, 3000)
  )
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />} loader={() => defer({ userPromise: getUserData() })}>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/dashboard" element={<AppLayout />}>
        <Route path="overview" element={<UserDashboard />} />
      </Route>
    </Route>
  )
)
