import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { ThemeSwitcher } from '#/components/theme'
import { ensureSessionLoaded } from '#/libraries/guard/auth-session'
import { isAuthenticated } from '#/libraries/guard/auth-store'
import { safeReturnTo } from '#/libraries/guard/auth-utils'
import { styles } from '#/styles/element/auth-layout.stylex'

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    await ensureSessionLoaded()
    if (isAuthenticated()) {
      // A signed-in visitor opening /login (stale bookmark, saved link)
      // goes straight to the originally requested path when present.
      const search = location.search as { return_to?: string } | undefined
      throw redirect({ href: safeReturnTo(search?.return_to) ?? '/overview' })
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
