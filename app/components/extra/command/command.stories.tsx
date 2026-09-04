import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Button } from '#/components/base/button'
import { Kbd, KbdGroup } from '#/components/extra/kbd'
import { container } from '#/styles/core/tokens.stylex'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from './command.component'

const meta = {
  title: 'Extra Components/Command',
  component: Command,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Command>

type Story = StoryObj<typeof meta>

const commands = [
  { value: 'calendar', label: 'Calendar', group: 'Suggestions' },
  { value: 'search-emoji', label: 'Search emoji', group: 'Suggestions' },
  { value: 'calculator', label: 'Calculator', group: 'Suggestions' },
  { value: 'profile', label: 'Profile', group: 'Settings', shortcut: '⌘P' },
  { value: 'billing', label: 'Billing', group: 'Settings', shortcut: '⌘B' },
  { value: 'settings', label: 'Settings', group: 'Settings', shortcut: '⌘S' }
]

type CommandEntry = (typeof commands)[number]

const commandGroups = [
  {
    value: 'suggestions',
    label: 'Suggestions',
    items: [
      { value: 'calendar', label: 'Calendar' },
      { value: 'search-emoji', label: 'Search emoji' }
    ]
  },
  {
    value: 'settings',
    label: 'Settings',
    items: [
      { value: 'profile', label: 'Profile', shortcut: '⌘P' },
      { value: 'billing', label: 'Billing', shortcut: '⌘B' }
    ]
  }
]

const fruits = [
  'Apple',
  'Apricot',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cantaloupe',
  'Cherry',
  'Clementine',
  'Coconut',
  'Cranberry',
  'Date',
  'Dragonfruit',
  'Elderberry',
  'Fig',
  'Grape',
  'Grapefruit',
  'Guava',
  'Honeydew',
  'Kiwi',
  'Lemon',
  'Lime',
  'Lychee',
  'Mango',
  'Mandarin',
  'Nectarine',
  'Orange',
  'Papaya',
  'Passionfruit',
  'Peach',
  'Pear',
  'Persimmon',
  'Pineapple',
  'Plum',
  'Pomegranate',
  'Raspberry',
  'Star fruit',
  'Strawberry',
  'Tangerine',
  'Watermelon'
].map((label) => ({ label, value: label }))

const styles = stylex.create({
  root: {
    maxWidth: container.lg
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <Command
      items={commands}
      itemToStringValue={(item) => (item as CommandEntry).label}
      style={styles.root}
    >
      <CommandInput placeholder='Type a command or search…' />
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandList>
        {(item: CommandEntry) => (
          <CommandItem key={item.value} value={item}>
            {item.label}
            {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
          </CommandItem>
        )}
      </CommandList>
    </Command>
  )
}

export const Groups: Story = {
  render: () => (
    <Command items={commandGroups} style={styles.root}>
      <CommandInput placeholder='Type a command or search…' />
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandList>
        {(group: (typeof commandGroups)[number]) => (
          <React.Fragment key={group.value}>
            <CommandGroup heading={group.label}>
              {group.items.map((item) => (
                <CommandItem key={item.value} value={item}>
                  {item.label}
                  {'shortcut' in item && item.shortcut && (
                    <CommandShortcut>{item.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            {group.value !== commandGroups[commandGroups.length - 1]?.value && <CommandSeparator />}
          </React.Fragment>
        )}
      </CommandList>
    </Command>
  )
}

export const Scrollable: Story = {
  render: () => (
    <Command
      items={fruits}
      itemToStringValue={(item) => (item as { label: string }).label}
      style={styles.root}
    >
      <CommandInput placeholder='Search fruit…' />
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandList>
        {(item: (typeof fruits)[number]) => (
          <CommandItem key={item.value} value={item}>
            {item.label}
          </CommandItem>
        )}
      </CommandList>
    </Command>
  )
}

export const DialogHotkey: Story = {
  name: 'Keyboard shortcut',
  render: () => {
    const [open, setOpen] = React.useState(false)

    return (
      <>
        <Button variant='outline' onClick={() => setOpen(true)}>
          Open command palette
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command items={commands} itemToStringValue={(item) => (item as CommandEntry).label}>
            <CommandInput placeholder='Type a command or search…' />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(item: CommandEntry) => (
                <CommandItem key={item.value} value={item} onClick={() => setOpen(false)}>
                  {item.label}
                </CommandItem>
              )}
            </CommandList>
          </Command>
        </CommandDialog>
      </>
    )
  }
}
