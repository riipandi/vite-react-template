import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Input } from '../../base/input'
import { Label } from './label.component'

const meta = {
  title: 'Extra Components/Label',
  component: Label,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['448px'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div
      {...stylex.props(x.width['100%'], x.display.flex, x.flexDirection.column, x.gap['0.375rem'])}
    >
      <Label htmlFor='name'>Wizard Name</Label>
      <Input id='name' placeholder='Enter your wizard name' />
    </div>
  )
}
