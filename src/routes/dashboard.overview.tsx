import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Card, Container } from '#/components/ui-react-aria'
import { useAuthentication } from '#/context/auth/AuthProvider'

export const Route = createFileRoute('/dashboard/overview')({
  component: DashboardOverviewComponent,
})

function DashboardOverviewComponent() {
  const { user, logout } = useAuthentication()

  return (
    <Container>
      <Card className="p-8">
        <p className="text-primary-600 mb-2 text-sm font-semibold">User Dashboard</p>
        <h1 className="block text-2xl font-bold text-zinc-800 sm:text-2xl dark:text-white">
          Welcome back, {user?.email}
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          This should be a dashboard page for general user.
        </p>
        <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <Link to="/">
            <Button variant="primary">Back to homepage</Button>
          </Link>
          <Button onClick={logout}>Sign Out</Button>
        </div>
      </Card>
    </Container>
  )
}
