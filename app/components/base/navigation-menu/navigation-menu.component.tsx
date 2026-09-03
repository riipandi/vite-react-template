/**
 * A collection of links and menus for website navigation.
 *
 * @see: https://base-ui.com/react/components/navigation-menu
 *
 * BaseUI Anatomy:
 * <NavigationMenu.Root>
 *   <NavigationMenu.List>
 *     <NavigationMenu.Item>
 *       <NavigationMenu.Trigger>
 *         <NavigationMenu.Icon />
 *       </NavigationMenu.Trigger>
 *       <NavigationMenu.Content>
 *         <NavigationMenu.Link />
 *       </NavigationMenu.Content>
 *     </NavigationMenu.Item>
 *   </NavigationMenu.List>
 *   <NavigationMenu.Portal>
 *     <NavigationMenu.Backdrop />
 *     <NavigationMenu.Positioner>
 *       <NavigationMenu.Popup>
 *         <NavigationMenu.Arrow />
 *         <NavigationMenu.Viewport />
 *       </NavigationMenu.Popup>
 *     </NavigationMenu.Positioner>
 *   </NavigationMenu.Portal>
 * </NavigationMenu.Root>
 */

import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { shadow } from '#/lib/tokens.stylex'
import { ring } from '#/styles/core/utils.stylex'
import { navigationMenuStyles as s } from './navigation-menu.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export function NavigationMenu({
  style,
  children,
  align = 'start',
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Root>, 'className' | 'style'> &
  Pick<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Positioner>, 'align'> &
  StyleProp) {
  return (
    <BaseNavigationMenu.Root {...props} {...stylex.props(s.root, style)}>
      {children}
      <NavigationMenuPositioner align={align} />
    </BaseNavigationMenu.Root>
  )
}

export function NavigationMenuList({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.List>, 'className' | 'style'> &
  StyleProp) {
  return <BaseNavigationMenu.List {...props} {...stylex.props(s.list, style)} />
}

export function NavigationMenuItem({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Item>, 'className' | 'style'> &
  StyleProp) {
  return <BaseNavigationMenu.Item {...props} {...stylex.props(s.item, style)} />
}

export function NavigationMenuTrigger({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Trigger>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseNavigationMenu.Trigger {...props} {...stylex.props(s.trigger, style)}>
      {children}
      <svg
        width='12'
        height='12'
        viewBox={`0 0 16 16`}
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden
        {...stylex.props(s.triggerChevron)}
      >
        <path d={`m3 6 5 5 5-5`} />
      </svg>
    </BaseNavigationMenu.Trigger>
  )
}

export function NavigationMenuContent({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Content>, 'className' | 'style'> &
  StyleProp) {
  return <BaseNavigationMenu.Content {...props} {...stylex.props(s.content, style)} />
}

export function NavigationMenuLink({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Link>, 'className' | 'style'> &
  StyleProp) {
  return <BaseNavigationMenu.Link {...props} {...stylex.props(s.link, style)} />
}

export function NavigationMenuPositioner({
  style,
  side = 'bottom',
  sideOffset = 8,
  align = 'start',
  alignOffset = 0,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof BaseNavigationMenu.Positioner>,
  'className' | 'style'
> &
  StyleProp) {
  return (
    <BaseNavigationMenu.Portal>
      <BaseNavigationMenu.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        {...props}
        {...stylex.props(s.positioner, style)}
      >
        <BaseNavigationMenu.Popup {...stylex.props(s.popup, ring({ shadow: shadow.md }))}>
          <BaseNavigationMenu.Viewport {...stylex.props(s.viewport)} />
        </BaseNavigationMenu.Popup>
      </BaseNavigationMenu.Positioner>
    </BaseNavigationMenu.Portal>
  )
}
