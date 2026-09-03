/**
 * A container for toolbar items.
 *
 * @see: https://base-ui.com/react/components/toolbar
 *
 * BaseUI Anatomy:
 * <Toolbar.Root>
 *   <Toolbar.Button />
 *   <Toolbar.Link />
 *   <Toolbar.Input />
 *   <Toolbar.Group />
 *   <Toolbar.Separator />
 * </Toolbar.Root>
 */

import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { toolbarStyles as s } from './toolbar.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

// Buttons, links, toggles, and inputs inside a toolbar keep their own
// component styles — compose with Button, Toggle, ToggleGroup, Input, etc.
// via the Base UI `render` prop:
//   <ToolbarButton render={<Button variant="ghost" size="sm" />} />
export const ToolbarButton = BaseToolbar.Button
export const ToolbarLink = BaseToolbar.Link
export const ToolbarInput = BaseToolbar.Input

export function Toolbar({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseToolbar.Root>, 'className' | 'style'> &
  StyleProp) {
  return <BaseToolbar.Root {...props} {...stylex.props(s.root, style)} />
}

export function ToolbarGroup({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseToolbar.Group>, 'className' | 'style'> &
  StyleProp) {
  return <BaseToolbar.Group {...props} {...stylex.props(s.group, style)} />
}

export function ToolbarSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseToolbar.Separator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseToolbar.Separator {...props} {...stylex.props(s.separator, style)} />
}
