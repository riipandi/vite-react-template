import * as stylex from '@stylexjs/stylex'
import { spaceVar, fontSizeVar } from '#/styles/tokens.stylex'

export const formStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar[4],
    fontSize: fontSizeVar.sm
  }
})
