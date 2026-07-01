import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { ToggleGroup } from '.'
import { Toggle } from '../toggle'

const meta = {
  title: 'Base Components/ToggleGroup',
  component: ToggleGroup,
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
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.gap['1.5rem'])} {...stylex.props(x.display.flex, x.alignItems.center)}>
      <ToggleGroup multiple mode='icon' size='md' orientation='horizontal'>
        <Toggle value='bold' aria-label='Bold'>
          <Lucide.Bold />
        </Toggle>
        <Toggle value='italic' aria-label='Italic'>
          <Lucide.Italic />
        </Toggle>
        <Toggle value='underline' aria-label='Underline'>
          <Lucide.Underline />
        </Toggle>
      </ToggleGroup>
    </div>
  )
}

export const Vertical: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.gap['1.5rem'])} {...stylex.props(x.display.flex, x.alignItems.center)}>
      <ToggleGroup defaultValue={['start']} mode='icon' size='md' orientation='vertical'>
        <Toggle value='left' aria-label='Left'>
          <Lucide.AlignLeft />
        </Toggle>
        <Toggle value='center' aria-label='Center'>
          <Lucide.AlignCenter />
        </Toggle>
        <Toggle value='right' aria-label='Right'>
          <Lucide.AlignRight />
        </Toggle>
      </ToggleGroup>
    </div>
  )
}
