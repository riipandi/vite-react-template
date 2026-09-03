import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from './context-menu.component'

const meta = {
  title: 'Base Components/ContextMenu',
  component: ContextMenu,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ContextMenu>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          {...stylex.props(
            atoms.padding['40px'],
            atoms.borderWidth['1px'],
            atoms.borderStyle.dashed
          )}
        >
          Right click anywhere in this box.
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          New tab <ContextMenuShortcut>⌘T</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>New window</ContextMenuItem>
        <ContextMenuItem inset>Refresh</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem defaultChecked>Show bookmarks bar</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Extensions</ContextMenuItem>
            <ContextMenuItem>Developer tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup defaultValue='system'>
          <ContextMenuRadioItem value='light'>Light</ContextMenuRadioItem>
          <ContextMenuRadioItem value='dark'>Dark</ContextMenuRadioItem>
          <ContextMenuRadioItem value='system'>System</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
