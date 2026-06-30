import * as stylex from '@stylexjs/stylex'
import { radius, shadow, space, color } from '#/styles/tokens.stylex'

export const cardStyles = stylex.create({
  base: {
    width: '100%',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.borderNeutral,
    backgroundColor: color.bgPage,
    boxShadow: shadow.sm,
    padding: space[4],
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: '200ms'
  }
})
