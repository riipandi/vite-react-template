import * as stylex from '@stylexjs/stylex'
import { unit } from '#/styles/core/size.stylex'

export const checkboxGroupStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: unit.x2
  }
})
