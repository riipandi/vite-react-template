import * as stylex from '@stylexjs/stylex'
import { space, fontSize, lineHeight, fontWeight } from '#/lib/constants.stylex'
import { font } from '#/lib/tokens.stylex'

export const labelStyles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    gap: space.s2,
    lineHeight: lineHeight.none,
    userSelect: 'none'
  }
})
