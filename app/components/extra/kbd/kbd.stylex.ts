import * as stylex from '@stylexjs/stylex'
import { space } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/font.stylex'
import { radius } from '#/styles/core/size.stylex'

export const kbdStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.small,
    color: colors.mutedForeground,
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
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
