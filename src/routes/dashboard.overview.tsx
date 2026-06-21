import { createFileRoute, Link } from '@tanstack/react-router'
import * as Lucide from 'lucide-react'
import * as stylex from '@stylexjs/stylex'
import x from '@stylexjs/atoms'

import { Button, Card, Container } from '#/components/ui-react-aria'
import { useAuthentication } from '#/context/auth/AuthProvider'

import { colors, fontSize, fontWeight, radius, shadow, space } from '../assets/styles/tokens.stylex'

export const Route = createFileRoute('/dashboard/overview')({
  component: DashboardOverviewComponent,
})

// ── Stat card data ───────────────────────────────────────────────────────────

const stats = [
  {
    label: 'Total Users',
    value: '12,481',
    change: '+12.5%',
    positive: true,
    icon: Lucide.Users,
    color: 'primary' as const,
  },
  {
    label: 'Revenue',
    value: '$48,295',
    change: '+8.2%',
    positive: true,
    icon: Lucide.DollarSign,
    color: 'green' as const,
  },
  {
    label: 'Active Sessions',
    value: '3,642',
    change: '-2.1%',
    positive: false,
    icon: Lucide.Activity,
    color: 'orange' as const,
  },
  {
    label: 'Pending Tasks',
    value: '28',
    change: '+4 today',
    positive: false,
    icon: Lucide.ClipboardList,
    color: 'destructive' as const,
  },
]

// ── Activity feed data ────────────────────────────────────────────────────────

