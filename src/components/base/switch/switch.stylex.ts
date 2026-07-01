import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, shadowVar, spaceVar } from '#/styles/tokens.stylex'

export const switchStyles = stylex.create({
  root: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    borderRadius: radiusVar.full,
    paddingInline: spaceVar['0.5'],
    backgroundColor: colorVar.bgNeutral,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    transitionProperty: 'color, background-color, border-color, box-shadow',
    transitionDuration: '75ms',
    transitionTimingFunction: 'ease',
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineOffset: 2,
      outlineColor: colorVar.fgPrimary
    },
    '[data-checked]': {
      backgroundColor: colorVar.bgPrimary,
      borderColor: colorVar.borderPrimary
    },
    '[data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  thumb: {
    borderRadius: '50%',
    backgroundColor: colorVar.white,
    boxShadow: shadowVar.raised,
    transitionProperty: 'transform',
    transitionDuration: '75ms',
    transitionTimingFunction: 'ease',
    '[data-checked]': {
      transform: 'translateX(1rem)'
    }
  }
})

export const switchSizes = stylex.create({
  sm: {
    height: '0.75rem',
    width: '1.75rem'
  },
  md: {
    height: '1rem',
    width: '2rem'
  },
  lg: {
    height: '1.25rem',
    width: '2.25rem'
  }
})
