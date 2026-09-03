import * as stylex from '@stylexjs/stylex'
import { space } from '#/lib/constants.stylex'
import { font } from '#/lib/tokens.stylex'

export const formStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: font.sans,
    gap: space.s5,
    width: '100%'
  }
})
