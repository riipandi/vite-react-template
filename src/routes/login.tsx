import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'
import x from '@stylexjs/atoms'
import { GitHubButton, GoogleButton } from '#/components/social-button'
import { Alert, Button, Card, HorizontalDivider, TextField } from '#/components/ui-react-aria'
import { useAuthentication } from '#/context/auth/AuthProvider'
import { isAuthenticated } from '#/lib/auth'
import { loginSchema } from '#/lib/schemas'

import { colors, fontSize, fontWeight, space } from '../assets/styles/tokens.stylex'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard/overview' })
    }
  },
  component: LoginComponent,
})

const loginStyles = stylex.create({
  wrapper: {
    width: '100%',
    maxWidth: '28rem',
  },
  cardBody: {
    padding: space[8],
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: space[2],
    marginBottom: space[6],
  },
  logoWrapper: {
    padding: space[3],
    borderRadius: '1rem',
    backgroundColor: colors.zinc50,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.zinc200,
    marginBottom: space[1],
  },
  logo: {
    height: '2.5rem',
    width: '2.5rem',
  },
  heading: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: colors.zinc900,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.zinc500,
    textAlign: 'center',
  },
  socialButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[3],
  },
  formGrid: {
    display: 'grid',
    rowGap: space[5],
  },
  submitWrapper: {
    marginTop: space[7],
    display: 'grid',
    width: '100%',
  },
  footer: {
    marginTop: space[6],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: space[1],
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.zinc500,
  },
  backLink: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.primary600,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  loggedOutMessage: {
    fontWeight: fontWeight.semibold,
  },
  alertSpacing: {
    marginBottom: space[4],
  },
})

const ViteLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257">
    <defs>
      <linearGradient id="vite-logo-a" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%">
        <stop offset="0%" stopColor="#41D1FF" />
        <stop offset="100%" stopColor="#BD34FE" />
      </linearGradient>
      <linearGradient id="vite-logo-b" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%">
        <stop offset="0%" stopColor="#FFEA83" />
        <stop offset="8.333%" stopColor="#FFDD35" />
        <stop offset="100%" stopColor="#FFA800" />
      </linearGradient>
    </defs>
    <path
      fill="url(#vite-logo-a)"
      d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"
    />
    <path
      fill="url(#vite-logo-b)"
      d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"
    />
  </svg>
)

function LoginComponent() {
  const { login, loggedOut } = useAuthentication()
  const [failed, setFailed] = useState<string | null>()

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      setFailed(null)
      try {
        await login(value)
      } catch (error: unknown) {
        setFailed((error as Error).message)
      }
    },
  })

  return (
    <main
      {...stylex.props(
        x.minHeight['100vh'],
        x.display.flex,
        x.alignItems.center,
        x.justifyContent.center,
        x.padding['1rem']
      )}
    >
      <div {...stylex.props(loginStyles.wrapper)}>
        {failed && (
          <div {...stylex.props(loginStyles.alertSpacing)}>
            <Alert variant="destructive">{failed}</Alert>
          </div>
        )}
        {loggedOut && (
          <div {...stylex.props(loginStyles.alertSpacing)}>
            <Alert variant="success">
              <span {...stylex.props(loginStyles.loggedOutMessage)}>Goodbye!</span> Your session has
              been terminated.
            </Alert>
          </div>
        )}

        <Card>
          <div {...stylex.props(loginStyles.cardBody)}>
            <div {...stylex.props(loginStyles.header)}>
              <div {...stylex.props(loginStyles.logoWrapper)}>
                <div {...stylex.props(loginStyles.logo)}>
                  <ViteLogo />
                </div>
              </div>
              <h1 {...stylex.props(loginStyles.heading)}>Sign in to your account</h1>
              <p {...stylex.props(loginStyles.subtitle)}>
                Welcome back! Please enter your credentials.
              </p>
            </div>

            <div {...stylex.props(loginStyles.socialButtons)}>
              <GoogleButton />
              <GitHubButton />
            </div>

            <HorizontalDivider label="or continue with" />

            <form
              autoComplete="on"
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
            >
              <div {...stylex.props(loginStyles.formGrid)}>
                <form.Field
                  name="username"
                  children={(field) => (
                    <TextField
                      label="Username"
                      value={field.state.value}
                      onChange={(value: string) => field.handleChange(value)}
                      onBlur={field.handleBlur}
                      errorMessage={field.state.meta.errors?.[0]?.message}
                    />
                  )}
                />

                <form.Field
                  name="password"
                  children={(field) => (
                    <TextField
                      label="Password"
                      type="password"
                      value={field.state.value}
                      onChange={(value: string) => field.handleChange(value)}
                      onBlur={field.handleBlur}
                      errorMessage={field.state.meta.errors?.[0]?.message}
                    />
                  )}
                />
              </div>

              <div {...stylex.props(loginStyles.submitWrapper)}>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button type="submit" variant="primary" isDisabled={!canSubmit}>
                      {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </Button>
                  )}
                />
              </div>
            </form>

            <div {...stylex.props(loginStyles.footer)}>
              <span {...stylex.props(loginStyles.footerText)}>Back to</span>
              <Link to="/" {...stylex.props(loginStyles.backLink)}>
                homepage
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
