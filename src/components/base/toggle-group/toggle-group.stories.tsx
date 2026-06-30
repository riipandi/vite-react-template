import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from '#/components/base/toggle'
import { ToggleGroup } from '#/components/base/toggle-group'

const meta = {
  title: 'Base Components/ToggleGroup',
  component: ToggleGroup,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div className='flex w-full min-w-md items-center justify-center'>
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
    <div className='flex items-center space-x-6'>
      <ToggleGroup multiple mode='icon' size='md' orientation='horizontal'>
        <Toggle value='bold' aria-label='Bold'>
          <Icon.TextBIcon weight='bold' />
        </Toggle>
        <Toggle value='italic' aria-label='Italic'>
          <Icon.TextItalicIcon weight='bold' />
        </Toggle>
        <Toggle value='underline' aria-label='Underline'>
          <Icon.TextUnderlineIcon weight='bold' />
        </Toggle>
      </ToggleGroup>
    </div>
  )
}

export const Vertical: Story = {
  args: {},
  render: () => (
    <div className='flex items-center space-x-6'>
      <ToggleGroup defaultValue={['start']} mode='icon' size='md' orientation='vertical'>
        <Toggle value='left' aria-label='Left'>
          <Icon.AlignLeftIcon weight='bold' />
        </Toggle>
        <Toggle value='center' aria-label='Center'>
          <Icon.TextAlignCenterIcon weight='bold' />
        </Toggle>
        <Toggle value='right' aria-label='Right'>
          <Icon.AlignRightIcon weight='bold' />
        </Toggle>
      </ToggleGroup>
    </div>
  )
}
