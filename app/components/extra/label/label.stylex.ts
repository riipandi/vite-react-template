import * as stylex from '@stylexjs/stylex'
import { space } from '#/lib/constants.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'

export const labelStyles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: space.s2,
    lineHeight: fontLineHeight.body2,
    userSelect: 'none'
  }
})
