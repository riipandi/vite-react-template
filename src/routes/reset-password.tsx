import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, useNavigate, useSearch } from '@tanstack/react-router'
import { Alert, Button, Card, TextField } from '#/components/ui-react-aria'
import { auth } from '#/lib/auth'
import { resetPasswordSchema } from '#/lib/schemas'

export const Route = createFileRoute('/reset-password')({
  component: ResetPasswordComponent,
})

function ResetPasswordComponent() {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })
  const token = (search as Record<string, string>)['recovery_token'] as string
  const [success, setSuccess] = useState('')
  const [failed, setFailed] = useState('')

  const form = useForm({
    defaultValues: {
      password: '',
    },
    validators: {
      onChange: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      if (!token) {
        setFailed('You need a recovery token to continue!')
        return
      }
      auth
        .verify('recovery', token)
        .then((response: any) => {
          response
            .update({ password: value.password })
            .then((result: any) => {
              setSuccess(
                `Password has been reset. Now, you can login with your email address: ${result.email}`
              )
            })
            .catch((error: Error) => setFailed(`Failed to reset your password: ${error.message}`))
        })
        .catch((error: Error) => setFailed(`Failed to reset your password: ${error.message}`))
    },
  })

  useEffect(() => {
    if (!token) {
      navigate({ to: '/recovery' })
    }
  }, [token, navigate])

  return (
    <main className="mx-auto w-full max-w-md py-10">
      {failed && <Alert variant="destructive">{failed}</Alert>}

      <Card>
        {success && (
          <div className="p-6 sm:p-8">
            <Alert variant="success">{success}</Alert>
            <div className="mt-6 grid w-full text-center">
              <Link to="/login">
                <Button variant="primary">Continue to your account &rarr;</Button>
              </Link>
            </div>
          </div>
        )}

        <div className={clsx('p-6 sm:p-8', success && 'hidden')}>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <div className="grid gap-y-4">
              <form.Field
                name="password"
                children={(field) => (
                  <TextField
                    label="New Password"
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
                    {isSubmitting ? 'Resetting...' : 'Reset Password'}
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
