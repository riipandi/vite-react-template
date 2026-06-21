import { createFileRoute, Link } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'
import { Button, Card, Container } from '#/components/ui-react-aria'
import { useAuthentication } from '#/context/auth/AuthProvider'

import { colors, fontSize, fontWeight, space } from '../assets/styles/tokens.stylex'

export const Route = createFileRoute('/dashboard/overview')({
  component: DashboardOverviewComponent,
})

const styles = stylex.create({
  cardBody: {
    padding: space[8],
  },
  subtitle: {
    marginBottom: space[2],
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary600,
  },
  title: {
    display: 'block',
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.zinc800,
    '@media (min-width: 640px)': {
      fontSize: fontSize['2xl'],
    },
  },
  description: {
    marginTop: space[2],
    fontSize: fontSize.lg,
    color: colors.zinc600,
  },
  actions: {
    marginTop: space[8],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: space[2],
    '@media (min-width: 640px)': {
      flexDirection: 'row',
      gap: space[3],
    },
  },
})

function DashboardOverviewComponent() {
  const { user, logout } = useAuthentication()

  return (
    <Container>
      <Card>
        <div {...stylex.props(styles.cardBody)}>
          <p {...stylex.props(styles.subtitle)}>User Dashboard</p>
          <h1 {...stylex.props(styles.title)}>Welcome back, {user?.email}</h1>
          <p {...stylex.props(styles.description)}>
            This should be a dashboard page for general user.
          </p>
          <div {...stylex.props(styles.actions)}>
            <Link to="/">
              <Button variant="primary">Back to homepage</Button>
            </Link>
            <Button onClick={logout}>Sign Out</Button>
          </div>
        </div>
      </Card>
    </Container>
  )
}
