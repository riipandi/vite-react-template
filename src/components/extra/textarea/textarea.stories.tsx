import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Textarea } from './textarea.component'

const meta = {
  title: 'Extra Components/Textarea',
  component: Textarea,
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
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div
      {...stylex.props(x.display.flex, x.width['100%'], x.flexDirection.column, x.gap['1.5rem'])}
    >
      <Textarea variant='default' placeholder='Textarea variant default' />
      <Textarea variant='subtle' placeholder='Textarea variant subtle' />
    </div>
  )
}
