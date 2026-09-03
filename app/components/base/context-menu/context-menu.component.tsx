/**
 * A menu that appears at the pointer on right click or long press.
 *
 * @see: https://base-ui.com/react/components/context-menu
 *
 * BaseUI Anatomy:
 * <ContextMenu.Root>
 *   <ContextMenu.Trigger />
 *   <ContextMenu.Portal>
 *     <ContextMenu.Backdrop />
 *     <ContextMenu.Positioner>
 *       <ContextMenu.Popup>
 *         <ContextMenu.Arrow />
 *         <ContextMenu.Item />
 *         <ContextMenu.Separator />
 *         <ContextMenu.Group>
 *           <ContextMenu.GroupLabel />
 *         </ContextMenu.Group>
 *         <ContextMenu.RadioGroup>
 *           <ContextMenu.RadioItem />
 *         </ContextMenu.RadioGroup>
 *         <ContextMenu.CheckboxItem />
 *         <ContextMenu.SubmenuRoot>
 *           <ContextMenu.SubmenuTrigger />
 *         </ContextMenu.SubmenuRoot>
 *       </ContextMenu.Popup>
 *     </ContextMenu.Positioner>
 *   </ContextMenu.Portal>
 * </ContextMenu.Root>
 */

import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { shadow } from '#/styles/core/colors.stylex'
import { ring } from '#/styles/core/utils.stylex'
import { contextMenuStyles as s } from './context-menu.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export const ContextMenu = BaseContextMenu.Root
export const ContextMenuGroup = BaseContextMenu.Group
export const ContextMenuPortal = BaseContextMenu.Portal
export const ContextMenuSub = BaseContextMenu.SubmenuRoot
export const ContextMenuRadioGroup = BaseContextMenu.RadioGroup

export function ContextMenuTrigger({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.Trigger>, 'className' | 'style'> &
  StyleProp) {
  return <BaseContextMenu.Trigger {...props} {...stylex.props(s.trigger, style)} />
}

export interface ContextMenuContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.Popup>, 'className' | 'style'>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BaseContextMenu.Positioner>,
      'align' | 'alignOffset' | 'side' | 'sideOffset'
    >,
    StyleProp {}

export function ContextMenuContent({
  style,
  side = 'right',
  sideOffset = 0,
  align = 'start',
  alignOffset = 4,
  ...props
}: ContextMenuContentProps) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(s.positioner)}
      >
        <BaseContextMenu.Popup
          {...props}
          {...stylex.props(s.popup, ring({ shadow: shadow.raised }), style)}
        />
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  )
}

export type ContextMenuItemVariant = 'default' | 'destructive'

export interface ContextMenuItemProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.Item>, 'className' | 'style'>,
    StyleProp {
  variant?: ContextMenuItemVariant
  /** Indents the item to align with checkbox/radio item labels. */
  inset?: boolean
}

export function ContextMenuItem({
  style,
  variant = 'default',
  inset,
  ...props
}: ContextMenuItemProps) {
  return (
    <BaseContextMenu.Item
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

export function ContextMenuCheckboxItem({
  style,
  children,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.CheckboxItem>,
  'className' | 'style'
> &
  StyleProp) {
  return (
    <BaseContextMenu.CheckboxItem {...props} {...stylex.props(s.item, s.indicatorItem, style)}>
      <span {...stylex.props(s.indicator)}>
        <BaseContextMenu.CheckboxItemIndicator>
          <IndicatorCheck />
        </BaseContextMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseContextMenu.CheckboxItem>
  )
}

export function ContextMenuRadioItem({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.RadioItem>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseContextMenu.RadioItem {...props} {...stylex.props(s.item, s.indicatorItem, style)}>
      <span {...stylex.props(s.indicator)}>
        <BaseContextMenu.RadioItemIndicator>
          <IndicatorCheck />
        </BaseContextMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseContextMenu.RadioItem>
  )
}

export function ContextMenuSubTrigger({
  style,
  inset,
  children,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof BaseContextMenu.SubmenuTrigger>,
  'className' | 'style'
> &
  StyleProp & { inset?: boolean }) {
  return (
    <BaseContextMenu.SubmenuTrigger
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
    </BaseContextMenu.SubmenuTrigger>
  )
}

export function ContextMenuSubContent({
  style,
  sideOffset = 0,
  alignOffset = -4,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuContent
      side='right'
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      {...props}
      style={[s.subPopup, style]}
    />
  )
}

export function ContextMenuShortcut({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> & StyleProp) {
  return <span {...props} {...stylex.props(s.shortcut, style)} />
}

export function ContextMenuSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.Separator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseContextMenu.Separator {...props} {...stylex.props(s.separator, style)} />
}

export function ContextMenuLabel({
  style,
  inset,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseContextMenu.GroupLabel>, 'className' | 'style'> &
  StyleProp & { inset?: boolean }) {
  return (
    <BaseContextMenu.GroupLabel
      {...props}
      {...stylex.props(s.label, inset && s.itemInset, style)}
    />
  )
}
