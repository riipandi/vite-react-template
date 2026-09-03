import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { colors, radius } from '#/lib/tokens.stylex'

export interface SkeletonProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function Skeleton({ style, ...props }: SkeletonProps) {
  return <div {...props} {...stylex.props(styles.root, style)} />
}

const pulse = stylex.keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 }
})

const styles = stylex.create({
  root: {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: pulse,
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    backgroundColor: colors.muted,
    borderRadius: radius.md
  }
})
