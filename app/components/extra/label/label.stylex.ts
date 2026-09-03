import * as stylex from '@stylexjs/stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { unit } from '#/styles/core/size.stylex'

export const labelStyles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: unit.x2,
    lineHeight: fontLineHeight.body2,
    userSelect: 'none'
  }
})
