import * as stylex from '@stylexjs/stylex'
import { fontFamily } from '#/styles/core/font.stylex'
import { unit } from '#/styles/core/size.stylex'

export const formStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: unit.x5,
    width: '100%'
  }
})
