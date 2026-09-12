import { EyeOff, Eye } from '@keyline-icons/react'
import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { expect, userEvent } from 'storybook/test'
import { Field, FieldError, FieldLabel } from '#/components/base/field'
import { container } from '#/styles/core/tokens.stylex'
import { InputPassword } from './input-password.component'

const meta = {
  title: 'Extra Components/InputPassword',
  component: InputPassword,
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
} satisfies Meta<typeof InputPassword>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: container.medium
  }
})

export default meta

export const Playground: Story = {
  render: (args) => (
    <div {...stylex.props(styles.field)}>
      <InputPassword {...args} placeholder='Enter the password...' />
    </div>
  ),
  argTypes: {
    disabled: { control: 'boolean' }
  }
}

export const WithLabel: Story = {
  name: 'With label',
  render: () => (
    <Field style={styles.field}>
      <FieldLabel htmlFor='input-password-labeled'>Vault passphrase</FieldLabel>
      <InputPassword id='input-password-labeled' placeholder='Pick a strong one...' />
    </Field>
  )
}

export const VisibleByDefault: Story = {
  name: 'Visible by default',
  render: () => (
    <div {...stylex.props(styles.field)}>
      <InputPassword defaultVisible defaultValue='alohomora-2024' />
    </div>
  )
}

export const Controlled: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(false)
    return (
      <div {...stylex.props(styles.field)}>
        <InputPassword
          visible={visible}
          onVisibleChange={setVisible}
          defaultValue='expecto-patronum'
        />
        <button type='button' onClick={() => setVisible((v) => !v)}>
          External toggle
        </button>
      </div>
    )
  }
}

export const CustomIcons: Story = {
  name: 'Custom icons',
  render: () => (
    <div {...stylex.props(styles.field)}>
      <InputPassword
        placeholder='Custom toggle icons...'
        showIcon={<Eye size={16} />}
        hideIcon={<EyeOff size={16} />}
      />
    </div>
  )
}

export const Invalid: Story = {
  render: () => (
    <Field invalid style={styles.field}>
      <FieldLabel htmlFor='input-password-invalid'>Vault passphrase</FieldLabel>
      <InputPassword id='input-password-invalid' defaultValue='123' />
      <FieldError>The passphrase must be at least 8 characters.</FieldError>
    </Field>
  )
}

export const Disabled: Story = {
  render: () => (
    <div {...stylex.props(styles.field)}>
      <InputPassword placeholder='Sealed by the Ministry' disabled />
    </div>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByPlaceholderText('Sealed by the Ministry')
    expect(el).toBeDisabled()
  }
}

export const Interaction: Story = {
  render: () => (
    <div {...stylex.props(styles.field)}>
      <InputPassword id='input-password-toggle' placeholder='Type and toggle...' />
    </div>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByPlaceholderText('Type and toggle...')
    await userEvent.type(el, 'alohomora')
    expect(el).toHaveAttribute('type', 'password')
    expect(el).toHaveValue('alohomora')
    const toggle = canvas.getByRole('button', { name: 'Show password' })
    await userEvent.click(toggle)
    expect(el).toHaveAttribute('type', 'text')
    expect(canvas.getByRole('button', { name: 'Hide password' })).toBeInTheDocument()
    await userEvent.click(toggle)
    expect(el).toHaveAttribute('type', 'password')
  }
}
