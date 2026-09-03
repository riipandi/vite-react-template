import * as stylex from '@stylexjs/stylex'
import * as React from 'react'

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

const styles = stylex.create({
  root: {
    position: 'relative',
    width: '100%'
  }
})

const ratios = stylex.create({
  ratio: (value: number) => ({ aspectRatio: value })
})
