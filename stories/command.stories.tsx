import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import * as React from 'react'
import {
  Command,
  CommandDialog,
  CommandDialogContent,
  CommandDialogTrigger,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandFooter
} from '#/components/base/command'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Command',
  component: Command,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: []
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    width: '28rem',
    maxWidth: '100%'
  },
  commandBox: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'oklch(0 0 0 / 0.12)',
    borderRadius: '0.6rem',
    overflow: 'hidden'
  },
  shortcutKey: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '1.25rem',
    height: '1.25rem',
    padding: '0 0.25rem',
    borderRadius: '0.25rem',
    background: 'oklch(0.965 0.003 265.75)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'oklch(0 0 0 / 0.08)',
    fontSize: '0.7rem',
    fontFamily: 'monospace'
  }
})

const items = [
  {
    group: 'Suggestions',
    items: [
      { icon: Lucide.Calendar, label: 'Calendar', shortcut: '\u2318K' },
      { icon: Lucide.Smile, label: 'Search Emoji', shortcut: '\u2318E' },
      { icon: Lucide.Calculator, label: 'Calculator', shortcut: '\u2318N' }
    ]
  },
  {
    group: 'Settings',
    items: [
      { icon: Lucide.User, label: 'Profile', shortcut: '\u2318P' },
      { icon: Lucide.Settings, label: 'Settings', shortcut: '\u2318S' },
      { icon: Lucide.Bell, label: 'Notifications', shortcut: '\u2318\u21E7N' }
    ]
  }
]

export const Playground: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <div {...stylex.props(layoutStyles.commandBox)}>
        <Command>
          <CommandInput placeholder='Type a command...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {items.map((group) => (
              <React.Fragment key={group.group}>
                <CommandGroup>
                  <CommandGroupLabel>{group.group}</CommandGroupLabel>
                  {group.items.map((item) => (
                    <CommandItem key={item.label}>
                      <item.icon size={16} />
                      <span>{item.label}</span>
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </React.Fragment>
            ))}
            <CommandFooter>
              <CommandShortcut>\u2191\u2193 Navigate</CommandShortcut>
            </CommandFooter>
          </CommandList>
        </Command>
      </div>
    </div>
  )
}

export const Dialog: Story = {
  name: 'Dialog',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <CommandDialog>
        <CommandDialogTrigger>Open command palette</CommandDialogTrigger>
        <CommandDialogContent>
          <CommandInput placeholder='Type a command...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {items.map((group) => (
              <CommandGroup key={group.group}>
                <CommandGroupLabel>{group.group}</CommandGroupLabel>
                {group.items.map((item) => (
                  <CommandItem key={item.label}>
                    <item.icon size={16} />
                    <span>{item.label}</span>
                    <CommandShortcut>{item.shortcut}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </CommandDialogContent>
      </CommandDialog>
    </div>
  )
}
