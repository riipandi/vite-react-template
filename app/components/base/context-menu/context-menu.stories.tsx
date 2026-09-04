import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { container, fontSize, fontFamily, radius, stroke } from '#/styles/core/tokens.stylex'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
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
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ContextMenu>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  trigger: {
    alignItems: 'center',
    borderColor: colors.borderNeutral,
    borderRadius: radius.large,
    borderStyle: 'dashed',
    borderWidth: stroke.border,
    color: colors.foregroundNeutral,
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    height: container.xs,
    justifyContent: 'center',
    width: container.sm,
    paddingInline: 16,
    textAlign: 'center'
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger style={styles.trigger}>Right-click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Save page…</ContextMenuItem>
            <ContextMenuItem>Create shortcut…</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem defaultChecked>Show bookmarks</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup defaultValue='pedro'>
          <ContextMenuRadioItem value='pedro'>Pedro Duarte</ContextMenuRadioItem>
          <ContextMenuRadioItem value='colm'>Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant='destructive'>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const Submenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger style={styles.trigger}>Right-click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Save page…</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Save page as…</ContextMenuItem>
            <ContextMenuItem>Create shortcut…</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const Checkboxes: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger style={styles.trigger}>Right-click here</ContextMenuTrigger>
      <ContextMenuContent>
        {/* Menu labels are Base UI GroupLabels — they must live inside a
            Group or RadioGroup. */}
        <ContextMenuGroup>
          <ContextMenuLabel>Appearance</ContextMenuLabel>
          <ContextMenuCheckboxItem defaultChecked>Show bookmarks bar</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show full URLs</ContextMenuCheckboxItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const Radio: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger style={styles.trigger}>Right-click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuRadioGroup defaultValue='pedro'>
          <ContextMenuRadioItem value='pedro'>Pedro Duarte</ContextMenuRadioItem>
          <ContextMenuRadioItem value='colm'>Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        {/* A radio item outside its RadioGroup has no context — plain item. */}
        <ContextMenuItem disabled>Add new user…</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const Destructive: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger style={styles.trigger}>Right-click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuItem>Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant='destructive'>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
