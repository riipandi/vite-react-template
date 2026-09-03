import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { skeletonStyles as s } from './skeleton.stylex'

export interface SkeletonProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function Skeleton({ style, ...props }: SkeletonProps) {
  return <div {...props} {...stylex.props(s.root, style)} />
}
