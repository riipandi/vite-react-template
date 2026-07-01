import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconBox } from './icon-box.component'

const meta = {
  title: 'Extra Components/IconBox',
  component: IconBox,
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
} satisfies Meta<typeof IconBox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div className='flex items-center gap-3'>
      <IconBox>
        <Icon.GearIcon weight='bold' />
      </IconBox>
      <IconBox variant='info'>
        <Icon.InfoIcon weight='bold' />
      </IconBox>
      <IconBox variant='danger'>
        <Icon.TrashIcon weight='bold' />
      </IconBox>
    </div>
  )
}

export const VariantShowcase: Story = {
  args: {},
  render: () => (
    <div className='flex items-center gap-3'>
      <IconBox>
        <Icon.PlayIcon weight='bold' />
      </IconBox>
      <IconBox variant='primary'>
        <Icon.GearIcon weight='bold' />
      </IconBox>
      <IconBox variant='secondary'>
        <Icon.GearIcon weight='bold' />
      </IconBox>
      <IconBox variant='info'>
        <Icon.InfoIcon weight='bold' />
      </IconBox>
      <IconBox variant='success'>
        <Icon.CheckCircleIcon weight='bold' />
      </IconBox>
      <IconBox variant='warning'>
        <Icon.WarningIcon weight='bold' />
      </IconBox>
      <IconBox variant='danger'>
        <Icon.TrashIcon weight='bold' />
      </IconBox>
    </div>
  )
}

export const CircleVariants: Story = {
  args: {},
  render: () => (
    <div className='flex items-center gap-3'>
      <IconBox circle>
        <Icon.PlayIcon weight='bold' />
      </IconBox>
      <IconBox variant='primary' circle>
        <Icon.GearIcon weight='bold' />
      </IconBox>
      <IconBox variant='secondary' circle>
        <Icon.GearIcon weight='bold' />
      </IconBox>
      <IconBox variant='info' circle>
        <Icon.InfoIcon weight='bold' />
      </IconBox>
      <IconBox variant='success' circle>
        <Icon.CheckCircleIcon weight='bold' />
      </IconBox>
      <IconBox variant='warning' circle>
        <Icon.WarningIcon weight='bold' />
      </IconBox>
      <IconBox variant='danger' circle>
        <Icon.TrashIcon weight='bold' />
      </IconBox>
    </div>
  )
}

export const SizeShowcase: Story = {
  args: {},
  render: () => (
    <div className='flex items-center gap-3'>
      <IconBox size='sm'>
        <Icon.PlayIcon weight='bold' />
      </IconBox>
      <IconBox size='md'>
        <Icon.PlayIcon weight='bold' />
      </IconBox>
      <IconBox size='lg'>
        <Icon.PlayIcon weight='bold' />
      </IconBox>
    </div>
  )
}
