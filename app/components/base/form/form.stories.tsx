import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, fn, userEvent, waitFor } from 'storybook/test'
import { Button } from '#/components/base/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '#/components/base/field'
import { Input } from '#/components/base/input'
import { container } from '#/styles/core/tokens.stylex'
import { Form } from './form.component'

const meta = {
  title: 'Base Components/Form',
  component: Form,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.justifyContent.center,
          atoms.padding['20px'],
          atoms.minWidth['448px'],
          atoms.width['100%']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Form>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  form: {
    maxWidth: container.medium
  },
  submit: {
    alignSelf: 'flex-start'
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <Form
      style={styles.form}
      onFormSubmit={(values) => {
        console.log(values)
      }}
    >
      <Field
        name='username'
        validate={(value) =>
          typeof value === 'string' && value.length < 2
            ? 'Your wizarding name must be at least 2 characters.'
            : null
        }
      >
        <FieldLabel>Wizard name</FieldLabel>
        <Input placeholder='sneveu' required />
        <FieldDescription>Engraved on your Gringotts vault key.</FieldDescription>
        <FieldError />
      </Field>
      <Field name='email'>
        <FieldLabel>Owl post address</FieldLabel>
        <Input type='email' placeholder='s.neveu@dbf.org' required />
        <FieldError />
      </Field>
      <Button type='submit' style={styles.submit}>
        Send via owl
      </Button>
    </Form>
  )
}

export const SubmitFlow: StoryObj<{ handleSubmit: ReturnType<typeof fn> }> = {
  name: 'submit flow',
  args: { handleSubmit: fn() },
  render: (args) => (
    <Form style={styles.form} onFormSubmit={args.handleSubmit}>
      <Field
        name='username'
        validate={(value) =>
          typeof value === 'string' && value.length < 2
            ? 'Your wizarding name must be at least 2 characters.'
            : null
        }
      >
        <FieldLabel>Wizard name</FieldLabel>
        <Input placeholder='sneveu' />
        <FieldError />
      </Field>
      <Field name='email'>
        <FieldLabel>Owl post address</FieldLabel>
        <Input type='email' placeholder='s.neveu@dbf.org' />
        <FieldError />
      </Field>
      <Button type='submit' style={styles.submit}>
        Send via owl
      </Button>
    </Form>
  ),
  play: async ({ canvas, args }) => {
    // A valid email keeps native validation out of the way; the short
    // username fails the Field validator instead.
    await userEvent.type(canvas.getByPlaceholderText('s.neveu@dbf.org'), 's@dbf.org')
    await userEvent.type(canvas.getByPlaceholderText('sneveu'), 's')
    await userEvent.click(canvas.getByRole('button', { name: 'Send via owl' }))

    await waitFor(() => expect(canvas.getByText(/at least 2 characters/i)).toBeInTheDocument())
    expect(args.handleSubmit).not.toHaveBeenCalled()

    // Fixing the value lets the form submit with consolidated values.
    await userEvent.type(canvas.getByPlaceholderText('sneveu'), 'neveu')
    await userEvent.click(canvas.getByRole('button', { name: 'Send via owl' }))
    await waitFor(() => expect(args.handleSubmit).toHaveBeenCalledTimes(1))
  }
}
