import * as stylex from '@stylexjs/stylex'
import { space, lineHeight } from '#/lib/constants.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/font.stylex'

export const labelStyles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: space.s2,
    lineHeight: lineHeight.none,
    userSelect: 'none'
  }
})
