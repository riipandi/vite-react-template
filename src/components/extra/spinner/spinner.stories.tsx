import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Spinner } from '#/components/extra/spinner'

const meta = {
  title: 'Extra Components/Spinner',
  component: Spinner,
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
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['1.5rem'])}>
      <Spinner color='#999999' />
      <Spinner color='#22c55e' size='sm' />
      <Spinner color='#f59e0b' size='md' />
      <Spinner color='#ef4444' size='lg' />
      <Spinner color='#a855f7' size='xl' />
      <Spinner size='xs' />
    </div>
  )
}
