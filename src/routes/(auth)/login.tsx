import * as stylex from '@stylexjs/stylex'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import { Button } from '#/components/base/button'
import { GitHubButton, GoogleButton } from '#/components/social-button'
import { useAuthentication } from '#/guards/auth-provider'
import { getErrorMessage } from '#/guards/auth-utils'
import { loginSchema } from '#/schemas/auth.schema'
import { fontSize, fontWeight, radius, space, color } from '#/styles/tokens.stylex'

const styles = stylex.create({
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.borderNeutral,
    backgroundColor: color.bgElevationBase,
    overflow: 'hidden',
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: '200ms'
  },
  cardBody: {
    padding: space[8]
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: space[2],
    marginBottom: space[6]
  },
  logoWrapper: {
    padding: space[3],
    borderRadius: '1rem',
    backgroundColor: color.bgPage,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.borderNeutral,
    marginBottom: space[1]
  },
  logo: {
    height: '2.5rem',
    width: '2.5rem'
  },
  heading: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: color.fgNeutral,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: color.fgNeutralFaded,
    textAlign: 'center'
  },
  socialButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[3]
  },
  separator: {
    display: 'flex',
    alignItems: 'center',
    gap: space[4],
    marginTop: space[6],
    marginBottom: space[6]
  },
  separatorLine: {
    flex: 1,
    height: '1px',
    backgroundColor: color.borderNeutralFaded
  },
  separatorText: {
    fontSize: fontSize.sm,
    color: color.fgNeutralFaded,
    whiteSpace: 'nowrap'
  },
  formGrid: {
    display: 'grid',
    rowGap: space[4]
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: space['1.5']
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: color.fgNeutral
  },
  input: {
    display: 'flex',
    width: '100%',
    height: '2.5rem',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: { default: color.borderNeutral, ':focus': color.borderPrimary },
    backgroundColor: color.bgPage,
    paddingLeft: space[3],
    paddingRight: space[3],
    paddingTop: space[2],
    paddingBottom: space[2],
    fontSize: fontSize.sm,
    color: color.fgNeutral,
    outline: 'none',
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: '150ms',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    '::placeholder': { color: color.fgNeutralFaded },
    ':focus': { boxShadow: `0 0 0 2px ${color.borderPrimaryFaded}` },
    ':disabled': { opacity: 0.5, cursor: 'not-allowed' }
  },
  inputError: {
    borderColor: color.borderCritical
  },
  fieldError: {
    fontSize: fontSize.xs,
    color: color.fgCritical,
    marginTop: space['0.5']
  },
  submitWrapper: {
    marginTop: space[7],
    display: 'grid',
    width: '100%'
  },
  footer: {
    marginTop: space[6],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: space[1]
  },
  footerText: {
    fontSize: fontSize.sm,
    color: color.fgNeutralFaded
  },
  backLink: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: color.fgPrimary,
    textDecoration: 'none',
    ':hover': { textDecoration: 'underline' }
  },
  loggedOutMessage: {
    fontWeight: fontWeight.semibold
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    gap: space[2],
    borderRadius: radius.lg,
    paddingLeft: space[4],
    paddingRight: space[4],
    paddingTop: space[3],
    paddingBottom: space[3],
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: space[4]
  },
  alertError: {
    backgroundColor: color.bgCriticalFaded,
    color: color.fgCritical
  },
  alertSuccess: {
    backgroundColor: color.bgPositiveFaded,
    color: color.fgPositive
  }
})

const ViteLogo = () => (
  <svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid meet' viewBox='0 0 256 257'>
    <defs>
      <linearGradient id='vite-logo-a' x1='-.828%' x2='57.636%' y1='7.652%' y2='78.411%'>
        <stop offset='0%' stopColor='#41D1FF' />
        <stop offset='100%' stopColor='#BD34FE' />
      </linearGradient>
      <linearGradient id='vite-logo-b' x1='43.376%' x2='50.316%' y1='2.242%' y2='89.03%'>
        <stop offset='0%' stopColor='#FFEA83' />
        <stop offset='8.333%' stopColor='#FFDD35' />
        <stop offset='100%' stopColor='#FFA800' />
      </linearGradient>
    </defs>
    <path
      fill='url(#vite-logo-a)'
      d='M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z'
    />
    <path
      fill='url(#vite-logo-b)'
      d='M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z'
    />
  </svg>
)

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
  validateSearch: z.object({
    loggedOut: z.coerce.boolean().optional()
  })
})

