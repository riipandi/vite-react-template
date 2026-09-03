import * as stylex from '@stylexjs/stylex'
import { space, fontSize } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight } from '#/styles/core/font.stylex'

export const kbdStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.sm,
    color: colors.mutedForeground,
    display: 'inline-flex',
    fontFamily: fontFamily.body,
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
    fontFamily: fontFamily.body,
    gap: space.s1
  }
})
