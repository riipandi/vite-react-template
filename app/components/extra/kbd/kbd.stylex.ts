import * as stylex from '@stylexjs/stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/font.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

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
    gap: unit.x1,
    height: unit.x5,
    justifyContent: 'center',
    minWidth: unit.x5,
    paddingInline: unit.x1,
    pointerEvents: 'none',
    userSelect: 'none',
    width: 'fit-content'
  },
  group: {
    alignItems: 'center',
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    gap: unit.x1
  }
})
