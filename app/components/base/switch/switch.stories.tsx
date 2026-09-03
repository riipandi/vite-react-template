import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Switch } from './switch.component'

const meta = {
  title: 'Base Components/Switch',
  component: Switch,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    defaultChecked: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Switch>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { 'aria-label': 'Enable notifications', defaultChecked: true },
  render: (args) => <Switch {...args} />
}
