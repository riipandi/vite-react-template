import ViteLogo from '/images/vite.svg'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { Button } from '#/components/base/button'
import { useAuthentication } from '#/guards/auth-provider'
import { isAuthenticated } from '#/guards/auth-store'
import { ThemeSwitcher } from '#/routes/-theme'
import { fontSizeVar, spaceVar, colorVar } from '#/styles/tokens.stylex'

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
    padding: spaceVar[4]
  },
  content: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar[8],
    paddingLeft: {
      default: spaceVar[4],
      '@media (min-width: 640px)': spaceVar[6],
      '@media (min-width: 1024px)': spaceVar[8]
    },
    paddingRight: {
      default: spaceVar[4],
      '@media (min-width: 640px)': spaceVar[6],
      '@media (min-width: 1024px)': spaceVar[8]
    },
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem'
  },
  tagline: {
    textAlign: 'center',
    fontSize: fontSizeVar.lg,
    color: colorVar.fgNeutralFaded,
    maxWidth: '36rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: {
      default: 0,
      '@media (min-width: 640px)': spaceVar[8]
    }
  },
  actions: {
    marginTop: spaceVar[4],
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 640px)': 'row'
    },
    alignItems: 'center',
    justifyContent: 'center',
    gap: {
      default: spaceVar[2],
      '@media (min-width: 640px)': spaceVar[3]
    }
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spaceVar[5],
    paddingBottom: spaceVar[5],
    textAlign: 'center'
  },
  footerInner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '80rem',
    paddingLeft: {
      default: spaceVar[4],
      '@media (min-width: 640px)': spaceVar[6],
      '@media (min-width: 1024px)': spaceVar[8]
    },
    paddingRight: {
      default: spaceVar[4],
      '@media (min-width: 640px)': spaceVar[6],
      '@media (min-width: 1024px)': spaceVar[8]
    }
  },
  footerText: {
    fontSize: fontSizeVar.sm,
    letterSpacing: '0.025em',
    color: colorVar.fgNeutralFaded
  },
  footerSubText: {
    marginTop: spaceVar[2],
    fontSize: fontSizeVar.sm,
    letterSpacing: '0.025em',
    color: colorVar.fgNeutralFaded
  },
  alert: {
    fontSize: fontSizeVar.sm,
    padding: spaceVar[3],
    borderRadius: '0.55rem',
    width: '100%',
    boxSizing: 'border-box'
  },
  alertLogin: {
    backgroundColor: colorVar.bgPrimaryFaded,
    color: colorVar.fgPrimary
  },
  alertLogout: {
    backgroundColor: colorVar.bgWarningFaded,
    color: colorVar.fgWarning
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
            <Button color='primary' variant='solid'>
              User Dashboard
            </Button>
          </Link>
          <a
            href='https://github.com/riipandi/vite-react-template'
            target='_blank'
            rel='noreferrer'
          >
            <Button color='neutral' variant='solid'>
              Get Source Code
            </Button>
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
