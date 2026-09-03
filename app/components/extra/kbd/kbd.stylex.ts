import * as stylex from '@stylexjs/stylex'
import { space, fontSize, fontWeight } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

export const kbdStyles = stylex.create({
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
