import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'
import { badgeStyles as s, badgeVariants as variants } from './badge.stylex'

export type BadgeVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'

export interface BadgeProps extends Omit<useRender.ComponentProps<'span'>, 'className' | 'style'> {
  variant?: BadgeVariant
  style?: stylex.StyleXStyles
}

export function Badge({ variant = 'primary', style, render, ...props }: BadgeProps) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(stylex.props(s.root, variants[variant], style), props),
    render
  })
}
