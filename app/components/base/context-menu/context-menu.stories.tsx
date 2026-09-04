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
      <ContextMenuTrigger style={styles.trigger}>Right-click the map</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Retrace steps
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Follow the dot
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More enchantments</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Wipe the map…</ContextMenuItem>
            <ContextMenuItem>Add a secret passage…</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Marauder settings</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem defaultChecked>Show secret passages</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show real names</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup defaultValue='padfoot'>
          <ContextMenuRadioItem value='padfoot'>Sirius Black</ContextMenuRadioItem>
          <ContextMenuRadioItem value='prongs'>James Potter</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant='destructive'>Mischief managed</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const Submenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger style={styles.trigger}>Right-click the map</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>I solemnly swear…</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More enchantments</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Chart a new passage…</ContextMenuItem>
            <ContextMenuItem>Add a secret passage…</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Marauder settings</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const Checkboxes: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger style={styles.trigger}>Right-click the map</ContextMenuTrigger>
      <ContextMenuContent>
        {/* Menu labels are Base UI GroupLabels — they must live inside a
            Group or RadioGroup. */}
        <ContextMenuGroup>
          <ContextMenuLabel>Map layers</ContextMenuLabel>
          <ContextMenuCheckboxItem defaultChecked>Show secret passages</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show real names</ContextMenuCheckboxItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const Radio: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger style={styles.trigger}>Right-click the map</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuRadioGroup defaultValue='padfoot'>
          <ContextMenuRadioItem value='padfoot'>Sirius Black</ContextMenuRadioItem>
          <ContextMenuRadioItem value='prongs'>James Potter</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        {/* A radio item outside its RadioGroup has no context — plain item. */}
        <ContextMenuItem disabled>Add a new Marauder…</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const Destructive: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger style={styles.trigger}>Right-click the map</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Re-ink the map</ContextMenuItem>
        <ContextMenuItem>Duplicate parchment</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant='destructive'>Mischief managed</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
