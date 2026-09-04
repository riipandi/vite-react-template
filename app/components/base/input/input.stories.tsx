import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Button } from '#/components/base/button'
import { Field, FieldError, FieldLabel } from '#/components/base/field'
import { colors } from '#/styles/core/colors.stylex'
import { container, fontFamily, fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { Input } from './input.component'

const meta = {
  title: 'Base Components/Input',
  component: Input,
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
} satisfies Meta<typeof Input>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  wrap: {
    width: container.md
  },
  narrow: {
    width: container.sm
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: container.md
  },
  label: {
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium
  },
  row: {
    display: 'flex',
    gap: 8
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <Input placeholder='Email' type='email' />
    </div>
  )
}

export const WithLabel: Story = {
  name: 'With label',
  render: () => (
    <div {...stylex.props(styles.field)}>
      <label htmlFor='input-with-label-email' {...stylex.props(styles.label)}>
        Email
      </label>
      <Input id='input-with-label-email' placeholder='you@example.com' type='email' />
    </div>
  )
}

export const Disabled: Story = {
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <Input placeholder='Disabled' disabled />
    </div>
  )
}

export const Invalid: Story = {
  render: () => (
    <Field invalid style={styles.narrow}>
      <FieldLabel htmlFor='input-invalid-email'>Email</FieldLabel>
      <Input id='input-invalid-email' type='email' defaultValue='not-an-email' />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}

export const File: Story = {
  name: 'File',
  render: () => (
    <Field style={styles.narrow}>
      <FieldLabel htmlFor='input-file-picture'>Picture</FieldLabel>
      <Input id='input-file-picture' type='file' />
    </Field>
  )
}

export const WithButton: Story = {
  name: 'With button',
  render: () => (
    <Field style={styles.wrap}>
      <FieldLabel htmlFor='input-with-button-search'>Search</FieldLabel>
      <div {...stylex.props(styles.row)}>
        <Input id='input-with-button-search' placeholder='Search…' />
        <Button type='submit'>Search</Button>
      </div>
    </Field>
  )
}
