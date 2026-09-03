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
import { space, fontSize, fontWeight, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

export interface MenubarProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseMenubar>,
  'className' | 'style'
> {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

export function Menubar({ style, ...props }: MenubarProps) {
  return <BaseMenubar {...props} {...stylex.props(styles.root, style)} />
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
  return <DropdownMenuTrigger {...props} {...stylex.props(styles.trigger, style)} />
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
      style={[styles.content, style]}
    />
  )
}

const styles = stylex.create({
  root: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    fontFamily: font.sans,
    gap: space.s05,
    height: space.s8,
    paddingInline: space.s05
  },
  trigger: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.muted,
      '[data-popup-open]': colors.muted
    },
    borderRadius: radius.sm,
    borderStyle: 'none',
    color: colors.foreground,
    cursor: 'default',
    display: 'flex',
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    outline: 'none',
    paddingBlock: space.s05,
    paddingInline: space.s15,
    userSelect: 'none'
  },
  // Menubar popups size to their content, not the trigger.
  content: {
    width: 'max-content'
  }
})
