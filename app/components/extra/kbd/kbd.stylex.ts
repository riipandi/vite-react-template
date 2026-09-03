import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'

export const kbdStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.backgroundNeutral,
    borderRadius: radius.small,
    color: colors.foregroundNeutralFaded,
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
