import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Field, FieldDescription, FieldError, FieldLabel } from '#/components/base/field'
import { container } from '#/styles/core/tokens.stylex'
import { Textarea } from './textarea.component'

const meta = {
  title: 'Extra Components/Textarea',
  component: Textarea,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    disabled: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Textarea>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  wrap: {
    width: container.lg
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <Textarea placeholder='Type your message here.' />
    </div>
  )
}

export const WithField: Story = {
  name: 'With field',
  render: () => (
    <Field style={styles.wrap}>
      <FieldLabel htmlFor='textarea-with-field-bio'>Bio</FieldLabel>
      <Textarea id='textarea-with-field-bio' placeholder='Tell us a little about yourself' />
      <FieldDescription>You can @mention other users and organizations.</FieldDescription>
    </Field>
  )
}

export const Disabled: Story = {
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <Textarea placeholder='Disabled' disabled />
    </div>
  )
}

export const Invalid: Story = {
  render: () => (
    <Field invalid style={styles.wrap}>
      <FieldLabel htmlFor='textarea-invalid-bio'>Bio</FieldLabel>
      <Textarea id='textarea-invalid-bio' defaultValue='Hi' />
      <FieldError>Bio must be at least 10 characters.</FieldError>
    </Field>
  )
}
