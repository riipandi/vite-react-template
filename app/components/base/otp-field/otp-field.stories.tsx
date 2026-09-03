import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { OTPField, OTPFieldGroup, OTPFieldSeparator, OTPFieldSlot } from './otp-field.component'

const meta = {
  title: 'Base Components/OTPField',
  component: OTPField,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    length: { control: { type: 'number', min: 4, max: 8 } }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof OTPField>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { length: 4 },
  render: (args) => (
    <OTPField {...args}>
      <OTPFieldGroup>
        <OTPFieldSlot />
        <OTPFieldSlot />
        <OTPFieldSeparator />
        <OTPFieldSlot />
        <OTPFieldSlot />
      </OTPFieldGroup>
    </OTPField>
  )
}
