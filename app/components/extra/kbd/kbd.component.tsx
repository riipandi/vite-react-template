import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, fontSize, fontWeight } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export function Kbd({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'kbd'>, 'className' | 'style'> & StyleProp) {
  return <kbd {...props} {...stylex.props(styles.root, style)} />
}

export function KbdGroup({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'kbd'>, 'className' | 'style'> & StyleProp) {
  return <kbd {...props} {...stylex.props(styles.group, style)} />
}

const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.sm,
    color: colors.mutedForeground,
    display: 'inline-flex',
    fontFamily: font.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    gap: space.s1,
    height: space.s5,
    justifyContent: 'center',
    minWidth: space.s5,
    paddingInline: space.s1,
    pointerEvents: 'none',
    userSelect: 'none',
    width: 'fit-content'
  },
  group: {
    alignItems: 'center',
    display: 'inline-flex',
    fontFamily: font.sans,
    gap: space.s1
  }
})
