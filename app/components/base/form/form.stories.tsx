import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { Field, FieldContent, FieldError, FieldLabel } from '#/components/base/field'
import { Input } from '#/components/base/input'
import { Form } from './form.component'

const meta = {
  title: 'Base Components/Form',
  component: Form,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Form>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <Form>
      <Field name='email' validate={(value) => (value ? null : 'Email is required.')}>
        <FieldLabel>Email</FieldLabel>
        <FieldContent>
          <Input type='email' placeholder='you@example.com' />
        </FieldContent>
        <FieldError />
      </Field>
      <Button type='submit'>Submit form</Button>
    </Form>
  )
}
