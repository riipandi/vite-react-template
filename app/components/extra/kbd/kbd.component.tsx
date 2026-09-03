import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { kbdStyles as s } from './kbd.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export function Kbd({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'kbd'>, 'className' | 'style'> & StyleProp) {
  return <kbd {...props} {...stylex.props(s.root, style)} />
}

export function KbdGroup({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'kbd'>, 'className' | 'style'> & StyleProp) {
  return <kbd {...props} {...stylex.props(s.group, style)} />
}
