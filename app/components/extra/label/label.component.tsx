import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { labelStyles as s } from './label.stylex'

export interface LabelProps extends Omit<
  React.ComponentPropsWithoutRef<'label'>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function Label({ style, ...props }: LabelProps) {
  return <label {...props} {...stylex.props(s.root, style)} />
}
