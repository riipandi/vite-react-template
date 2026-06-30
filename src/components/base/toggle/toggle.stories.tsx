import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from '#/components/base/toggle'

const meta = {
  title: 'Base Components/Toggle',
  component: Toggle,
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
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div className='flex items-center space-x-3'>
      <Toggle
        aria-label='Favorite'
        className='data-pressed:*:[svg]:fill-red-500 data-pressed:*:[svg]:stroke-red-500'
        mode='icon'
        size='sm'
      >
        <Icon.HeartIcon weight='bold' />
        <span className='sr-only'>Favorite</span>
      </Toggle>

      <Toggle
        aria-label='Star'
        className='data-pressed:*:[svg]:fill-yellow-500 data-pressed:*:[svg]:stroke-yellow-500'
        mode='icon'
        size='md'
      >
        <Icon.StarIcon weight='bold' />
      </Toggle>

      <Toggle
        aria-label='Bookmark'
        className='data-pressed:*:[svg]:fill-blue-500 data-pressed:*:[svg]:stroke-blue-500'
        mode='icon'
        size='md'
        variant='ghost'
      >
        <Icon.BookmarkIcon weight='bold' />
      </Toggle>

      <Toggle
        aria-label='Favorite'
        className='data-pressed:*:[svg]:fill-red-500 data-pressed:*:[svg]:stroke-red-500'
        variant='ghost'
      >
        <Icon.HeartIcon weight='bold' />
        Favorite
      </Toggle>
    </div>
  )
}

export const SizeShowcase: Story = {
  args: {},
  render: () => (
    <div className='flex items-center space-x-3'>
      <Toggle
        aria-label='Bookmark'
        className='data-pressed:*:[svg]:fill-blue-500 data-pressed:*:[svg]:stroke-blue-500'
        mode='icon'
        size='sm'
      >
        <Icon.BookmarkIcon weight='bold' />
      </Toggle>

      <Toggle
        aria-label='Favorite'
        className='data-pressed:*:[svg]:fill-red-500 data-pressed:*:[svg]:stroke-red-500'
        size='sm'
      >
        <Icon.HeartIcon weight='bold' />
        Favorite
      </Toggle>

      <Toggle
        aria-label='Lightning'
        className='data-pressed:*:[svg]:fill-yellow-500 data-pressed:*:[svg]:stroke-yellow-500'
        mode='icon'
        size='md'
        variant='ghost'
      >
        <Icon.BookmarkIcon weight='bold' />
      </Toggle>

      <Toggle
        aria-label='Favorite'
        className='data-pressed:*:[svg]:fill-red-500 data-pressed:*:[svg]:stroke-red-500'
        size='md'
      >
        <Icon.HeartIcon weight='bold' />
        Favorite
      </Toggle>
    </div>
  )
}
