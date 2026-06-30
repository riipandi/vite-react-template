import type { Meta, StoryObj } from '@storybook/react-vite'
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
      <div className='flex w-full min-w-md items-center justify-center'>
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
    <div className='flex items-center gap-6'>
      <Spinner className='text-foreground-neutral-faded' />
      <Spinner className='text-foreground-positive' size='sm' />
      <Spinner className='text-foreground-warning' size='md' />
      <Spinner className='text-foreground-critical' size='lg' />
      <Spinner className='text-foreground-primary' size='xl' />
      <Spinner size='xs' />
    </div>
  )
}
