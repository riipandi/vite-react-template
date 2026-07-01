import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Link } from '@tanstack/react-router'
import * as Lucide from 'lucide-react'
import { Button } from '#/components/base/button'
import { useAuthentication } from '#/guards/auth-provider'
import {
  fontSizeVar,
  fontWeightVar,
  radiusVar,
  shadowVar,
  spaceVar,
  colorVar
} from '#/styles/tokens.stylex'

export const Route = createFileRoute('/(app)/dashboard/overview')({
  component: DashboardOverviewComponent
})

// ── Data ────────────────────────────────────────────────────────────────────

const stats = [
  {
    label: 'Total Users',
    value: '12,481',
    change: '+12.5%',
    positive: true,
    icon: Lucide.Users,
    color: 'primary' as const
  },
  {
    label: 'Revenue',
    value: '$48,295',
    change: '+8.2%',
    positive: true,
    icon: Lucide.DollarSign,
    color: 'green' as const
  },
  {
    label: 'Active Sessions',
    value: '3,642',
    change: '-2.1%',
    positive: false,
    icon: Lucide.Activity,
    color: 'orange' as const
  },
  {
    label: 'Pending Tasks',
    value: '28',
    change: '+4 today',
    positive: false,
    icon: Lucide.ClipboardList,
    color: 'destructive' as const
  }
]

const activity = [
  {
    id: 1,
    user: 'Alice Johnson',
    action: 'Created a new project',
    time: '2 min ago',
    avatar: 'AJ'
  },
  { id: 2, user: 'Bob Martinez', action: 'Completed task #482', time: '14 min ago', avatar: 'BM' },
  {
    id: 3,
    user: 'Carol Wei',
    action: 'Left a comment on Dashboard v2',
    time: '1 hr ago',
    avatar: 'CW'
  },
  {
    id: 4,
    user: 'David Kim',
    action: 'Uploaded 3 files to Media Library',
    time: '3 hr ago',
    avatar: 'DK'
  },
  {
    id: 5,
    user: 'Emma Torres',
    action: 'Invited 2 new team members',
    time: 'Yesterday',
    avatar: 'ET'
  }
]

const weeklyData = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 72 },
  { day: 'Wed', value: 55 },
  { day: 'Thu', value: 88 },
  { day: 'Fri', value: 62 },
  { day: 'Sat', value: 35 },
  { day: 'Sun', value: 48 }
]

