import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { GitHubButton, GoogleButton } from '#/components/social-button'
import { Alert, Button, Card, HorizontalDivider, TextField } from '#/components/ui-react-aria'
import { useAuthentication } from '#/context/auth/AuthProvider'
import { auth, isAuthenticated } from '#/lib/auth'
import { loginSchema } from '#/lib/schemas'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard/overview' })
    }
  },
  component: LoginComponent,
})

function LoginComponent() {
  const { login, loggedOut } = useAuthentication()
  const [failed, setFailed] = useState<string | null>()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      setFailed(null)
      const { email, password } = value
      await auth
        .login(email, password, true)
        .then(() => login())
        .catch((error: Error) => setFailed(error.message))
    },
  })

  return (
    <main className="mx-auto w-full max-w-md py-10">
      {failed && <Alert variant="destructive">{failed}</Alert>}
      {loggedOut && (
        <Alert variant="success">
          <span className="font-semibold">Goodbye!</span> Your session has been terminated.
        </Alert>
      )}

      <Card>
        <div className="p-6 sm:p-8">
          <div className="space-y-3">
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
            <div className="grid gap-y-4">
              <div>
                <form.Field
                  name="email"
                  children={(field) => (
                    <TextField
                      label="Email address"
                      value={field.state.value}
                      onChange={(value: string) => field.handleChange(value)}
                      onBlur={field.handleBlur}
                      errorMessage={field.state.meta.errors?.[0]?.message}
                    />
                  )}
                />
              </div>

              <form.Field
                name="password"
                children={(field) => (
                  <TextField
                    label="Password"
                    value={field.state.value}
                    onChange={(value: string) => field.handleChange(value)}
                    onBlur={field.handleBlur}
                    errorMessage={field.state.meta.errors?.[0]?.message}
                  />
                )}
              />
            </div>

            <div className="mt-6 grid w-full">
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

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              <Link
                to="/"
                className="text-primary-600 dark:text-primary-400 decoration-2 hover:underline"
              >
                &larr; Go back to homepage
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </main>
  )
}
