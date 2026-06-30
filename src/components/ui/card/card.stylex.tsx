import * as stylex from '@stylexjs/stylex'
import { ui, radius, shadow, space } from '#/styles/token.stylex'

export const cardStyles = stylex.create({
  base: {
    width: '100%',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: ui.border,
    backgroundColor: ui.bg,
    boxShadow: shadow.sm,
    padding: space[4],
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: '200ms'
  }
})
