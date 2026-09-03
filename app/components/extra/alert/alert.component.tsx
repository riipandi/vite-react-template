import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { alertStyles as styles, alertVariants as variants } from './alert.stylex'

export type AlertVariant = 'default' | 'destructive'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export interface AlertProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>, StyleProp {
  variant?: AlertVariant
}

export function Alert({ variant = 'default', style, ...props }: AlertProps) {
  return <div role='alert' {...props} {...stylex.props(styles.root, variants[variant], style)} />
}

export function AlertTitle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'h5'>, 'className' | 'style'> & StyleProp) {
  return <h5 {...props} {...stylex.props(styles.title, style)} />
}

export function AlertDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return <div {...props} {...stylex.props(styles.description, style)} />
}

/** Slot pinned to the top-right corner of an `Alert`, for a dismiss or undo action. */
export function AlertAction({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return <div {...props} {...stylex.props(styles.action, style)} />
}
