import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '../../base/input'
import { Label } from './label.component'

const meta = {
  title: 'Extra Components/Label',
  component: Label,
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
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div className='w-full space-y-1.5'>
      <Label htmlFor='name'>Wizard Name</Label>
      <Input id='name' placeholder='Enter your wizard name' />
    </div>
  )
}
