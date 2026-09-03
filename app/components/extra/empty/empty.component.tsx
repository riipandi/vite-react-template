import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { emptyStyles as s, emptyMediaVariants as mediaVariants } from './empty.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

type DivProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp

export function Empty({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(s.root, style)} />
}

export function EmptyHeader({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(s.header, style)} />
}

export type EmptyMediaVariant = 'default' | 'icon'

export function EmptyMedia({
  variant = 'default',
  style,
  ...props
}: DivProps & { variant?: EmptyMediaVariant }) {
  return <div {...props} {...stylex.props(s.media, mediaVariants[variant], style)} />
}

export function EmptyTitle({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(s.title, style)} />
}

export function EmptyDescription({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(s.description, style)} />
}

export function EmptyContent({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(s.content, style)} />
}
