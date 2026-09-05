import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent } from 'storybook/test'
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
    width: container.large
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <Textarea placeholder='Draft your letter to the Daily Prophet…' />
    </div>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByPlaceholderText('Draft your letter to the Daily Prophet…')
    await userEvent.type(el, 'Dear Editor,')
    expect(el).toHaveValue('Dear Editor,')
  }
}

export const WithField: Story = {
  name: 'With field',
  render: () => (
    <Field style={styles.wrap}>
      <FieldLabel htmlFor='textarea-with-field-bio'>Symbologist bio</FieldLabel>
      <Textarea
        id='textarea-with-field-bio'
        placeholder='Tell us about your strangest symbol discovery'
      />
      <FieldDescription>
        You can @mention other wizards and wizarding organizations.
      </FieldDescription>
    </Field>
  )
}

export const Disabled: Story = {
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <Textarea placeholder='Locked by Ministry decree' disabled />
    </div>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByPlaceholderText('Locked by Ministry decree')
    expect(el).toBeDisabled()
    await userEvent.type(el, 'alohomora')
    expect(el).toHaveValue('')
  }
}

export const Invalid: Story = {
  render: () => (
    <Field invalid style={styles.wrap}>
      <FieldLabel htmlFor='textarea-invalid-bio'>Symbologist bio</FieldLabel>
      <Textarea id='textarea-invalid-bio' defaultValue='Dear Editor,' />
      <FieldError>Your letter must be at least 10 characters.</FieldError>
    </Field>
  )
}
