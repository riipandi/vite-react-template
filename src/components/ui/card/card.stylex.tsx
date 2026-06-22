import * as stylex from '@stylexjs/stylex'
import { colors, radius, shadow } from '#/styles/tokens.stylex'

export const cardStyles = stylex.create({
  base: {
    width: '100%',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.zinc200,
    backgroundColor: colors.surface,
    boxShadow: shadow.sm,
    padding: '10px',
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: '200ms'
  }
})
