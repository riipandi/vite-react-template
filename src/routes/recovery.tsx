import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { Alert, Button, Card, TextField } from '#/components/ui-react-aria'
import { auth, isAuthenticated } from '#/lib/auth'
import { recoverySchema } from '#/lib/schemas'

export const Route = createFileRoute('/recovery')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard/overview' })
    }
  },
  component: RecoveryComponent,
})

function RecoveryComponent() {
  const [success, setSuccess] = useState<string | null>()
  const [failed, setFailed] = useState<string | null>()

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onChange: recoverySchema,
    },
    onSubmit: async ({ value }) => {
      setFailed(null)
      setSuccess(null)
      auth
        .requestPasswordRecovery(value.email)
        .then(() => setSuccess('Password recovery request sent, check your email.'))
        .catch((error: Error) => setFailed(`Failed to request password recovery: ${error.message}`))
    },
  })

  return (
    <main className="mx-auto w-full max-w-md py-10">
      {success && <Alert variant="success">{success}</Alert>}
      {failed && <Alert variant="destructive">{failed}</Alert>}

      <Card>
        <div className="p-6 sm:p-8">
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
            </div>

            <div className="mt-6 grid w-full">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" variant="primary" isDisabled={!canSubmit}>
                    {isSubmitting ? 'Sending...' : 'Recover Password'}
                  </Button>
                )}
              />
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {'Remember your password? '}
              <Link
                to="/login"
                className="text-primary-600 dark:text-primary-400 decoration-2 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </main>
  )
}
