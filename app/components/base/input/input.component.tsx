/**
 * An input component that can be used in forms.
 *
 * @see: https://base-ui.com/react/components/input
 *
 * BaseUI Anatomy:
 * <Input />
 */

import { Input as BaseInput } from '@base-ui/react/input'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { inputStyles as s } from './input.stylex'

export interface InputProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseInput>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function Input({ style, ...props }: InputProps) {
  return <BaseInput {...props} {...stylex.props(s.root, style)} />
}
