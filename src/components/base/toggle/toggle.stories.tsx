import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { Toggle } from '.'

const meta = {
  title: 'Base Components/Toggle',
  component: Toggle,
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
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
      <Toggle aria-label='Favorite' mode='icon' size='sm'>
        <Lucide.Heart />
        <span
          {...stylex.props(x.position.absolute, x.width['1px'], x.height['1px'], x.overflow.hidden)}
        >
          Favorite
        </span>
      </Toggle>

      <Toggle aria-label='Star' mode='icon' size='md'>
        <Lucide.Star />
      </Toggle>

      <Toggle aria-label='Bookmark' mode='icon' size='md' variant='ghost'>
        <Lucide.Bookmark />
      </Toggle>

      <Toggle aria-label='Favorite' variant='ghost'>
        <Lucide.Heart />
        Favorite
      </Toggle>
    </div>
  )
}

export const SizeShowcase: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
      <Toggle aria-label='Bookmark' mode='icon' size='sm'>
        <Lucide.Bookmark />
      </Toggle>

      <Toggle aria-label='Favorite' size='sm'>
        <Lucide.Heart />
        Favorite
      </Toggle>

      <Toggle aria-label='Lightning' mode='icon' size='md' variant='ghost'>
        <Lucide.Bookmark />
      </Toggle>

      <Toggle aria-label='Favorite' size='md'>
        <Lucide.Heart />
        Favorite
      </Toggle>
    </div>
  )
}
