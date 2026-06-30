import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { hotkeyStyles, hotkeyVariants } from './hotkey.stylex'

export type HotkeyVariant = keyof typeof hotkeyVariants

export function Hotkey({
  variant = 'default',
  xstyle,
  ...props
}: React.ComponentProps<'kbd'> & { variant?: HotkeyVariant; xstyle?: StyleXStyles }) {
  return (
    <kbd
      data-slot='kbd'
      {...stylex.props(hotkeyStyles.base, hotkeyVariants[variant], xstyle)}
      {...props}
    />
  )
}

export function HotkeyGroup({
  xstyle,
  ...props
}: React.ComponentProps<'div'> & { xstyle?: StyleXStyles }) {
  return <kbd data-slot='kbd-group' {...stylex.props(hotkeyStyles.group, xstyle)} {...props} />
}
