import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Badge } from './badge.component'

const meta = {
  title: 'Extra Components/Badge',
  component: Badge,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive']
    }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Badge>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { variant: 'primary' },
  render: (args) => <Badge {...args}>Badge</Badge>
}
