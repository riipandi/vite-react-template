import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, fontSize, lineHeight, fontWeight } from '#/lib/constants.stylex'
import { font } from '#/lib/tokens.stylex'

export interface LabelProps extends Omit<
  React.ComponentPropsWithoutRef<'label'>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function Label({ style, ...props }: LabelProps) {
  return <label {...props} {...stylex.props(styles.root, style)} />
}

const styles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    gap: space.s2,
    lineHeight: lineHeight.none,
    userSelect: 'none'
  }
})