function RouteComponent() {
  const { login } = useAuthentication()
  const { loggedOut } = useSearch({ from: Route.id })
  const [failed, setFailed] = useState<string | null>(null)

  const clearAlerts = () => setFailed(null)

  const form = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    validators: {
      onChange: loginSchema
    },
    onSubmit: async ({ value }) => {
      setFailed(null)
      try {
        await login(value)
      } catch (error: unknown) {
        setFailed(getErrorMessage(error))
      }
    }
  })

  return (
    <>
      {failed && (
        <div id='login-alert-error' {...stylex.props(styles.alert, styles.alertError)}>
          {failed}
        </div>
      )}
      {loggedOut && !failed && (
        <div id='login-alert-goodbye' {...stylex.props(styles.alert, styles.alertSuccess)}>
          <span {...stylex.props(styles.loggedOutMessage)}>Goodbye!</span> Your session has been
          terminated.
        </div>
      )}

      <div id='login-card' {...stylex.props(styles.card)}>
        <div {...stylex.props(styles.cardBody)}>
          <div {...stylex.props(styles.header)}>
            <div {...stylex.props(styles.logoWrapper)}>
              <div {...stylex.props(styles.logo)}>
                <ViteLogo />
              </div>
            </div>
            <h1 {...stylex.props(styles.heading)}>Sign in to your account</h1>
            <p {...stylex.props(styles.subtitle)}>Welcome back! Please enter your credentials.</p>
          </div>

          <div {...stylex.props(styles.socialButtons)}>
            <GoogleButton />
            <GitHubButton />
          </div>

          <div {...stylex.props(styles.separator)}>
            <span {...stylex.props(styles.separatorLine)} />
            <span {...stylex.props(styles.separatorText)}>or continue with</span>
            <span {...stylex.props(styles.separatorLine)} />
          </div>

          <form
            id='login-form'
            autoComplete='on'
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <div {...stylex.props(styles.formGrid)}>
              <form.Field
                name='username'
                children={(field) => {
                  const error = field.state.meta.errors?.[0]?.message
                  return (
                    <div id='field-username' {...stylex.props(styles.field)}>
                      <label {...stylex.props(styles.label)} htmlFor='username'>
                        Username
                      </label>
                      <input
                        id='username'
                        value={field.state.value}
                        onChange={(e) => {
                          clearAlerts()
                          field.handleChange(e.target.value)
                        }}
                        onBlur={field.handleBlur}
                        {...stylex.props(styles.input, error ? styles.inputError : null)}
                      />
                      {error && <span {...stylex.props(styles.fieldError)}>{error}</span>}
                    </div>
                  )
                }}
              />

              <form.Field
                name='password'
                children={(field) => {
                  const error = field.state.meta.errors?.[0]?.message
                  return (
                    <div id='field-password' {...stylex.props(styles.field)}>
                      <label {...stylex.props(styles.label)} htmlFor='password'>
                        Password
                      </label>
                      <input
                        id='password'
                        type='password'
                        value={field.state.value}
                        onChange={(e) => {
                          clearAlerts()
                          field.handleChange(e.target.value)
                        }}
                        onBlur={field.handleBlur}
                        {...stylex.props(styles.input, error ? styles.inputError : null)}
                      />
                      {error && <span {...stylex.props(styles.fieldError)}>{error}</span>}
                    </div>
                  )
                }}
              />
            </div>

            <div {...stylex.props(styles.submitWrapper)}>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type='submit' color='primary' variant='solid' disabled={!canSubmit}>
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                  </Button>
                )}
              />
            </div>
          </form>

          <div {...stylex.props(styles.footer)}>
            <span {...stylex.props(styles.footerText)}>Back to</span>
            <Link to='/' {...stylex.props(styles.backLink)}>
              homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