const activity = [
  {
    id: 1,
    user: 'Alice Johnson',
    action: 'Created a new project',
    time: '2 min ago',
    avatar: 'AJ',
    type: 'create' as const,
  },
  {
    id: 2,
    user: 'Bob Martinez',
    action: 'Completed task #482',
    time: '14 min ago',
    avatar: 'BM',
    type: 'complete' as const,
  },
  {
    id: 3,
    user: 'Carol Wei',
    action: 'Left a comment on Dashboard v2',
    time: '1 hr ago',
    avatar: 'CW',
    type: 'comment' as const,
  },
  {
    id: 4,
    user: 'David Kim',
    action: 'Uploaded 3 files to Media Library',
    time: '3 hr ago',
    avatar: 'DK',
    type: 'upload' as const,
  },
  {
    id: 5,
    user: 'Emma Torres',
    action: 'Invited 2 new team members',
    time: 'Yesterday',
    avatar: 'ET',
    type: 'invite' as const,
  },
]

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = stylex.create({
  // Page header
  pageHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: space[8],
    gap: space[4],
  },
  pageHeaderLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[1],
  },
  pageLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: colors.primary600,
  },
  pageTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.zinc900,
    lineHeight: '1.2',
  },
  pageSubtitle: {
    fontSize: fontSize.sm,
    color: colors.zinc500,
    marginTop: space[1],
  },

  // Section
  sectionTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.zinc800,
    marginBottom: space[4],
  },

  // Stat grid
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: space[4],
    marginBottom: space[8],
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },

  // Individual stat card
  statCard: {
    padding: space[5],
  },
  statTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: space[3],
  },
  statIconPrimary: {
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: radius.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary100,
    color: colors.primary600,
    flexShrink: 0,
  },
  statIconGreen: {
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: radius.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green50,
    color: colors.green700,
    flexShrink: 0,
  },
  statIconOrange: {
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: radius.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange50,
    color: colors.orange700,
    flexShrink: 0,
  },
  statIconDestructive: {
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: radius.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.destructive50,
    color: colors.destructive600,
    flexShrink: 0,
  },
  statValue: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.zinc900,
    lineHeight: '1',
    marginBottom: space[1],
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.zinc500,
    fontWeight: fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  statChangePositive: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space[1],
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.green700,
    marginTop: space[2],
  },
  statChangeNegative: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space[1],
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.destructive600,
    marginTop: space[2],
  },

  // Bottom grid (activity + user card)
  bottomGrid: {
    display: 'grid',
    gap: space[6],
    gridTemplateColumns: '1fr',
    '@media (min-width: 1024px)': {
      gridTemplateColumns: '1fr 22rem',
    },
  },

  // Activity feed
  activityCard: {
    padding: space[6],
  },
  activityHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: space[5],
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
  },
  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: space[3],
  },
  activityAvatar: {
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: radius.full,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary100,
    color: colors.primary700,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    flexShrink: 0,
    letterSpacing: '-0.025em',
  },
  activityContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: space['0.5'],
    minWidth: 0,
    flex: 1,
  },
  activityUser: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.zinc800,
  },
  activityAction: {
    fontSize: fontSize.sm,
    color: colors.zinc500,
  },
  activityTime: {
    fontSize: fontSize.xs,
    color: colors.zinc400,
    marginTop: space['0.5'],
  },
  activityDivider: {
    height: '1px',
    backgroundColor: colors.zinc100,
    marginTop: space[4],
    marginBottom: space['0'],
  },

  // User card
  profileCard: {
    padding: space[6],
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: space[3],
    paddingBottom: space[5],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.zinc100,
    marginBottom: space[5],
  },
  profileAvatar: {
    width: '4rem',
    height: '4rem',
    borderRadius: radius.full,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${colors.primary400}, ${colors.primary600})`,
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    boxShadow: shadow.md,
  },
  profileName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    color: colors.zinc900,
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: fontSize.sm,
    color: colors.zinc500,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
  profileBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    paddingLeft: space[3],
    paddingRight: space[3],
    paddingTop: space[1],
    paddingBottom: space[1],
    borderRadius: radius.full,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    backgroundColor: colors.primary100,
    color: colors.primary700,
  },
  profileStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: space[2],
    marginBottom: space[5],
  },
  profileStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: space['0.5'],
    padding: space[3],
    borderRadius: radius.lg,
    backgroundColor: colors.zinc50,
  },
  profileStatValue: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.zinc900,
  },
  profileStatLabel: {
    fontSize: fontSize.xs,
    color: colors.zinc500,
    textAlign: 'center',
  },
  profileActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[2],
  },
  profileActionLink: {
    display: 'block',
    width: '100%',
  },
  profileActionButton: {
    width: '100%',
    justifyContent: 'center',
  },
})

// ── Helper: icon container per variant ────────────────────────────────────────

const iconContainerStyle = (color: 'primary' | 'green' | 'orange' | 'destructive') => {
  const map = {
    primary: styles.statIconPrimary,
    green: styles.statIconGreen,
    orange: styles.statIconOrange,
    destructive: styles.statIconDestructive,
  }
  return map[color]
}

// ── Component ─────────────────────────────────────────────────────────────────

function DashboardOverviewComponent() {
  const { user, logout } = useAuthentication()
  const initial = user?.email?.charAt(0).toUpperCase() ?? '?'
  const email = user?.email ?? '—'

  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <Container fluid>
      {/* Page header */}
      <div {...stylex.props(styles.pageHeader)}>
        <div {...stylex.props(styles.pageHeaderLeft)}>
          <p {...stylex.props(styles.pageLabel)}>Dashboard</p>
          <h1 {...stylex.props(styles.pageTitle)}>
            {greeting}, {initial}!
          </h1>
          <p {...stylex.props(styles.pageSubtitle)}>
            Here&apos;s what&apos;s happening across your workspace today.
          </p>
        </div>

        <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
          <Button variant="secondary">
            <Lucide.Download size={15} />
            Export
          </Button>
          <Button variant="primary">
            <Lucide.Plus size={15} />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <div {...stylex.props(styles.statsGrid)}>
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <div {...stylex.props(styles.statCard)}>
                <div {...stylex.props(styles.statTop)}>
                  <div>
                    <div {...stylex.props(styles.statValue)}>{stat.value}</div>
                    <div {...stylex.props(styles.statLabel)}>{stat.label}</div>
                  </div>
                  <div {...stylex.props(iconContainerStyle(stat.color))}>
                    <Icon size={18} />
                  </div>
                </div>
                <div
                  {...stylex.props(
                    stat.positive ? styles.statChangePositive : styles.statChangeNegative
                  )}
                >
                  {stat.positive ? <Lucide.TrendingUp size={12} /> : <Lucide.TrendingDown size={12} />}
                  {stat.change} vs last month
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Bottom grid */}
      <div {...stylex.props(styles.bottomGrid)}>
        {/* Recent activity */}
        <Card>
          <div {...stylex.props(styles.activityCard)}>
            <div {...stylex.props(styles.activityHeader)}>
              <p {...stylex.props(styles.sectionTitle)}>Recent Activity</p>
              <Button variant="secondary">View all</Button>
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
                  {idx < activity.length - 1 && (
                    <div {...stylex.props(styles.activityDivider)} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* User / profile card */}
        <Card>
          <div {...stylex.props(styles.profileCard)}>
            <p {...stylex.props(styles.sectionTitle)}>My Profile</p>

            <div {...stylex.props(styles.profileHeader)}>
              <div {...stylex.props(styles.profileAvatar)}>{initial}</div>
              <div>
                <div {...stylex.props(styles.profileName)}>Account</div>
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
              <Link to="/" {...stylex.props(styles.profileActionLink)}>
                <Button variant="secondary" className={stylex.props(styles.profileActionButton).className}>
                  <Lucide.Home size={14} />
                  Back to Homepage
                </Button>
              </Link>
              <Button variant="destructive" onClick={logout} className={stylex.props(styles.profileActionButton).className}>
                <Lucide.LogOut size={14} />
                Sign Out
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  )
}
