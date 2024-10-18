import { Link } from 'react-router-dom'
import { Button, Card, Container } from '#/components/ui-react-aria'
import { useAuthentication } from '#/context/auth/AuthProvider'

export default function UserDashboard() {
  const { user, logout } = useAuthentication()

  return (
    <Container>
      <Card className="p-8">
        <p className="mb-2 font-semibold text-blue-600 text-sm">User Dashboard</p>
        <h1 className="block font-bold text-2xl text-gray-800 sm:text-2xl dark:text-white">
          Welcome back, {user?.email}
        </h1>
        <p className="mt-2 text-gray-700 text-lg dark:text-gray-400">
          This should be a dashboard page for general user.
        </p>
        <div className="mt-8 grid flex-col items-center gap-2 text-center sm:flex-row sm:gap-3">
          <Link to="/">
            <Button variant="primary">Back to homepage</Button>
          </Link>
          <Button onPress={logout}>Sign Out</Button>
        </div>
      </Card>
    </Container>
  )
}
