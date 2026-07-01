import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, shadowVar, spaceVar, fontSizeVar } from '#/styles/tokens.stylex'

export const textareaStyles = stylex.create({
  base: {
    color: colorVar.fgNeutral,
    boxShadow: shadowVar.raised,
    width: '100%',
    borderRadius: radiusVar.xs,
    paddingInline: spaceVar[3],
    paddingTop: spaceVar[3],
    paddingBottom: spaceVar[3],
    fontSize: fontSizeVar.sm,
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: '150ms',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    ':focus': {
      borderColor: colorVar.borderPrimary,
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: colorVar.borderPrimary
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
    // ans: placeholder styles deferred - not supported in StyleX
    // ans: hover:not-[[disabled],[data-disabled]]:not-focus:ring-border-primary deferred - complex selector
    // ans: field-sizing-content utility deferred - not supported in StyleX
  }
})

export const textareaVariants = stylex.create({
  default: {
    backgroundColor: colorVar.bgElevationBase
  },
  subtle: {
    backgroundColor: colorVar.bgElevationBase,
    opacity: 0.6
  }
})

export const textareaSizes = stylex.create({
  sm: {
    minHeight: '4rem',
    paddingInline: spaceVar['2.5'],
    paddingTop: spaceVar[2],
    paddingBottom: spaceVar[2]
  },
  md: {
    minHeight: '5rem',
    paddingInline: spaceVar[3],
    paddingTop: spaceVar[3],
    paddingBottom: spaceVar[3]
  },
  lg: {
    minHeight: '6rem',
    paddingInline: spaceVar[4],
    paddingTop: spaceVar[3],
    paddingBottom: spaceVar[3]
  }
})
