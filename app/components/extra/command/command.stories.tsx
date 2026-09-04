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
  { value: 'expelliarmus', label: 'Expelliarmus', group: 'Spells' },
  { value: 'expecto-patronum', label: 'Expecto Patronum', group: 'Spells' },
  { value: 'wingardium-leviosa', label: 'Wingardium Leviosa', group: 'Spells' },
  { value: 'potions', label: 'Potions', group: 'Subjects', shortcut: '⌘P' },
  { value: 'divination', label: 'Divination', group: 'Subjects', shortcut: '⌘B' },
  {
    value: 'defence-against-the-dark-arts',
    label: 'Defence Against the Dark Arts',
    group: 'Subjects',
    shortcut: '⌘S'
  }
]

type CommandEntry = (typeof commands)[number]

const commandGroups = [
  {
    value: 'spells',
    label: 'Spells',
    items: [
      { value: 'expelliarmus', label: 'Expelliarmus' },
      { value: 'expecto-patronum', label: 'Expecto Patronum' }
    ]
  },
  {
    value: 'subjects',
    label: 'Subjects',
    items: [
      { value: 'potions', label: 'Potions', shortcut: '⌘P' },
      { value: 'divination', label: 'Divination', shortcut: '⌘B' }
    ]
  }
]

const spells = [
  'Accio',
  'Aguamenti',
  'Alohomora',
  'Anapneo',
  'Aparecium',
  'Ascendio',
  'Bombarda',
  'Colloportus',
  'Confringo',
  'Confundo',
  'Descendo',
  'Deprimo',
  'Duro',
  'Engorgio',
  'Episkey',
  'Expelliarmus',
  'Expecto Patronum',
  'Ferula',
  'Finite Incantatem',
  'Flagrate',
  'Glisseo',
  'Homenum Revelio',
  'Immobulus',
  'Impedimenta',
  'Incendio',
  'Lumos',
  'Meteolojinx Recanto',
  'Muffliato',
  'Nox',
  'Obliviate',
  'Petrificus Totalus',
  'Prior Incantato',
  'Protego',
  'Reducio',
  'Rennervate',
  'Reparo',
  'Riddikulus',
  'Silencio',
  'Sonorus',
  'Stupefy',
  'Wingardium Leviosa'
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
      <CommandInput placeholder='Cast a spell or search…' />
      <CommandEmpty>No spells found.</CommandEmpty>
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
      <CommandInput placeholder='Cast a spell or search…' />
      <CommandEmpty>No spells found.</CommandEmpty>
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
      items={spells}
      itemToStringValue={(item) => (item as { label: string }).label}
      style={styles.root}
    >
      <CommandInput placeholder='Search spells…' />
      <CommandEmpty>No spells found.</CommandEmpty>
      <CommandList>
        {(item: (typeof spells)[number]) => (
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
          Open the Marauder's Map
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command items={commands} itemToStringValue={(item) => (item as CommandEntry).label}>
            <CommandInput placeholder='Cast a spell or search…' />
            <CommandEmpty>No spells found.</CommandEmpty>
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
