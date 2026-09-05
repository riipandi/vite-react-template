import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent } from 'storybook/test'
import { Button } from '#/components/base/button'
import { Field, FieldError, FieldLabel } from '#/components/base/field'
import { colors } from '#/styles/core/colors.stylex'
import { container, fontFamily, fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { Input } from './input.component'

const meta = {
  title: 'Base Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' }
  },
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
      <Input placeholder='Owl post address' type='email' />
    </div>
  )
}

export const WithLabel: Story = {
  name: 'With label',
  render: () => (
    <div {...stylex.props(styles.field)}>
      <label htmlFor='input-with-label-email' {...stylex.props(styles.label)}>
        Owl post address
      </label>
      <Input id='input-with-label-email' placeholder='luna.lovegood@ravenclaw.edu' type='email' />
    </div>
  )
}

export const Disabled: Story = {
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <Input placeholder='Sealed by the Ministry' disabled />
    </div>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByPlaceholderText('Sealed by the Ministry')
    expect(el).toBeDisabled()
    await userEvent.click(el)
    await userEvent.type(el, 'alohomora')
    expect(el).toHaveValue('')
  }
}

export const Invalid: Story = {
  render: () => (
    <Field invalid style={styles.narrow}>
      <FieldLabel htmlFor='input-invalid-email'>Owl post address</FieldLabel>
      <Input id='input-invalid-email' type='email' defaultValue='ron.weasley@hogwarts' />
      <FieldError>That owl address is not registered with the Owl Office.</FieldError>
    </Field>
  )
}

export const File: Story = {
  name: 'File',
  render: () => (
    <Field style={styles.narrow}>
      <FieldLabel htmlFor='input-file-picture'>Chocolate Frog card</FieldLabel>
      <Input id='input-file-picture' type='file' />
    </Field>
  )
}

export const WithButton: Story = {
  name: 'With button',
  render: () => (
    <Field style={styles.wrap}>
      <FieldLabel htmlFor='input-with-button-search'>Hogwarts archives</FieldLabel>
      <div {...stylex.props(styles.row)}>
        <Input id='input-with-button-search' placeholder='Search the restricted section…' />
        <Button type='submit'>Accio</Button>
      </div>
    </Field>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByPlaceholderText('Search the restricted section…')
    await userEvent.type(el, 'plexiglass')
    expect(el).toHaveValue('plexiglass')
    expect(canvas.getByRole('button', { name: 'Accio' })).toBeEnabled()
  }
}
