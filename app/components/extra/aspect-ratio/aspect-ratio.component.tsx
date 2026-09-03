import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { aspectRatioStyles as styles, aspectRatioRatios as ratios } from './aspect-ratio.stylex'

export interface AspectRatioProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'className' | 'style'
> {
  ratio: number
  style?: stylex.StyleXStyles
}

export function AspectRatio({ ratio, style, ...props }: AspectRatioProps) {
  return <div {...props} {...stylex.props(styles.root, ratios.ratio(ratio), style)} />
}
