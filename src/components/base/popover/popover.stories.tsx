import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { Popover, PopoverPopup, PopoverDescription, PopoverTitle, PopoverTrigger } from '.'
import { Button } from '../button'

const meta = {
  title: 'Base Components/Popover',
  component: Popover,
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
      <PopoverPopup {...stylex.props(x.width['18rem'])}>
        <PopoverTitle>Learn Expelliarmus</PopoverTitle>
        <PopoverDescription>
          Master this disarming charm to protect yourself in magical duels. Taught by Professor
          Filius Flitwick at Hogwarts.
        </PopoverDescription>
        <Button color='neutral' variant='outline' size='xs'>
          Learn Now
          <Lucide.ArrowRight />
        </Button>
      </PopoverPopup>
    </Popover>
  )
}
