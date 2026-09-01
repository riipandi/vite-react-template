import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { useAuthentication } from '#/libraries/guard/auth-provider'
import { fontSizeVar, fontWeightVar, spaceVar, colorVar } from '#/styles/core/tokens.stylex'

export const Route = createFileRoute('/(app)/dashboard/overview')({
  component: DashboardOverviewComponent,
  staticData: {
    pageTitle: 'Overview'
  }
})

// ── Styles ──────────────────────────────────────────────────────────────────

const styles = stylex.create({
  container: {
    display: 'block',
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    maxWidth: 'none',
    paddingTop: spaceVar[6],
    paddingBottom: spaceVar[6],
    paddingLeft: spaceVar[4],
    paddingRight: spaceVar[4],
    '@media (min-width: 640px)': {
      paddingTop: spaceVar[8],
      paddingBottom: spaceVar[8],
      paddingLeft: spaceVar[6],
      paddingRight: spaceVar[6]
    },
    '@media (min-width: 1024px)': {
      paddingTop: spaceVar[10],
      paddingBottom: spaceVar[10],
      paddingLeft: spaceVar[10],
      paddingRight: spaceVar[10]
    }
  },
  pageHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spaceVar[10],
    gap: spaceVar[4]
  },
  headerLeft: { display: 'flex', flexDirection: 'column', gap: spaceVar[1] },
  pageLabel: {
    fontSize: fontSizeVar.xs,
    fontWeight: fontWeightVar.semibold,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: colorVar.fgPrimary
  },
  pageTitle: {
    fontSize: fontSizeVar['2xl'],
    fontWeight: fontWeightVar.bold,
    color: colorVar.fgNeutral,
    lineHeight: '1.2'
  },
  pageSubtitle: {
    fontSize: fontSizeVar.sm,
    color: colorVar.fgNeutralFaded,
    marginTop: spaceVar[1]
  }
})

// ── Dashboard Overview ───────────────────────────────────────────────────────

function DashboardOverviewComponent() {
  const { user } = useAuthentication()
  const displayName =
    user?.firstName?.trim() || user?.username?.trim() || user?.email?.split('@')[0] || 'Guest'
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.pageHeader)}>
        <div {...stylex.props(styles.headerLeft)}>
          <p {...stylex.props(styles.pageLabel)}>Dashboard</p>
          <h1 {...stylex.props(styles.pageTitle)}>
            {greeting}
            {displayName !== 'Guest' ? `, ${displayName}` : ''}!
          </h1>
          <p {...stylex.props(styles.pageSubtitle)}>Welcome back to your workspace.</p>
        </div>
      </div>
    </div>
  )
}
