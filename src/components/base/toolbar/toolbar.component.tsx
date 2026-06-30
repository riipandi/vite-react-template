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
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { toolbarStyles } from './toolbar.stylex'

export type ToolbarRootProps = React.ComponentProps<typeof BaseToolbar.Root> & {
  xstyle?: StyleXStyles
}
export type ToolbarButtonProps = React.ComponentProps<typeof BaseToolbar.Button> & {
  xstyle?: StyleXStyles
}
export type ToolbarLinkProps = React.ComponentProps<typeof BaseToolbar.Link> & {
  xstyle?: StyleXStyles
}
export type ToolbarInputProps = React.ComponentProps<typeof BaseToolbar.Input> & {
  xstyle?: StyleXStyles
}
export type ToolbarGroupProps = React.ComponentProps<typeof BaseToolbar.Group> & {
  xstyle?: StyleXStyles
}
export type ToolbarSeparatorProps = React.ComponentProps<typeof BaseToolbar.Separator> & {
  xstyle?: StyleXStyles
}

export function Toolbar({ xstyle, ...props }: ToolbarRootProps) {
  return (
    <BaseToolbar.Root
      data-slot='toolbar'
      {...stylex.props(toolbarStyles.root, xstyle)}
      {...props}
    />
  )
}

export function ToolbarButton({ xstyle, ...props }: ToolbarButtonProps) {
  return (
    <BaseToolbar.Button
      data-slot='toolbar-button'
      {...stylex.props(toolbarStyles.button, xstyle)}
      {...props}
    />
  )
}

export function ToolbarLink({ xstyle, ...props }: ToolbarLinkProps) {
  return (
    <BaseToolbar.Link
      data-slot='toolbar-link'
      {...stylex.props(toolbarStyles.link, xstyle)}
      {...props}
    />
  )
}

export function ToolbarInput({ xstyle, ...props }: ToolbarInputProps) {
  return (
    <BaseToolbar.Input
      data-slot='toolbar-input'
      {...stylex.props(toolbarStyles.input, xstyle)}
      {...props}
    />
  )
}

export function ToolbarGroup({ xstyle, ...props }: ToolbarGroupProps) {
  return (
    <BaseToolbar.Group
      data-slot='toolbar-group'
      {...stylex.props(toolbarStyles.group, xstyle)}
      {...props}
    />
  )
}

export function ToolbarSeparator({ xstyle, ...props }: ToolbarSeparatorProps) {
  return (
    <BaseToolbar.Separator
      data-slot='toolbar-separator'
      {...stylex.props(toolbarStyles.separator, xstyle)}
      {...props}
    />
  )
}
