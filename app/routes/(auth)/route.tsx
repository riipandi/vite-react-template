import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { ThemeSwitcher } from '#/components/theme'
import { isAuthenticated } from '#/libraries/auth.store'
import { styles } from '#/styles/element/auth-layout.stylex'

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/overview' })
    }
  }
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
