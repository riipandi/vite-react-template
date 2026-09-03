import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { emptyStyles as styles, emptyMediaVariants as mediaVariants } from './empty.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

type DivProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp

export function Empty({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.root, style)} />
}

export function EmptyHeader({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.header, style)} />
}

export type EmptyMediaVariant = 'default' | 'icon'

export function EmptyMedia({
  variant = 'default',
  style,
  ...props
}: DivProps & { variant?: EmptyMediaVariant }) {
  return <div {...props} {...stylex.props(styles.media, mediaVariants[variant], style)} />
}

export function EmptyTitle({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.title, style)} />
}

export function EmptyDescription({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.description, style)} />
}

export function EmptyContent({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(styles.content, style)} />
}
