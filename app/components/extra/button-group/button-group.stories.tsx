import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '#/components/base/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '#/components/base/dropdown-menu'
import { Input } from '#/components/base/input'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from './button-group.component'

const meta = {
  title: 'Extra Components/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ButtonGroup>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  icon: { width: 16, height: 16 }
})

export default meta

export const Playground: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant='outline'>Archive</Button>
      <Button variant='outline'>Report</Button>
      <Button variant='outline'>Snooze</Button>
    </ButtonGroup>
  )
}

export const Orientation: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant='outline'>Archive</Button>
      <Button variant='outline'>Report</Button>
      <Button variant='outline'>Snooze</Button>
    </ButtonGroup>
  )
}

export const Split: Story = {
  name: 'Split button',
  render: () => (
    // The trigger's `render` swaps it for a Button — ButtonGroup then fuses both
    // the primary action and the trigger into one segmented control.
    <ButtonGroup>
      <Button>Deploy</Button>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size='icon' aria-label='More deploy options' />}>
          <ChevronDownIcon {...stylex.props(styles.icon)} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem>Deploy to staging</DropdownMenuItem>
          <DropdownMenuItem>Roll back last deploy</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}

export const Text: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Filter</ButtonGroupText>
      <ButtonGroupSeparator />
      <Button variant='outline'>Open</Button>
      <Button variant='outline'>Closed</Button>
      <Button variant='outline'>All</Button>
    </ButtonGroup>
  )
}

export const WithInput: Story = {
  name: 'Input',
  render: () => (
    <ButtonGroup>
      <Input type='email' placeholder='Email address' />
      <Button variant='outline'>Subscribe</Button>
    </ButtonGroup>
  )
}
