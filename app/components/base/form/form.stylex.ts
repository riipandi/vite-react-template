import * as stylex from '@stylexjs/stylex'
import { space } from '#/lib/constants.stylex'
import { fontFamily } from '#/styles/core/font.stylex'

export const formStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: space.s5,
    width: '100%'
  }
})
