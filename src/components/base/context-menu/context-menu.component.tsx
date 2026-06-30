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
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { contextMenuStyles, contextMenuSizes } from './context-menu.stylex'

export type ContextMenuSize = keyof typeof contextMenuSizes

export function ContextMenu({ ...props }: React.ComponentProps<typeof BaseContextMenu.Root>) {
  return <BaseContextMenu.Root data-slot='context-menu' {...props} />
}

export function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Trigger>) {
  return <BaseContextMenu.Trigger data-slot='context-menu-trigger' {...props} />
}

export type ContextMenuPopupProps = React.ComponentProps<typeof BaseContextMenu.Popup> & {
  size?: ContextMenuSize
  xstyle?: StyleXStyles
}

export function ContextMenuPopup({ children, size, xstyle, ...props }: ContextMenuPopupProps) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner>
        <BaseContextMenu.Popup
          data-slot='context-menu-popup'
          {...stylex.props(contextMenuStyles.popup, size && contextMenuSizes[size], xstyle)}
          {...props}
        >
          {children}
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  )
}

export function ContextMenuItem({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Item> & { xstyle?: StyleXStyles }) {
  return (
    <BaseContextMenu.Item
      data-slot='context-menu-item'
      {...stylex.props(contextMenuStyles.item, xstyle)}
      {...props}
    />
  )
}

export function ContextMenuSeparator({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.Separator> & { xstyle?: StyleXStyles }) {
  return (
    <BaseContextMenu.Separator
      data-slot='context-menu-separator'
      {...stylex.props(contextMenuStyles.separator, xstyle)}
      {...props}
    />
  )
}

export function ContextMenuSubmenu({
  ...props
}: React.ComponentProps<typeof BaseContextMenu.SubmenuRoot>) {
  return <BaseContextMenu.SubmenuRoot data-slot='context-menu-submenu' {...props} />
}

export function ContextMenuSubmenuTrigger({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.SubmenuTrigger> & { xstyle?: StyleXStyles }) {
  return (
    <BaseContextMenu.SubmenuTrigger
      data-slot='context-menu-submenu-trigger'
      {...stylex.props(contextMenuStyles.submenuTrigger, xstyle)}
      {...props}
    />
  )
}

export type ContextMenuSubmenuPopupProps = React.ComponentProps<typeof BaseContextMenu.Popup> & {
  size?: ContextMenuSize
}

export function ContextMenuSubmenuPopup({ size, ...props }: ContextMenuSubmenuPopupProps) {
  return <ContextMenuPopup data-slot='context-menu-sub-popup' size={size} {...props} />
}

export function ContextMenuGroup({ ...props }: React.ComponentProps<typeof BaseContextMenu.Group>) {
  return <BaseContextMenu.Group data-slot='context-menu-group' {...props} />
}

export function ContextMenuGroupLabel({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.GroupLabel> & { xstyle?: StyleXStyles }) {
  return (
    <BaseContextMenu.GroupLabel
      data-slot='context-menu-group-label'
      {...stylex.props(contextMenuStyles.groupLabel, xstyle)}
      {...props}
    />
  )
}

export function ContextMenuCheckboxItem({
  children,
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseContextMenu.CheckboxItem> & { xstyle?: StyleXStyles }) {
  return (
    <BaseContextMenu.CheckboxItem
      data-slot='context-menu-checkbox-item'
      {...stylex.props(contextMenuStyles.item, xstyle)}
      {...props}
    >
      <BaseContextMenu.CheckboxItemIndicator>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='3'
          viewBox='0 0 24 24'
        >
          <title>Check</title>
          <path d='M20 6 9 17l-5-5' />
        </svg>
      </BaseContextMenu.CheckboxItemIndicator>
      {children}
    </BaseContextMenu.CheckboxItem>
  )
}

export function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof BaseContextMenu.RadioGroup>) {
  return <BaseContextMenu.RadioGroup data-slot='context-menu-radio-group' {...props} />
}

export type ContextMenuRadioItemProps = React.ComponentProps<typeof BaseContextMenu.RadioItem> & {
  xstyle?: StyleXStyles
}

export function ContextMenuRadioItem({ children, xstyle, ...props }: ContextMenuRadioItemProps) {
  return (
    <BaseContextMenu.RadioItem
      data-slot='context-menu-radio-item'
      {...stylex.props(contextMenuStyles.radioItem, xstyle)}
      {...props}
    >
      <div {...stylex.props(contextMenuStyles.radioItemIndicator)}>
        <BaseContextMenu.RadioItemIndicator>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <title>Radio</title>
            <circle cx='12' cy='12' r='10' />
          </svg>
        </BaseContextMenu.RadioItemIndicator>
      </div>
      {children}
    </BaseContextMenu.RadioItem>
  )
}
