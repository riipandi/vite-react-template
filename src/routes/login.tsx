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
  cardBody: {
    padding: space[6],
    '@media (min-width: 640px)': {
      padding: space[8],
    },
  },
  socialButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[3],
  },
  formGrid: {
    display: 'grid',
    rowGap: space[4],
  },
  submitWrapper: {
    marginTop: space[6],
    display: 'grid',
    width: '100%',
  },
  footer: {
    marginTop: space[8],
    textAlign: 'center',
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.zinc500,
  },
  backLink: {
    color: colors.primary600,
    textDecoration: 'none',
    textDecorationThickness: 2,
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
        x.marginLeft.auto,
        x.marginRight.auto,
        x.width['100%'],
        x.maxWidth['28rem'],
        x.paddingLeft['1rem'],
        x.paddingRight['1rem'],
        x.paddingTop['2.5rem'],
        x.paddingBottom['2.5rem']
      )}
    >
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
          <div {...stylex.props(loginStyles.socialButtons)}>
            <GoogleButton />
            <GitHubButton />
          </div>

          <HorizontalDivider label="Or" />

          <form
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <div {...stylex.props(loginStyles.formGrid)}>
              <div>
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
              </div>

              <div>
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
            <p {...stylex.props(loginStyles.footerText)}>
              <Link to="/" {...stylex.props(loginStyles.backLink)}>
                &larr; Go back to homepage
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </main>
  )
}
