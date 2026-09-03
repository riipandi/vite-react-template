import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Input } from '#/components/base/input'
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from './field.component'

const meta = {
  title: 'Base Components/Field',
  component: Field,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Field>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <Field name='email'>
      <FieldLabel>Email</FieldLabel>
      <FieldContent>
        <Input placeholder='you@example.com' />
      </FieldContent>
      <FieldDescription>We'll never share your email with anyone else.</FieldDescription>
      <FieldError />
    </Field>
  )
}
