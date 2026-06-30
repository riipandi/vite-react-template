import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { OTPField, OTPFieldInput, OTPFieldSeparator } from '#/components/base/otp-field'
import { fontSize, fontWeight, color } from '#/styles/tokens.stylex'

const meta = {
  title: 'Base Components/OTPField',
  component: OTPField,
  parameters: { layout: 'centered' },
  tags: []
} satisfies Meta<typeof OTPField>

export default meta
type Story = StoryObj<typeof meta>

const sizes = ['sm', 'md', 'lg', 'xl'] as const

export const Playground: Story = {
  args: {
    length: 6
  },
  render: (args) => (
    <OTPField {...args}>
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
    </OTPField>
  )
}

export const SizeShowcase: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  args: { length: 6 },
  render: (args) => (
    <div
      {...stylex.props(
        x.display.flex,
        x.flexDirection.column,
        x.alignItems.flexStart,
        x.gap['1rem']
      )}
    >
      {sizes.map((s) => (
        <OTPField key={s} {...args} size={s}>
          <OTPFieldInput size={s} />
          <OTPFieldInput size={s} />
          <OTPFieldInput size={s} />
          <OTPFieldInput size={s} />
          <OTPFieldInput size={s} />
          <OTPFieldInput size={s} />
        </OTPField>
      ))}
    </div>
  )
}

export const WithSeparator: Story = {
  name: 'With Separator',
  parameters: { controls: { disable: true } },
  args: {
    length: 6
  },
  render: (args) => (
    <OTPField {...args}>
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldSeparator />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
    </OTPField>
  )
}

export const FourDigits: Story = {
  name: '4 Digits',
  parameters: { controls: { disable: true } },
  args: {
    length: 4
  },
  render: (args) => (
    <OTPField {...args}>
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
    </OTPField>
  )
}

export const EightDigits: Story = {
  name: '8 Digits',
  parameters: { controls: { disable: true } },
  args: {
    length: 8
  },
  render: (args) => (
    <OTPField {...args}>
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldSeparator />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
    </OTPField>
  )
}

export const Disabled: Story = {
  name: 'Disabled',
  parameters: { controls: { disable: true } },
  args: {
    length: 6,
    disabled: true
  },
  render: (args) => (
    <OTPField {...args}>
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
    </OTPField>
  )
}

export const Controlled: Story = {
  name: 'Controlled State',
  parameters: { controls: { disable: true } },
  args: {
    length: 6
  },
  render: () => {
    const [value, setValue] = React.useState('')
    return (
      <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['1rem'])}>
        <p
          {...stylex.props(x.color[color.fgNeutralFaded])}
          {...stylex.props(x.fontSize[fontSize.sm])}
        >
          Value:{' '}
          <span
            {...stylex.props(x.color[color.fgNeutral])}
            {...stylex.props(x.fontWeight[fontWeight.medium])}
          >
            {value || '(empty)'}
          </span>
        </p>
        <OTPField length={6} value={value} onValueChange={setValue}>
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
        </OTPField>
      </div>
    )
  }
}

export const AutoFocus: Story = {
  name: 'Auto Focus',
  parameters: { controls: { disable: true } },
  args: {
    length: 6
  },
  render: (args) => (
    <OTPField {...args}>
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
    </OTPField>
  )
}
