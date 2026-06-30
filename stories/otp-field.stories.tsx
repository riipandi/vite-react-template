import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { fn } from 'storybook/test'
import { OTPField, OTPFieldInput } from '#/components/base/otp-field'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/OTPField',
  component: OTPField,
  parameters: { layout: 'centered' },
  argTypes: {
    length: { control: { type: 'number', min: 4, max: 8, step: 1 } },
    disabled: { control: 'boolean' }
  },
  tags: [],
  args: { onValueChange: fn() }
} satisfies Meta<typeof OTPField>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    alignItems: 'center',
    minWidth: '16rem'
  }
})

export const Playground: Story = {
  args: { length: 6 },
  render: (args) => (
    <div {...stylex.props(layoutStyles.wrapper)} id='otp-playground-wrapper'>
      <OTPField id='otp-playground' {...args}>
        <OTPFieldInput id='otp-input-playground' />
      </OTPField>
    </div>
  )
}

export const Default: Story = {
  name: 'Default',
  args: { length: 6 } as never,
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='otp-default-wrapper'>
      <OTPField length={6}>
        <OTPFieldInput />
      </OTPField>
    </div>
  )
}
