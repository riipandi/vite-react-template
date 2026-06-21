import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'
import { ThemeSwitcher } from '#/components/theme'
import { Alert, Button } from '#/components/ui-react-aria'
import { useAuthentication } from '#/context/auth/AuthProvider'
import { isAuthenticated } from '#/lib/auth'
import ViteLogo from '../assets/images/vite.svg'

import { colors, fontSize, space } from '../assets/styles/tokens.stylex'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard/overview' })
    }
  },
  component: HomeComponent,
})

const homeStyles = stylex.create({
  page: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    height: '100%',
    minHeight: '100vh',
    width: '100%',
    flexDirection: 'column',
  },
  header: {
    marginBottom: 'auto',
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    padding: space[4],
  },
  content: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: space[8],
    paddingLeft: space[4],
    paddingRight: space[4],
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem',
    '@media (min-width: 640px)': {
      paddingLeft: space[6],
      paddingRight: space[6],
    },
    '@media (min-width: 1024px)': {
      paddingLeft: space[8],
      paddingRight: space[8],
    },
  },
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    height: '7rem',
  },
  tagline: {
    textAlign: 'center',
    fontSize: fontSize.lg,
    color: colors.zinc500,
    '@media (min-width: 640px)': {
      marginTop: space[8],
    },
  },
  taglineText: {
    lineHeight: '2rem',
  },
  actions: {
    marginTop: space[4],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space[2],
    '@media (min-width: 640px)': {
      flexDirection: 'row',
      gap: space[3],
    },
  },
  alertWrapper: {
    width: '100%',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: space[5],
    paddingBottom: space[5],
    textAlign: 'center',
  },
  footerInner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '80rem',
    paddingLeft: space[4],
    paddingRight: space[4],
    '@media (min-width: 640px)': {
      paddingLeft: space[6],
      paddingRight: space[6],
    },
    '@media (min-width: 1024px)': {
      paddingLeft: space[8],
      paddingRight: space[8],
    },
  },
  footerText: {
    fontSize: fontSize.sm,
    letterSpacing: '0.025em',
    color: colors.zinc500,
  },
  footerLink: {
    color: colors.primary600,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  footerSubText: {
    marginTop: space[2],
    fontSize: fontSize.sm,
    letterSpacing: '0.025em',
    color: colors.zinc400,
  },
})

function HomeComponent() {
  const { user, loggedIn } = useAuthentication()

  return (
    <div {...stylex.props(homeStyles.page)}>
      <header {...stylex.props(homeStyles.header)} aria-hidden>
        <ThemeSwitcher className="size-9" />
      </header>
      <div {...stylex.props(homeStyles.content)}>
        <div {...stylex.props(homeStyles.logo)}>
          <img src={ViteLogo} alt="Vite logo" {...stylex.props(homeStyles.logoImg)} />
        </div>
        <div {...stylex.props(homeStyles.tagline)}>
          <p {...stylex.props(homeStyles.taglineText)}>
            This is an example starter template React with Vite.
          </p>
          <p {...stylex.props(homeStyles.taglineText)}>
            Vite + React + Typescript + StyleX + TanStack Form + TanStack Router + Vitest
          </p>
        </div>
        <div {...stylex.props(homeStyles.actions)}>
          <Link to="/dashboard" className="inline-flex items-center justify-center">
            <Button variant="primary">User Dashboard</Button>
          </Link>
          <a href="/admin" className="inline-flex items-center justify-center">
            <Button variant="destructive">Admin Dashboard</Button>
          </a>
          <a
            href="https://github.com/riipandi/vite-react-template"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="secondary">Get Source Code</Button>
          </a>
        </div>
        <div>
          <Alert variant={loggedIn ? 'info' : 'warning'} className="w-full text-center">
            {loggedIn ? `Welcome back ${user?.email} 👋` : 'You are not logged in!'}
          </Alert>
        </div>
      </div>
      <footer {...stylex.props(homeStyles.footer)}>
        <div {...stylex.props(homeStyles.footerInner)}>
          <p {...stylex.props(homeStyles.footerText)}>
            &copy; {new Date().getFullYear()} - Made by{' '}
            <a
              href="https://ripandis.com"
              {...stylex.props(homeStyles.footerLink)}
              target="_blank"
              rel="noreferrer"
            >
              Aris Ripandi
            </a>{' '}
            in 🇮🇩
          </p>
          <p {...stylex.props(homeStyles.footerSubText)}>v{import.meta.env.APP_VERSION}</p>
        </div>
      </footer>
    </div>
  )
}
