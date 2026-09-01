// import * as React from 'react'
// import { Separator } from '../separator'
import type { Meta, StoryObj } from '@storybook/react-vite'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { fn } from 'storybook/test'
import { Button } from './button.component'

const meta = {
  title: 'Base Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  args: { onClick: fn() },
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.alignItems.center,
          atoms.justifyContent.center,
          atoms.minWidth['448px'],
          atoms.width['100%']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { color: 'primary', variant: 'solid' },
  render: (args) => <Button {...args}>Button</Button>
}
