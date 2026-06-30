import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '#/components/base/input'

const meta = {
  title: 'Base Components/Input',
  component: Input,
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
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div className='flex flex-col gap-3'>
      <Input placeholder='Spell name' className='w-full' />
      <Input placeholder='Subtle variant' variant='subtle' className='w-full' />
      <Input disabled placeholder='Disabled input' className='w-full' />
      <Input type='password' placeholder='••••••••••••••••' className='w-full' />
      <Input type='file' className='w-full' />
    </div>
  )
}

export const DatePicker: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <Input type='date' className='w-full' />
      <Input type='date' defaultValue='2025-01-15' className='w-full' />
      <Input type='date' min='2025-01-01' max='2025-12-31' className='w-full' />
      <Input type='date' disabled className='w-full' />
      <Input type='date' variant='subtle' className='w-full' />
    </div>
  )
}

export const TimePicker: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <Input type='time' className='w-full' />
      <Input type='time' defaultValue='09:30' className='w-full' />
      <Input type='time' step='1' defaultValue='14:30:45' className='w-full' />
      <Input type='time' disabled className='w-full' />
      <Input type='time' variant='subtle' className='w-full' />
    </div>
  )
}

export const DateTimePicker: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <Input type='datetime-local' className='w-full' />
      <Input type='datetime-local' defaultValue='2025-01-15T09:30' className='w-full' />
      <Input
        type='datetime-local'
        min='2025-01-01T00:00'
        max='2025-12-31T23:59'
        className='w-full'
      />
      <Input type='datetime-local' disabled className='w-full' />
      <Input type='datetime-local' variant='subtle' className='w-full' />
    </div>
  )
}

export const DateWithIcon: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <Input
        type='date'
        placeholder='Select date'
        className='flex-1 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
      />
      <Icon.Calendar className='text-foreground-neutral-faded mr-2.5 size-4' />
      <Input
        type='date'
        defaultValue='2025-06-15'
        className='flex-1 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
      />
      <Icon.Calendar className='text-foreground-neutral-faded mr-2.5 size-4' />
    </div>
  )
}

export const TimeWithIcon: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <Input
        type='time'
        placeholder='Select time'
        className='flex-1 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
      />
      <Icon.Clock className='text-foreground-neutral-faded mr-2.5 size-4' />
      <Input
        type='time'
        step='1'
        defaultValue='14:30:45'
        className='flex-1 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
      />
      <Icon.Clock className='text-foreground-neutral-faded mr-2.5 size-4' />
    </div>
  )
}
