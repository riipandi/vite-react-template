import ViteLogo from '/images/vite.svg'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { Button } from '#/components/base/button'
import { ThemeSwitcher } from '#/components/theme'
import { isAuthenticated } from '#/libraries/auth.store'
import { useAuthentication } from '#/libraries/guard/auth-provider'
import { homeStyles } from '#/styles/pages/home.stylex'

export const Route = createFileRoute('/')({
  component: HomeComponent,
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard/overview' })
    }
  },
  staticData: {
    pageTitle: 'Home'
  }
})

function HomeComponent() {
  const { user, loggedIn } = useAuthentication()

  return (
    <div
      {...stylex.props(
        atoms.marginLeft.auto,
        atoms.marginRight.auto,
        atoms.display.flex,
        atoms.height['100%'],
        atoms.minHeight['100vh'],
        atoms.width['100%'],
        atoms.flexDirection.column
      )}
    >
      <header {...stylex.props(homeStyles.header)}>
        <ThemeSwitcher />
      </header>
      <div {...stylex.props(homeStyles.content)}>
        <div
          {...stylex.props(
            atoms.marginLeft.auto,
            atoms.marginRight.auto,
            atoms.display.flex,
            atoms.alignItems.center,
            atoms.justifyContent.center
          )}
        >
          <img src={ViteLogo} alt='Vite logo' {...stylex.props(atoms.height['7rem'])} />
        </div>
        <div {...stylex.props(homeStyles.tagline)}>
          <p {...stylex.props(atoms.lineHeight['2rem'], atoms.marginBottom['0.5rem'])}>
            This is an example starter template React with Vite.
          </p>
          <p {...stylex.props(atoms.lineHeight['2rem'])}>
            Vite + React + Typescript + StyleX + TanStack + Vitest
          </p>
        </div>
        <div {...stylex.props(homeStyles.actions)}>
          <Link to='/dashboard'>
            <Button variant='default'>User Dashboard</Button>
          </Link>
          <a
            href='https://github.com/riipandi/vite-react-template'
            target='_blank'
            rel='noreferrer'
          >
            <Button variant='default'>Get Source Code</Button>
          </a>
        </div>
        <div>
          <div
            {...stylex.props(
              homeStyles.alert,
              loggedIn ? homeStyles.alertLogin : homeStyles.alertLogout
            )}
          >
            {loggedIn ? `Welcome back ${user?.email} 👋` : 'You are not logged in!'}
          </div>
        </div>
      </div>
      <footer {...stylex.props(homeStyles.footer)}>
        <div {...stylex.props(homeStyles.footerInner)}>
          <p {...stylex.props(homeStyles.footerText)}>
            &copy; {new Date().getFullYear()}
            {' - '}
            <span {...stylex.props(homeStyles.footerSubText)}>
              v{import.meta.env.PUBLIC_APP_VERSION}
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
}
