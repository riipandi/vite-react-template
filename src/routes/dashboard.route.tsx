import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'
import x from '@stylexjs/atoms'
import { isAuthenticated } from '#/lib/auth'
import { SideNavbar } from '#/layouts/sidebar'

import { colors } from '../assets/styles/tokens.stylex'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' })
    }
  },
  component: DashboardLayout,
})

const styles = stylex.create({
  layout: { backgroundColor: colors.zinc100 },
})

function DashboardLayout() {
  return (
    <main {...stylex.props(x.display.flex, x.height['100%'], x.minHeight['100vh'], styles.layout)}>
      <SideNavbar collapsed={false} />
      <Outlet />
    </main>
  )
}
