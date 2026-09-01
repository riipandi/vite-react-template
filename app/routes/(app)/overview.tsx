import * as stylex from '@stylexjs/stylex'
import { createFileRoute } from '@tanstack/react-router'
import { useAuthentication } from '#/libraries/guard/auth-provider'
import { styles } from '#/styles/pages/overview.stylex'

export const Route = createFileRoute('/(app)/overview')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Overview'
  }
})

function RouteComponent() {
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
