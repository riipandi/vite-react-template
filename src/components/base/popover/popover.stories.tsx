import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '#/components/base/button'
import {
  Popover,
  PopoverPopup,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger
} from '#/components/base/popover'

const meta = {
  title: 'Base Components/Popover',
  component: Popover,
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
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button color='neutral' variant='outline' />}>
        Learn Spell
      </PopoverTrigger>
      <PopoverPopup className='w-72'>
        <PopoverTitle>Learn Expelliarmus</PopoverTitle>
        <PopoverDescription>
          Master this disarming charm to protect yourself in magical duels. Taught by Professor
          Filius Flitwick at Hogwarts.
        </PopoverDescription>
        <Button color='neutral' variant='outline' size='xs'>
          Learn Now
          <Icon.ArrowRightIcon weight='bold' />
        </Button>
      </PopoverPopup>
    </Popover>
  )
}
