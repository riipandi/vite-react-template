/**
 * Displays a menu of options or commands.
 *
 * @see: https://base-ui.com/react/components/menu
 *
 * BaseUI Anatomy:
 * <Menu.Root>
 *   <Menu.Trigger />
 *   <Menu.Portal>
 *     <Menu.Backdrop />
 *     <Menu.Positioner>
 *       <Menu.Popup>
 *         <Menu.Arrow />
 *         <Menu.Item />
 *         <Menu.Separator />
 *         <Menu.Group>
 *           <Menu.GroupLabel />
 *         </Menu.Group>
 *         <Menu.RadioGroup>
 *           <Menu.RadioItem />
 *         </Menu.RadioGroup>
 *         <Menu.CheckboxItem />
 *         <Menu.SubmenuRoot>
 *           <Menu.SubmenuTrigger />
 *         </Menu.SubmenuRoot>
 *       </Menu.Popup>
 *     </Menu.Positioner>
 *   </Menu.Portal>
 * </Menu.Root>
 */

import { Menu as BaseMenu } from '@base-ui/react/menu'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { shadow } from '#/styles/core/colors.stylex'
import { popupFx } from '#/styles/core/popup.stylex'
import { ring } from '#/styles/core/utils.stylex'
import { dropdownMenuStyles as s } from './dropdown-menu.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export const DropdownMenu = BaseMenu.Root
export const DropdownMenuTrigger = BaseMenu.Trigger
export const DropdownMenuGroup = BaseMenu.Group
export const DropdownMenuPortal = BaseMenu.Portal
export const DropdownMenuSub = BaseMenu.SubmenuRoot
export const DropdownMenuRadioGroup = BaseMenu.RadioGroup

export interface DropdownMenuContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>, 'className' | 'style'>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BaseMenu.Positioner>,
      'align' | 'alignOffset' | 'side' | 'sideOffset'
    >,
    StyleProp {}

export function DropdownMenuContent({
  style,
  side = 'bottom',
  sideOffset = 4,
  align = 'start',
  alignOffset = 0,
  ...props
}: DropdownMenuContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(popupFx.positioner)}
      >
        <BaseMenu.Popup
          {...props}
          {...stylex.props(
            popupFx.shift,
            popupFx.fade,
            popupFx.pose,
            s.popup,
            ring({ shadow: shadow.raised }),
            style
          )}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

export type DropdownMenuItemVariant = 'default' | 'destructive'

export interface DropdownMenuItemProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Item>, 'className' | 'style'>,
    StyleProp {
  variant?: DropdownMenuItemVariant
  /** Indents the item to align with checkbox/radio item labels. */
  inset?: boolean
}

export function DropdownMenuItem({
  style,
  variant = 'default',
  inset,
  ...props
}: DropdownMenuItemProps) {
  return (
    <BaseMenu.Item
      {...props}
      {...stylex.props(
        s.item,
        inset && s.itemInset,
        variant === 'destructive' && s.itemDestructive,
        style
      )}
    />
  )
}

function IndicatorCheck() {
  return (
    <svg
      width='16'
      height='16'
      viewBox={`0 0 16 16`}
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
    >
      <path d={`m3 8.5 3.5 3.5L13 4.5`} />
    </svg>
  )
}

export function DropdownMenuCheckboxItem({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItem>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseMenu.CheckboxItem {...props} {...stylex.props(s.item, s.indicatorItem, style)}>
      <span {...stylex.props(s.indicator)}>
        <BaseMenu.CheckboxItemIndicator>
          <IndicatorCheck />
        </BaseMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseMenu.CheckboxItem>
  )
}

export function DropdownMenuRadioItem({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.RadioItem>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseMenu.RadioItem {...props} {...stylex.props(s.item, s.indicatorItem, style)}>
      <span {...stylex.props(s.indicator)}>
        <BaseMenu.RadioItemIndicator>
          <IndicatorCheck />
        </BaseMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseMenu.RadioItem>
  )
}

export function DropdownMenuSubTrigger({
  style,
  inset,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.SubmenuTrigger>, 'className' | 'style'> &
  StyleProp & { inset?: boolean }) {
  return (
    <BaseMenu.SubmenuTrigger
      {...props}
      {...stylex.props(s.item, s.subTrigger, inset && s.itemInset, style)}
    >
      {children}
      <svg
        width='16'
        height='16'
        viewBox={`0 0 16 16`}
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden
        {...stylex.props(s.subTriggerChevron)}
      >
        <path d={`m6 3 5 5-5 5`} />
      </svg>
    </BaseMenu.SubmenuTrigger>
  )
}

export function DropdownMenuSubContent({
  style,
  sideOffset = 0,
  alignOffset = -4,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuContent
      side='right'
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      {...props}
      style={[s.subPopup, style]}
    />
  )
}

export function DropdownMenuShortcut({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> & StyleProp) {
  return <span {...props} {...stylex.props(s.shortcut, style)} />
}

export function DropdownMenuSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.Separator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseMenu.Separator {...props} {...stylex.props(s.separator, style)} />
}

export function DropdownMenuLabel({
  style,
  inset,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMenu.GroupLabel>, 'className' | 'style'> &
  StyleProp & { inset?: boolean }) {
  return <BaseMenu.GroupLabel {...props} {...stylex.props(s.label, inset && s.itemInset, style)} />
}
