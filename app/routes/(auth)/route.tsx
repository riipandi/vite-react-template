import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { ThemeSwitcher } from '#/components/theme'
import { isAuthenticated } from '#/libraries/auth.store'
import { spaceVar } from '#/styles/core/tokens.stylex'

const styles = stylex.create({
  wrapper: {
    width: '100%',
    maxWidth: '28rem'
  },
  header: {
    position: 'absolute',
    top: spaceVar[4],
    right: spaceVar[4],
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[2]
  }
})

export const Route = createFileRoute('/(auth)')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard/overview' })
    }
  },
  component: RouteComponent
})

function RouteComponent() {
  return (
    <main
      id='auth-layout'
      {...stylex.props(
        atoms.minHeight['100vh'],
        atoms.display.flex,
        atoms.alignItems.center,
        atoms.justifyContent.center,
        atoms.padding['1rem']
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
