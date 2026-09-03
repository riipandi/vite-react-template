import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { textareaStyles as s } from './textarea.stylex'

export interface TextareaProps extends Omit<
  React.ComponentPropsWithoutRef<'textarea'>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function Textarea({ style, ...props }: TextareaProps) {
  return <textarea {...props} {...stylex.props(s.root, style)} />
}
