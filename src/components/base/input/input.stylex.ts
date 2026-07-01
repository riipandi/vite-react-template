import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar, fontSizeVar, shadowVar } from '#/styles/tokens.stylex'

export const inputStyles = stylex.create({
  base: {
    color: colorVar.fgNeutral,
    // ans: placeholder and file input pseudo-element styling not supported in StyleX
    boxShadow: shadowVar.raised,
    height: spaceVar['9'],
    width: '100%',
    borderRadius: radiusVar.xs,
    paddingInline: spaceVar[3],
    fontSize: fontSizeVar.sm,
    transitionProperty: 'color,border-color,box-shadow',
    transitionDuration: '150ms',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    outline: 'none',
    ':hover': {
      borderColor: colorVar.borderPrimary
    },
    ':focus-visible': {
      borderColor: colorVar.borderPrimary,
      borderWidth: 2
    },
    '[data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.7,
      ':hover': {
        borderColor: colorVar.borderNeutral
      }
    }
  }
})

export const inputVariants = stylex.create({
  default: {
    backgroundColor: colorVar.bgElevationBase
  },
  subtle: {
    backgroundColor: colorVar.bgElevationBase,
    opacity: 0.6
  }
})
