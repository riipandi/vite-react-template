import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

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
  return <BaseToolbar.Root {...props} {...stylex.props(styles.root, style)} />
}

export function ToolbarGroup({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseToolbar.Group>, 'className' | 'style'> &
  StyleProp) {
  return <BaseToolbar.Group {...props} {...stylex.props(styles.group, style)} />
}

export function ToolbarSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseToolbar.Separator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseToolbar.Separator {...props} {...stylex.props(styles.separator, style)} />
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
    gap: space.s1,
    padding: space.s1,
    width: 'fit-content'
  },
  group: {
    alignItems: 'center',
    display: 'flex',
    gap: space.s1
  },
  separator: {
    alignSelf: 'stretch',
    backgroundColor: colors.border,
    marginBlock: space.s1,
    marginInline: space.s1,
    width: stroke.border
  }
})