const maxValue = Math.max(...weeklyData.map((d) => d.value))

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
  },

  // Card
  card: {
    borderRadius: radiusVar.xl,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    backgroundColor: colorVar.bgElevationBase,
    overflow: 'hidden',
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: '200ms'
  },

  // Stats grid
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: spaceVar[5],
    marginBottom: spaceVar[8],
    '@media (min-width: 640px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
    '@media (min-width: 1024px)': { gridTemplateColumns: 'repeat(4, 1fr)' }
  },
  statBody: { padding: spaceVar[5] },
  statTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spaceVar[3]
  },
  statIcon: {
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: radiusVar.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  iconPrimary: { backgroundColor: colorVar.bgPrimaryFaded, color: colorVar.fgPrimary },
  iconGreen: { backgroundColor: colorVar.bgPositiveFaded, color: colorVar.fgPositive },
  iconOrange: { backgroundColor: colorVar.bgWarningFaded, color: colorVar.fgWarning },
  iconDestructive: { backgroundColor: colorVar.bgCriticalFaded, color: colorVar.fgCritical },
  statValue: {
    fontSize: fontSizeVar['2xl'],
    fontWeight: fontWeightVar.bold,
    color: colorVar.fgNeutral,
    lineHeight: '1',
    marginBottom: spaceVar[1]
  },
  statLabel: {
    fontSize: fontSizeVar.xs,
    color: colorVar.fgNeutralFaded,
    fontWeight: fontWeightVar.medium,
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  },
  changePositive: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spaceVar[1],
    fontSize: fontSizeVar.xs,
    fontWeight: fontWeightVar.semibold,
    color: colorVar.fgPositive,
    marginTop: spaceVar[2]
  },
  changeNegative: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spaceVar[1],
    fontSize: fontSizeVar.xs,
    fontWeight: fontWeightVar.semibold,
    color: colorVar.fgCritical,
    marginTop: spaceVar[2]
  },

  // Chart
  chartCard: { padding: spaceVar[6], marginBottom: spaceVar[10] },
  chartHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spaceVar[5]
  },
  sectionTitle: {
    fontSize: fontSizeVar.md,
    fontWeight: fontWeightVar.semibold,
    color: colorVar.fgNeutral
  },
  chartContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: spaceVar[2],
    height: '8rem',
    paddingTop: spaceVar[1]
  },
  chartBar: {
    flex: 1,
    borderRadius: radiusVar.md,
    minHeight: spaceVar[2],
    position: 'relative',
    backgroundColor: colorVar.bgPrimary,
    transitionProperty: 'height, background-color',
    transitionDuration: '200ms'
  },
  chartBarValue: {
    position: 'absolute',
    top: '-1.25rem',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: fontSizeVar.xs,
    fontWeight: fontWeightVar.semibold,
    color: colorVar.fgNeutralFaded,
    whiteSpace: 'nowrap'
  },
  chartBarLabel: {
    position: 'absolute',
    bottom: '-1.25rem',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: fontSizeVar.xs,
    color: colorVar.fgNeutralFaded,
    whiteSpace: 'nowrap'
  },

  // Bottom grid
  bottomGrid: {
    display: 'grid',
    gap: spaceVar[8],
    gridTemplateColumns: '1fr',
    marginTop: spaceVar[10],
    '@media (min-width: 1024px)': { gridTemplateColumns: '1fr 22rem' }
  },

  // Activity
  activityCard: { padding: spaceVar[7] },
  activityHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spaceVar[5]
  },
  activityList: { display: 'flex', flexDirection: 'column', gap: spaceVar[4] },
  activityItem: { display: 'flex', alignItems: 'flex-start', gap: spaceVar[3] },
  activityAvatar: {
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorVar.bgPrimaryFaded,
    color: colorVar.fgPrimary,
    fontSize: fontSizeVar.xs,
    fontWeight: fontWeightVar.bold,
    flexShrink: 0,
    letterSpacing: '-0.025em'
  },
  activityContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar['0.5'],
    minWidth: 0,
    flex: 1
  },
  activityUser: {
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.semibold,
    color: colorVar.fgNeutral
  },
  activityAction: { fontSize: fontSizeVar.sm, color: colorVar.fgNeutralFaded },
  activityTime: {
    fontSize: fontSizeVar.xs,
    color: colorVar.fgNeutralFaded,
    marginTop: spaceVar['0.5']
  },
  activityDivider: {
    height: '1px',
    backgroundColor: colorVar.bgNeutralFaded,
    marginTop: spaceVar[4],
    marginBottom: spaceVar['0']
  },

  // Profile
  profileCard: { padding: spaceVar[7] },
  profileHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spaceVar[3],
    paddingBottom: spaceVar[5],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colorVar.bgNeutralFaded,
    marginBottom: spaceVar[5]
  },
  profileAvatar: {
    width: '4rem',
    height: '4rem',
    borderRadius: radiusVar.full,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, oklch(0.6 0.18 17.58), oklch(0.4 0.18 17.58))',
    color: colorVar.onPrimary,
    fontSize: fontSizeVar.xl,
    fontWeight: fontWeightVar.bold,
    boxShadow: shadowVar.md
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spaceVar['0.5']
  },
  profileName: {
    fontSize: fontSizeVar.md,
    fontWeight: fontWeightVar.semibold,
    color: colorVar.fgNeutral,
    textAlign: 'center'
  },
  profileEmail: {
    fontSize: fontSizeVar.sm,
    color: colorVar.fgNeutralFaded,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%'
  },
  profileBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    paddingLeft: spaceVar[3],
    paddingRight: spaceVar[3],
    paddingTop: spaceVar[1],
    paddingBottom: spaceVar[1],
    borderRadius: radiusVar.full,
    fontSize: fontSizeVar.xs,
    fontWeight: fontWeightVar.semibold,
    backgroundColor: colorVar.bgPrimaryFaded,
    color: colorVar.fgPrimary
  },
  profileStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spaceVar[2],
    marginBottom: spaceVar[5]
  },
  profileStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spaceVar['0.5'],
    padding: spaceVar[3],
    borderRadius: radiusVar.lg,
    backgroundColor: colorVar.bgPage
  },
  profileStatValue: {
    fontSize: fontSizeVar.md,
    fontWeight: fontWeightVar.bold,
    color: colorVar.fgNeutral
  },
  profileStatLabel: {
    fontSize: fontSizeVar.xs,
    color: colorVar.fgNeutralFaded,
    textAlign: 'center'
  },
  profileActions: { display: 'flex', flexDirection: 'column', gap: spaceVar[2] },
  profileActionLink: { display: 'block', width: '100%' },
  headerActions: { display: 'flex', alignItems: 'center', gap: '0.75rem' }
})

