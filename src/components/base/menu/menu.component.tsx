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
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { menuStyles, menuSizes } from './menu.stylex'

export type MenuSize = keyof typeof menuSizes

export function Menu({ ...props }: React.ComponentProps<typeof BaseMenu.Root>) {
  return <BaseMenu.Root data-slot='menu' {...props} />
}

export function MenuTrigger({ ...props }: React.ComponentProps<typeof BaseMenu.Trigger>) {
  return <BaseMenu.Trigger data-slot='menu-trigger' {...props} />
}

export type MenuPopupProps = React.ComponentProps<typeof BaseMenu.Popup> & {
  align?: BaseMenu.Positioner.Props['align']
  alignOffset?: BaseMenu.Positioner.Props['alignOffset']
  side?: BaseMenu.Positioner.Props['side']
  sideOffset?: BaseMenu.Positioner.Props['sideOffset']
  anchor?: BaseMenu.Positioner.Props['anchor']
  sticky?: BaseMenu.Positioner.Props['sticky']
  positionMethod?: BaseMenu.Positioner.Props['positionMethod']
  size?: MenuSize
  xstyle?: StyleXStyles
}

export function MenuPopup({
  children,
  xstyle,
  align,
  alignOffset,
  side,
  sideOffset,
  anchor,
  sticky,
  positionMethod,
  size,
  ...props
}: MenuPopupProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Backdrop />
      <BaseMenu.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset || 6}
        anchor={anchor}
        sticky={sticky}
        positionMethod={positionMethod}
      >
        <BaseMenu.Popup
          data-slot='menu-popup'
          {...stylex.props(menuStyles.popup, size && menuSizes[size], xstyle)}
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

export function MenuItem({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseMenu.Item> & { xstyle?: StyleXStyles }) {
  return (
    <BaseMenu.Item data-slot='menu-item' {...stylex.props(menuStyles.item, xstyle)} {...props} />
  )
}

export function MenuSeparator({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseMenu.Separator> & { xstyle?: StyleXStyles }) {
  return (
    <BaseMenu.Separator
      data-slot='menu-separator'
      {...stylex.props(menuStyles.separator, xstyle)}
      {...props}
    />
  )
}

export function MenuSubmenu({ ...props }: React.ComponentProps<typeof BaseMenu.SubmenuRoot>) {
  return <BaseMenu.SubmenuRoot data-slot='menu-submenu' {...props} />
}

export function MenuSubmenuTrigger({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseMenu.SubmenuTrigger> & { xstyle?: StyleXStyles }) {
  return (
    <BaseMenu.SubmenuTrigger
      data-slot='menu-submenu-trigger'
      {...stylex.props(menuStyles.submenuTrigger, xstyle)}
      {...props}
    />
  )
}

export type MenuSubmenuPopupProps = React.ComponentProps<typeof BaseMenu.Popup> & {
  align?: BaseMenu.Positioner.Props['align']
  alignOffset?: BaseMenu.Positioner.Props['alignOffset']
  side?: BaseMenu.Positioner.Props['side']
  sideOffset?: BaseMenu.Positioner.Props['sideOffset']
  anchor?: BaseMenu.Positioner.Props['anchor']
  sticky?: BaseMenu.Positioner.Props['sticky']
  positionMethod?: BaseMenu.Positioner.Props['positionMethod']
  size?: MenuSize
}

export function MenuSubmenuPopup({
  align,
  alignOffset,
  side,
  sideOffset = 5,
  anchor,
  sticky,
  positionMethod,
  size,
  ...props
}: MenuSubmenuPopupProps) {
  return (
    <MenuPopup
      data-slot='menu-sub-popup'
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      anchor={anchor}
      sticky={sticky}
      positionMethod={positionMethod}
      size={size}
      {...props}
    />
  )
}

export function MenuGroup({ ...props }: React.ComponentProps<typeof BaseMenu.Group>) {
  return <BaseMenu.Group data-slot='menu-group' {...props} />
}

export function MenuGroupLabel({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseMenu.GroupLabel> & { xstyle?: StyleXStyles }) {
  return (
    <BaseMenu.GroupLabel
      data-slot='menu-group-label'
      {...stylex.props(menuStyles.groupLabel, xstyle)}
      {...props}
    />
  )
}

export function MenuCheckboxItem({
  children,
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseMenu.CheckboxItem> & { xstyle?: StyleXStyles }) {
  return (
    <BaseMenu.CheckboxItem
      data-slot='menu-checkbox-item'
      {...stylex.props(menuStyles.item, xstyle)}
      {...props}
    >
      <BaseMenu.CheckboxItemIndicator>
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
      </BaseMenu.CheckboxItemIndicator>
      {children}
    </BaseMenu.CheckboxItem>
  )
}

export function MenuRadioGroup({ ...props }: React.ComponentProps<typeof BaseMenu.RadioGroup>) {
  return <BaseMenu.RadioGroup data-slot='menu-radio-group' {...props} />
}

export type MenuRadioItemProps = React.ComponentProps<typeof BaseMenu.RadioItem> & {
  xstyle?: StyleXStyles
}

export function MenuRadioItem({ children, xstyle, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      data-slot='menu-radio-item'
      {...stylex.props(menuStyles.radioItem, xstyle)}
      {...props}
    >
      <div {...stylex.props(menuStyles.radioItemIndicator)}>
        <BaseMenu.RadioItemIndicator>
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
        </BaseMenu.RadioItemIndicator>
      </div>
      {children}
    </BaseMenu.RadioItem>
  )
}
