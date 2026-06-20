import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { GitHubButton, GoogleButton } from '#/components/social-button'
import { Alert, Button, Card, HorizontalDivider, TextField } from '#/components/ui-react-aria'
import { auth, useAuthentication } from '#/context/auth/AuthProvider'
import { loginSchema } from '#/lib/schemas'

export default function Login() {
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
        .then((_response: any) => login())
        .catch((error: Error) => setFailed(error.message))
    },
  })

  return (
    <main className="mx-auto w-full max-w-md p-6">
      {failed && <Alert variant="destructive">{failed}</Alert>}
      {loggedOut && (
        <Alert variant="success">
          <span className="font-bold">Goodbye!</span> Your session has been terminated.
        </Alert>
      )}

      <Card>
        <div className="p-4 sm:px-7 sm:py-8">
          <div className="space-y-2">
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
            <p className="text-gray-600 text-sm dark:text-gray-400">
              <Link to="/" className="text-blue-600 decoration-2 hover:underline">
                &larr; Go back to homepage
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </main>
  )
}
