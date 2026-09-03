import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut
} from './command.component'

const commands = ['Calendar', 'Search', 'Settings', 'Calculator']

const meta = {
  title: 'Extra Components/Command',
  component: Command,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Command>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { items: commands },
  render: (args) => (
    <Command {...args}>
      <CommandInput placeholder='Type a command…' />
      <CommandList>
        {(item) => (
          <CommandItem key={item} value={item}>
            {item}
            {item === 'Settings' && <CommandShortcut>⌘,</CommandShortcut>}
          </CommandItem>
        )}
      </CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
    </Command>
  )
}
