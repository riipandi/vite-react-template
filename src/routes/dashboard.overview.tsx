import { createFileRoute, Link } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'

import { Button, Card, Container } from '#/components/ui-react-aria'
import { useAuthentication } from '#/context/auth/AuthProvider'

import { colors, fontSize, fontWeight, radius, space } from '../assets/styles/tokens.stylex'

export const Route = createFileRoute('/dashboard/overview')({
  component: DashboardOverviewComponent,
})

const styles = stylex.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[1],
    marginBottom: space[8],
  },
  subtitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary600,
  },
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.zinc800,
  },
  card: {
    padding: space[8],
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: space[4],
  },
  avatar: {
    width: '3rem',
    height: '3rem',
    borderRadius: radius.full,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary100,
    color: colors.primary600,
    flexShrink: 0,
  },
  initial: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    lineHeight: 1,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[0.5],
    minWidth: 0,
  },
  name: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.zinc800,
  },
  email: {
    fontSize: fontSize.sm,
    color: colors.zinc500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  actions: {
    display: 'flex',
    gap: space[3],
    marginTop: space[6],
    paddingTop: space[6],
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colors.zinc200,
  },
})

function DashboardOverviewComponent() {
  const { user, logout } = useAuthentication()
  const initial = user?.email?.charAt(0).toUpperCase() ?? '?'

  return (
    <Container>
      <div {...stylex.props(styles.header)}>
        <p {...stylex.props(styles.subtitle)}>Dashboard</p>
        <h1 {...stylex.props(styles.title)}>Overview</h1>
      </div>

      <Card>
        <div {...stylex.props(styles.card)}>
          <div {...stylex.props(styles.row)}>
            <div {...stylex.props(styles.avatar)}>
              <span {...stylex.props(styles.initial)}>{initial}</span>
            </div>
            <div {...stylex.props(styles.info)}>
              <span {...stylex.props(styles.name)}>Welcome back</span>
              <span {...stylex.props(styles.email)}>{user?.email ?? '—'}</span>
            </div>
          </div>
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
