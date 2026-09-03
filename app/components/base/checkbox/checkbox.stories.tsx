import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Checkbox } from './checkbox.component'

const meta = {
  title: 'Base Components/Checkbox',
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { 'aria-label': 'Accept terms', defaultChecked: true },
  render: (args) => <Checkbox {...args} />
}
