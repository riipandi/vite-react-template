import * as stylex from '@stylexjs/stylex'
import { space, fontSize, lineHeight } from '#/lib/constants.stylex'
import { fontFamily, fontWeight } from '#/styles/core/font.stylex'

export const labelStyles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    gap: space.s2,
    lineHeight: lineHeight.none,
    userSelect: 'none'
  }
})