// ── Helpers ─────────────────────────────────────────────────────────────────

const iconContainerStyle = (variant: 'primary' | 'green' | 'orange' | 'destructive') => {
  const map = {
    primary: styles.iconPrimary,
    green: styles.iconGreen,
    orange: styles.iconOrange,
    destructive: styles.iconDestructive
  }
  return map[variant]
}

// ── Dashboard Overview ───────────────────────────────────────────────────────

function DashboardOverviewComponent() {
  const { user, logout } = useAuthentication()
  const displayName =
    user?.firstName?.trim() || user?.username?.trim() || user?.email?.split('@')[0] || 'Guest'
  const initial = displayName.charAt(0).toUpperCase()
  const email = user?.email ?? 'Sign in to sync your account'
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div {...stylex.props(styles.container)}>
      {/* Page header */}
      <div {...stylex.props(styles.pageHeader)}>
        <div {...stylex.props(styles.headerLeft)}>
          <p {...stylex.props(styles.pageLabel)}>Dashboard</p>
          <h1 {...stylex.props(styles.pageTitle)}>
            {greeting}
            {displayName !== 'Guest' ? `, ${displayName}` : ''}!
          </h1>
          <p {...stylex.props(styles.pageSubtitle)}>
            Here&apos;s what&apos;s happening across your workspace today.
          </p>
        </div>
        <div {...stylex.props(styles.headerActions)}>
          <Button color='neutral' variant='solid'>
            <Lucide.Download size={15} /> Export
          </Button>
          <Button color='primary' variant='solid'>
            <Lucide.Plus size={15} /> New Project
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <div {...stylex.props(styles.statsGrid)}>
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} {...stylex.props(styles.card)}>
              <div {...stylex.props(styles.statBody)}>
                <div {...stylex.props(styles.statTop)}>
                  <div>
                    <div {...stylex.props(styles.statValue)}>{stat.value}</div>
                    <div {...stylex.props(styles.statLabel)}>{stat.label}</div>
                  </div>
                  <div {...stylex.props(styles.statIcon, iconContainerStyle(stat.color))}>
                    <Icon size={18} />
                  </div>
                </div>
                <div
                  {...stylex.props(stat.positive ? styles.changePositive : styles.changeNegative)}
                >
                  {stat.positive ? (
                    <Lucide.TrendingUp size={12} />
                  ) : (
                    <Lucide.TrendingDown size={12} />
                  )}
                  {stat.change} vs last month
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Weekly chart */}
      <div {...stylex.props(styles.card)}>
        <div {...stylex.props(styles.chartCard)}>
          <div {...stylex.props(styles.chartHeader)}>
            <p {...stylex.props(styles.sectionTitle)}>Weekly Activity</p>
            <span {...stylex.props(styles.statLabel)}>Last 7 days</span>
          </div>
          <div {...stylex.props(styles.chartContainer)}>
            {weeklyData.map((d) => {
              const heightPct = Math.max((d.value / maxValue) * 100, 8)
              return (
                <div
                  key={d.day}
                  {...stylex.props(styles.chartBar)}
                  style={{ height: `${heightPct}%` }}
                >
                  <span {...stylex.props(styles.chartBarValue)}>{d.value}</span>
                  <span {...stylex.props(styles.chartBarLabel)}>{d.day}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom grid: activity + profile */}
      <div {...stylex.props(styles.bottomGrid)}>
        {/* Recent activity */}
        <div {...stylex.props(styles.card)}>
          <div {...stylex.props(styles.activityCard)}>
            <div {...stylex.props(styles.activityHeader)}>
              <p {...stylex.props(styles.sectionTitle)}>Recent Activity</p>
              <Button color='neutral' variant='solid'>
                View all
              </Button>
            </div>
            <div {...stylex.props(styles.activityList)}>
              {activity.map((item, idx) => (
                <div key={item.id}>
                  <div {...stylex.props(styles.activityItem)}>
                    <div {...stylex.props(styles.activityAvatar)}>{item.avatar}</div>
                    <div {...stylex.props(styles.activityContent)}>
                      <span {...stylex.props(styles.activityUser)}>{item.user}</span>
                      <span {...stylex.props(styles.activityAction)}>{item.action}</span>
                      <span {...stylex.props(styles.activityTime)}>{item.time}</span>
                    </div>
                  </div>
                  {idx < activity.length - 1 && <div {...stylex.props(styles.activityDivider)} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile card */}
        <div {...stylex.props(styles.card)}>
          <div {...stylex.props(styles.profileCard)}>
            <p {...stylex.props(styles.sectionTitle)}>My Profile</p>
            <div {...stylex.props(styles.profileHeader)}>
              <div {...stylex.props(styles.profileAvatar)}>{initial}</div>
              <div {...stylex.props(styles.profileInfo)}>
                <div {...stylex.props(styles.profileName)}>{displayName}</div>
                <div {...stylex.props(styles.profileEmail)}>{email}</div>
              </div>
              <span {...stylex.props(styles.profileBadge)}>Admin</span>
            </div>
            <div {...stylex.props(styles.profileStats)}>
              <div {...stylex.props(styles.profileStat)}>
                <span {...stylex.props(styles.profileStatValue)}>24</span>
                <span {...stylex.props(styles.profileStatLabel)}>Projects</span>
              </div>
              <div {...stylex.props(styles.profileStat)}>
                <span {...stylex.props(styles.profileStatValue)}>183</span>
                <span {...stylex.props(styles.profileStatLabel)}>Tasks</span>
              </div>
              <div {...stylex.props(styles.profileStat)}>
                <span {...stylex.props(styles.profileStatValue)}>7</span>
                <span {...stylex.props(styles.profileStatLabel)}>Teams</span>
              </div>
            </div>
            <div {...stylex.props(styles.profileActions)}>
              <Link to='/' {...stylex.props(styles.profileActionLink)}>
                <Button
                  color='neutral'
                  variant='solid'
                  {...stylex.props(x.width['100%'], x.justifyContent.center)}
                >
                  <Lucide.Home size={14} /> Back to Homepage
                </Button>
              </Link>
              <Button
                color='critical'
                variant='solid'
                onClick={logout}
                {...stylex.props(x.width['100%'], x.justifyContent.center)}
              >
                <Lucide.LogOut size={14} /> Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
