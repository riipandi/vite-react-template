import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Separator } from './separator.component'

const meta = {
  title: 'Base Components/Separator',
  component: Separator,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Separator>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => (
    <div {...stylex.props(atoms.display.flex, atoms.flexDirection.column, atoms.gap['16px'])}>
      <span>Above the line</span>
      <Separator {...args} />
      <span>Below the line</span>
    </div>
  )
}
