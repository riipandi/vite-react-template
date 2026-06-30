import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chip, ChipButton } from '#/components/extra/chip'

const meta = {
  title: 'Extra Components/Chip',
  component: Chip,
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
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div className='flex items-center space-x-3'>
      <Chip>
        Gryffindor
        <ChipButton>
          <Icon.XIcon weight='bold' />
        </ChipButton>
      </Chip>
      <Chip>
        Expelliarmus
        <ChipButton>
          <Icon.XIcon weight='bold' />
        </ChipButton>
      </Chip>
    </div>
  )
}

export const VariantShowcase: Story = {
  args: {},
  render: () => (
    <div className='flex items-center space-x-3'>
      <Chip>Default</Chip>
      <Chip variant='primary'>Primary</Chip>
      <Chip variant='outline'>Outline</Chip>
      <Chip variant='ghost'>Ghost</Chip>
    </div>
  )
}

export const SizeShowcase: Story = {
  args: {},
  render: () => (
    <div className='flex items-center space-x-3'>
      <Chip size='sm'>Small</Chip>
      <Chip size='md'>Medium</Chip>
      <Chip size='lg'>Large</Chip>
    </div>
  )
}

export const WithIcon: Story = {
  args: {},
  render: () => (
    <div className='flex items-center space-x-3'>
      <Chip>
        <Icon.BookIcon weight='bold' />
        The Da Vinci Code
      </Chip>
      <Chip>
        <Icon.MagicWandIcon weight='bold' />
        Hogwarts
      </Chip>
    </div>
  )
}
