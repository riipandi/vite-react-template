/**
 * A menu bar component.
 *
 * @see: https://base-ui.com/react/components/menubar
 *
 * BaseUI Anatomy:
 * <Menubar.Root />
 */

import { Menubar as BaseMenubar } from '@base-ui/react/menubar'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  type DropdownMenuContentProps
} from '#/components/base/dropdown-menu'
import { menubarStyles as s } from './menubar.stylex'

export interface MenubarProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenubar>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function Menubar({ style, ...props }: MenubarProps) {
  return <BaseMenubar {...props} {...stylex.props(s.root, style)} />
}

export const MenubarMenu = DropdownMenu
export const MenubarGroup = DropdownMenuGroup
export const MenubarPortal = DropdownMenuPortal
export const MenubarSub = DropdownMenuSub
export const MenubarRadioGroup = DropdownMenuRadioGroup
export const MenubarItem = DropdownMenuItem
export const MenubarCheckboxItem = DropdownMenuCheckboxItem
export const MenubarRadioItem = DropdownMenuRadioItem
export const MenubarLabel = DropdownMenuLabel
export const MenubarSeparator = DropdownMenuSeparator
export const MenubarShortcut = DropdownMenuShortcut
export const MenubarSubTrigger = DropdownMenuSubTrigger
export const MenubarSubContent = DropdownMenuSubContent

export function MenubarTrigger({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger>, 'className' | 'style'> & {
  style?: stylex.StyleXStyles
}) {
  return <DropdownMenuTrigger {...props} {...stylex.props(s.trigger, style)} />
}

export function MenubarContent({
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  style,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuContent
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      {...props}
      style={[s.content, style]}
    />
  )
}
