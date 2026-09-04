import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize } from '#/styles/core/tokens.stylex'
import { OTPField, OTPFieldGroup, OTPFieldSeparator, OTPFieldSlot } from './otp-field.component'

const meta = {
  title: 'Base Components/OTPField',
  component: OTPField,
  parameters: { layout: 'centered' },
  argTypes: {
    length: { control: 'number' },
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
} satisfies Meta<typeof OTPField>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  col: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  value: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.body2
  }
})

export default meta

export const Playground: Story = {
  args: { length: 6 },
  render: (args) => (
    <OTPField {...args}>
      <OTPFieldGroup>
        <OTPFieldSlot />
        <OTPFieldSlot />
        <OTPFieldSlot />
        <OTPFieldSlot />
        <OTPFieldSlot />
        <OTPFieldSlot />
      </OTPFieldGroup>
    </OTPField>
  )
}

export const Separator: Story = {
  args: { length: 8 },
  render: (args) => (
    <OTPField {...args}>
      <OTPFieldGroup>
        <OTPFieldSlot />
        <OTPFieldSlot />
        <OTPFieldSlot />
        <OTPFieldSlot />
      </OTPFieldGroup>
      <OTPFieldSeparator />
      <OTPFieldGroup>
        <OTPFieldSlot />
        <OTPFieldSlot />
        <OTPFieldSlot />
        <OTPFieldSlot />
      </OTPFieldGroup>
    </OTPField>
  )
}

export const Disabled: Story = {
  args: { length: 6, disabled: true, defaultValue: '123456' },
  render: (args) => (
    <OTPField {...args}>
      <OTPFieldGroup>
        <OTPFieldSlot />
        <OTPFieldSlot />
        <OTPFieldSlot />
        <OTPFieldSlot />
        <OTPFieldSlot />
        <OTPFieldSlot />
      </OTPFieldGroup>
    </OTPField>
  )
}

export const Controlled: Story = {
  args: { length: 6 },
  render: () => {
    const [value, setValue] = React.useState('')

    return (
      <div {...stylex.props(styles.col)}>
        <OTPField length={6} value={value} onValueChange={setValue}>
          <OTPFieldGroup>
            <OTPFieldSlot />
            <OTPFieldSlot />
            <OTPFieldSlot />
            <OTPFieldSlot />
            <OTPFieldSlot />
            <OTPFieldSlot />
          </OTPFieldGroup>
        </OTPField>
        <p {...stylex.props(styles.value)}>
          {value ? `Vault code: ${value}` : 'Enter your Gringotts vault code.'}
        </p>
      </div>
    )
  }
}
