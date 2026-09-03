import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Toggle } from './toggle.component'

const meta = {
  title: 'Base Components/Toggle',
  component: Toggle,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    defaultPressed: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Toggle>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { 'aria-label': 'Toggle bold', defaultPressed: true },
  render: (args) => <Toggle {...args}>B</Toggle>
}
