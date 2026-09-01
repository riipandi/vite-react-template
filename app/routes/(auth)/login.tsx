import * as stylex from '@stylexjs/stylex'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import { Button } from '#/components/base/button'
import { GitHubIcon, GoogleIcon } from '#/components/icons'
import { ViteIcon } from '#/components/icons'
import { useAuthentication } from '#/libraries/guard/auth-provider'
import { getErrorMessage } from '#/libraries/guard/auth-utils'
import { loginSchema } from '#/schemas/auth.schema'
import { socialStyles, styles } from '#/styles/pages/login.stylex'

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
  validateSearch: z.object({
    loggedOut: z.coerce.boolean().optional()
  }),
  staticData: {
    pageTitle: 'Sign In'
  }
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
                <ViteIcon size={36} />
              </div>
            </div>
            <h1 {...stylex.props(styles.heading)}>Sign in to your account</h1>
            <p {...stylex.props(styles.subtitle)}>Welcome back! Please enter your credentials.</p>
          </div>

          <div {...stylex.props(styles.socialButtons)}>
            <button type='button' {...stylex.props(socialStyles.socialButton)}>
              <GoogleIcon size={16} />
              Sign in with Google
            </button>
            <button type='button' {...stylex.props(socialStyles.socialButton)}>
              <GitHubIcon size={16} />
              Sign in with GitHub
            </button>
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
                  <Button type='submit' variant='solid' color='primary' disabled={!canSubmit}>
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
