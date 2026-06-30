import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '#/guards/auth-store'
import { ThemeSwitcher } from '#/routes/-theme'
import { space } from '#/styles/tokens.stylex'

export const Route = createFileRoute('/(auth)')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard/overview' })
    }
  },
  component: RouteComponent
})

const styles = stylex.create({
  wrapper: {
    width: '100%',
    maxWidth: '28rem'
  },
  header: {
    position: 'absolute',
    top: space[4],
    right: space[4],
    display: 'flex',
    alignItems: 'center',
    gap: space[2]
  }
})

function RouteComponent() {
  return (
    <main
      id='auth-layout'
      {...stylex.props(
        x.minHeight['100vh'],
        x.display.flex,
        x.alignItems.center,
        x.justifyContent.center,
        x.padding['1rem']
      )}
    >
      <header id='auth-header' {...stylex.props(styles.header)}>
        <ThemeSwitcher />
      </header>
      <div id='auth-card-wrapper' {...stylex.props(styles.wrapper)}>
        <Outlet />
      </div>
    </main>
  )
}
