import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '#/components/base/button'
import { Field, FieldLabel } from '#/components/base/field'
import { Input } from '#/components/base/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '#/components/extra/card'
import { Text } from '#/components/extra/text'
import { styles } from '#/styles/pages/login.stylex'

export const Route = createFileRoute('/(auth)/forgot-password')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'Forgot Password'
  }
})

function RouteComponent() {
  return (
    <Card size='md' id='forgot-password-card' style={styles.cardRoot}>
      <CardHeader style={styles.header}>
        <Text render={<h1 />} variant='featured-5' weight='semibold'>
          Forgot password?
        </Text>
        <CardDescription>
          Enter your account email and we will send you a reset link.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id='forgot-password-form'
          autoComplete='on'
          onSubmit={(e) => {
            // Demo template — the same-origin proxy backend has no reset flow.
            e.preventDefault()
          }}
        >
          <Field id='field-email'>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='you@example.com'
              autoComplete='off'
              required
            />
          </Field>
          <div {...stylex.props(styles.submitWrapper)}>
            <Button type='submit' variant='primary' style={styles.submit}>
              Send reset link
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter style={atoms.justifyContent.center}>
        <Text variant='body-2' color='neutral-faded'>
          Remembered it?{' '}
          <Link to='/login' {...stylex.props(styles.backLink)}>
            Back to sign in
          </Link>
        </Text>
      </CardFooter>
    </Card>
  )
}
