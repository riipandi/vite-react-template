import { createFileRoute, Link } from '@tanstack/react-router'
import * as Lucide from 'lucide-react'
import * as stylex from '@stylexjs/stylex'
import x from '@stylexjs/atoms'

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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
    gap: space[6],
    marginBottom: space[8],
  },
  statCard: {
    padding: space[6],
  },
  statRow: {
    display: 'flex',
    alignItems: 'center',
    gap: space[4],
  },
  statIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '3rem',
    height: '3rem',
    borderRadius: radius.lg,
    flexShrink: 0,
  },
  statBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[0.5],
  },
  statValue: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.zinc800,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.zinc500,
  },
  profileCard: {
    padding: space[8],
  },
  profileRow: {
    display: 'flex',
    alignItems: 'center',
    gap: space[4],
  },
  avatar: {
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: radius.full,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary100,
    color: colors.primary600,
    flexShrink: 0,
  },
  avatarInitials: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[0.5],
  },
  profileName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.zinc800,
  },
  profileEmail: {
    fontSize: fontSize.sm,
    color: colors.zinc500,
  },
  profileActions: {
    display: 'flex',
    gap: space[3],
    marginTop: space[6],
    flexDirection: 'column',
    '@media (min-width: 640px)': {
      flexDirection: 'row',
    },
  },
})

function DashboardOverviewComponent() {
  const { user, logout } = useAuthentication()
  const initials = user?.email?.charAt(0).toUpperCase() ?? '?'

  return (
    <Container>
      <div {...stylex.props(styles.header)}>
        <p {...stylex.props(styles.subtitle)}>Dashboard</p>
        <h1 {...stylex.props(styles.title)}>Overview</h1>
      </div>

      {/* ponytail: stat values hardcoded "—". Replace with real API data when backend connected. */}
      <div {...stylex.props(styles.grid)}>
        <Card>
          <div {...stylex.props(styles.statCard)}>
            <div {...stylex.props(styles.statRow)}>
              <div
                {...stylex.props(styles.statIcon, x.backgroundColor['#eef2ff'], x.color['#6366f1'])}
              >
                <Lucide.Users {...stylex.props(x.height['1.5rem'], x.width['1.5rem'])} />
              </div>
              <div {...stylex.props(styles.statBody)}>
                <span {...stylex.props(styles.statValue)}>—</span>
                <span {...stylex.props(styles.statLabel)}>Active Users</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div {...stylex.props(styles.statCard)}>
            <div {...stylex.props(styles.statRow)}>
              <div
                {...stylex.props(styles.statIcon, x.backgroundColor['#ecfdf5'], x.color['#059669'])}
              >
                <Lucide.Activity {...stylex.props(x.height['1.5rem'], x.width['1.5rem'])} />
              </div>
              <div {...stylex.props(styles.statBody)}>
                <span {...stylex.props(styles.statValue)}>—</span>
                <span {...stylex.props(styles.statLabel)}>Sessions</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div {...stylex.props(styles.statCard)}>
            <div {...stylex.props(styles.statRow)}>
              <div
                {...stylex.props(styles.statIcon, x.backgroundColor['#fef2f2'], x.color['#dc2626'])}
              >
                <Lucide.TrendingUp {...stylex.props(x.height['1.5rem'], x.width['1.5rem'])} />
              </div>
              <div {...stylex.props(styles.statBody)}>
                <span {...stylex.props(styles.statValue)}>—</span>
                <span {...stylex.props(styles.statLabel)}>Revenue</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div {...stylex.props(styles.profileCard)}>
          <div {...stylex.props(styles.profileRow)}>
            <div {...stylex.props(styles.avatar)}>
              <span {...stylex.props(styles.avatarInitials)}>{initials}</span>
            </div>
            <div {...stylex.props(styles.profileInfo)}>
              <span {...stylex.props(styles.profileName)}>Welcome back</span>
              <span {...stylex.props(styles.profileEmail)}>{user?.email ?? '—'}</span>
            </div>
          </div>
          <div {...stylex.props(styles.profileActions)}>
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
