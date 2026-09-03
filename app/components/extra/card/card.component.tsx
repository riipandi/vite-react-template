import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { cardStyles as s, cardSizes as sizes } from './card.stylex'

interface DivProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  style?: stylex.StyleXStyles
}

export type CardSize = 'md' | 'sm'

export function Card({ size = 'md', style, ...props }: DivProps & { size?: CardSize }) {
  return <div {...props} {...stylex.props(s.root, sizes[size], style)} />
}

export function CardHeader({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(s.header, style)} />
}

export function CardTitle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'h3'>, 'className' | 'style'> & {
  style?: stylex.StyleXStyles
}) {
  return <h3 {...props} {...stylex.props(s.title, style)} />
}

export function CardDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'p'>, 'className' | 'style'> & {
  style?: stylex.StyleXStyles
}) {
  return <p {...props} {...stylex.props(s.description, style)} />
}

/** Slot for a header-level action (e.g. a button), pinned top-right. */
export function CardAction({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(s.action, style)} />
}

export function CardContent({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(s.content, style)} />
}

export function CardFooter({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(s.footer, style)} />
}
