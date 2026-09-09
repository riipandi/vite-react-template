import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { Button } from '#/components/base/button'
import { Checkbox } from '#/components/base/checkbox'
import { Field, FieldError, FieldLabel, FieldSeparator } from '#/components/base/field'
import { Input } from '#/components/base/input'
import { Alert, AlertDescription, AlertTitle } from '#/components/extra/alert'
import { ButtonGroup } from '#/components/extra/button-group'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '#/components/extra/card'
import { InputPassword } from '#/components/extra/input-password'
import { LoaderText } from '#/components/extra/loader-text'
import { Spinner } from '#/components/extra/spinner'
import { Text } from '#/components/extra/text'
import { GitHubIcon, GoogleIcon, ViteIcon } from '#/components/icons'
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
  const navigate = useNavigate()
  const { loggedOut } = useSearch({ from: Route.id })
  const [failed, setFailed] = useState<string | null>(null)
  const [remember, setRemember] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // The goodbye alert belongs to the logout action that redirected here —
  // capture it once (initializer runs at mount only) so a refresh or
  // back-navigation never replays it.
  const [arrivedLoggedOut] = useState(loggedOut)
  const showGoodbye = Boolean(arrivedLoggedOut) && !dismissed && !failed

  // Consume the `loggedOut` search param so the browser history stays clean.
  useEffect(() => {
    if (!loggedOut) return
    void navigate({ to: '/login', search: {}, replace: true })
  }, [loggedOut, navigate])

  const clearAlerts = () => {
    setFailed(null)
    setDismissed(true)
  }

  const form = useForm({
    defaultValues: { username: '', password: '' },
    validators: { onSubmit: loginSchema },
    onSubmit: async ({ value }) => {
      setFailed(null)
      try {
        await login(value, { rememberMe: remember })
      } catch (error: unknown) {
        setFailed(getErrorMessage(error))
      }
    }
  })

  return (
    <Card size='md' id='login-card' style={styles.cardRoot}>
      <CardHeader style={styles.header}>
        <div {...stylex.props(styles.logo)}>
          <ViteIcon size={28} />
        </div>
        <Text render={<h1 />} variant='featured-5' weight='semibold'>
          Sign in to your account
        </Text>
        <CardDescription>Welcome back! Please enter your credentials.</CardDescription>
      </CardHeader>

      <CardContent>
        <div {...stylex.props(styles.alerts)}>
          {failed && (
            <Alert variant='destructive' id='login-alert-error'>
              <AlertTitle>Sign in failed</AlertTitle>
              <AlertDescription>{failed}</AlertDescription>
            </Alert>
          )}
          {showGoodbye && (
            <Alert id='login-alert-goodbye'>
              <AlertTitle>Goodbye!</AlertTitle>
              <AlertDescription>Your session has been terminated.</AlertDescription>
            </Alert>
          )}
        </div>

        <ButtonGroup orientation='vertical' style={styles.socialGroup}>
          <Button type='button' variant='outline' style={socialStyles.socialButton}>
            <GoogleIcon size={16} />
            Continue with Google
          </Button>
          <Button type='button' variant='outline' style={socialStyles.socialButton}>
            <GitHubIcon size={16} />
            Continue with GitHub
          </Button>
        </ButtonGroup>

        <FieldSeparator style={styles.divider}>or continue with</FieldSeparator>

        <form
          id='login-form'
          autoComplete='on'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <div id='login-form-grid' {...stylex.props(styles.formGrid)}>
            <form.Field
              name='username'
              children={(field) => {
                const error = field.state.meta.errors?.[0]?.message
                return (
                  <Field id='field-username' invalid={!!error}>
                    <FieldLabel htmlFor='username'>Username</FieldLabel>
                    <Input
                      id='username'
                      name='username'
                      placeholder='emilys'
                      autoComplete='username'
                      value={field.state.value}
                      onChange={(e) => {
                        clearAlerts()
                        field.handleChange(e.target.value)
                      }}
                      onBlur={field.handleBlur}
                    />
                    <FieldError errors={error ? [{ message: error }] : undefined} />
                  </Field>
                )
              }}
            />

            <form.Field
              name='password'
              children={(field) => {
                const error = field.state.meta.errors?.[0]?.message
                return (
                  <Field id='field-password' invalid={!!error}>
                    <FieldLabel htmlFor='password'>Password</FieldLabel>
                    <InputPassword
                      id='password'
                      name='password'
                      placeholder='••••••••'
                      autoComplete='current-password'
                      value={field.state.value}
                      onChange={(e) => {
                        clearAlerts()
                        field.handleChange(e.target.value)
                      }}
                      onBlur={field.handleBlur}
                    />
                    <FieldError errors={error ? [{ message: error }] : undefined} />
                  </Field>
                )
              }}
            />
          </div>

          <Field orientation='horizontal' style={styles.rememberField}>
            <Checkbox
              id='remember'
              name='remember'
              checked={remember}
              onCheckedChange={(checked) => setRemember(checked === true)}
            />
            <FieldLabel htmlFor='remember'>Remember me on this device</FieldLabel>
          </Field>

          <div {...stylex.props(styles.submitWrapper)}>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting] as const}
              children={([canSubmit, isSubmitting]) => (
                <Button type='submit' variant='primary' disabled={!canSubmit} style={styles.submit}>
                  {isSubmitting && <Spinner />}
                  {isSubmitting ? <LoaderText variant='body-2'>Signing in…</LoaderText> : 'Sign in'}
                </Button>
              )}
            />
          </div>
        </form>
      </CardContent>

      <CardFooter style={atoms.justifyContent.center}>
        <Text variant='body-2' color='neutral-faded'>
          Back to{' '}
          <Link to='/' {...stylex.props(styles.backLink)}>
            homepage
          </Link>
        </Text>
      </CardFooter>
    </Card>
  )
}
