import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from '#/components/base/separator'
import { Text } from '#/components/extra/typography'

const meta = {
  title: 'Base Components/Separator',
  component: Separator,
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
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {},
  render: () => (
    <div className='w-full max-w-sm'>
      <span>Chapter 1 begins here.</span>
      <Separator orientation='horizontal' className='my-4' />
      <span>Chapter 2 continues here.</span>
    </div>
  )
}

export const Vertical: Story = {
  args: {},
  render: () => (
    <div className='mx-auto flex w-full max-w-sm items-center justify-center gap-3'>
      <Text>Gryffindor</Text>
      <Text>Slytherin</Text>
      <Text>Ravenclaw</Text>
      <Separator orientation='vertical' />
      <Text>Hufflepuff</Text>
    </div>
  )
}

export const Divider: Story = {
  args: {},
  render: () => (
    <div className='flex w-full flex-col'>
      <Separator className='my-4' contentSide='left'>
        Chapter 1
      </Separator>
      <Separator className='my-4' contentSide='center'>
        The Da Vinci Code
      </Separator>
      <Separator className='my-4' contentSide='right'>
        Harry Potter Series
      </Separator>
    </div>
  )
}
