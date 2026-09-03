import * as stylex from '@stylexjs/stylex'
import * as React from 'react'

export interface AspectRatioProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'className' | 'style'
> {
  /** Width / height, e.g. `16 / 9`. */
  ratio: number
  /** StyleX styles merged last — always win over the component's own. */
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
