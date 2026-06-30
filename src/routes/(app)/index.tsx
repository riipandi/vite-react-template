import ViteLogo from '/images/vite.svg'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { Alert } from '#/components/ui/alert'
import { Button } from '#/components/ui/button'
import { useAuthentication } from '#/guards/auth-provider'
import { isAuthenticated } from '#/guards/auth-store'
import { ThemeSwitcher } from '#/routes/-theme'
import { ui, fontSize, space } from '#/styles/token.stylex'

export const Route = createFileRoute('/(app)/')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard/overview' })
    }
  },
  component: HomeComponent
})

const homeStyles = stylex.create({
  header: {
    marginBottom: 'auto',
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    padding: space[4]
  },
  content: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: space[8],
    paddingLeft: {
      default: space[4],
      '@media (min-width: 640px)': space[6],
      '@media (min-width: 1024px)': space[8]
    },
    paddingRight: {
      default: space[4],
      '@media (min-width: 640px)': space[6],
      '@media (min-width: 1024px)': space[8]
    },
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem'
  },
  tagline: {
    textAlign: 'center',
    fontSize: fontSize.lg,
    color: ui.fgFaded,
    maxWidth: '36rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: {
      default: 0,
      '@media (min-width: 640px)': space[8]
    }
  },
  actions: {
    marginTop: space[4],
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 640px)': 'row'
    },
    alignItems: 'center',
    justifyContent: 'center',
    gap: {
      default: space[2],
      '@media (min-width: 640px)': space[3]
    }
  },
  footer: {
    marginTop: 'auto',
    paddingTop: space[5],
    paddingBottom: space[5],
    textAlign: 'center'
  },
  footerInner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '80rem',
    paddingLeft: {
      default: space[4],
      '@media (min-width: 640px)': space[6],
      '@media (min-width: 1024px)': space[8]
    },
    paddingRight: {
      default: space[4],
      '@media (min-width: 640px)': space[6],
      '@media (min-width: 1024px)': space[8]
    }
  },
  footerText: {
    fontSize: fontSize.sm,
    letterSpacing: '0.025em',
    color: ui.fgFaded
  },
  footerSubText: {
    marginTop: space[2],
    fontSize: fontSize.sm,
    letterSpacing: '0.025em',
    color: ui.fgFaded
  }
})

function HomeComponent() {
  const { user, loggedIn } = useAuthentication()

  return (
    <div
      {...stylex.props(
        x.marginLeft.auto,
        x.marginRight.auto,
        x.display.flex,
        x.height['100%'],
        x.minHeight['100vh'],
        x.width['100%'],
        x.flexDirection.column
      )}
    >
      <header {...stylex.props(homeStyles.header)} aria-hidden>
        <ThemeSwitcher />
      </header>
      <div {...stylex.props(homeStyles.content)}>
        <div
          {...stylex.props(
            x.marginLeft.auto,
            x.marginRight.auto,
            x.display.flex,
            x.alignItems.center,
            x.justifyContent.center
          )}
        >
          <img src={ViteLogo} alt='Vite logo' {...stylex.props(x.height['7rem'])} />
        </div>
        <div {...stylex.props(homeStyles.tagline)}>
          <p {...stylex.props(x.lineHeight['2rem'], x.marginBottom['0.5rem'])}>
            This is an example starter template React with Vite.
          </p>
          <p {...stylex.props(x.lineHeight['2rem'])}>
            Vite + React + Typescript + StyleX + TanStack Form + TanStack Router + Vitest
          </p>
        </div>
        <div {...stylex.props(homeStyles.actions)}>
          <Link to='/dashboard'>
            <Button variant='primary'>User Dashboard</Button>
          </Link>
          <a
            href='https://github.com/riipandi/vite-react-template'
            target='_blank'
            rel='noreferrer'
          >
            <Button variant='secondary'>Get Source Code</Button>
          </a>
        </div>
        <div>
          <Alert variant={loggedIn ? 'info' : 'warning'}>
            {loggedIn ? `Welcome back ${user?.email} 👋` : 'You are not logged in!'}
          </Alert>
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
