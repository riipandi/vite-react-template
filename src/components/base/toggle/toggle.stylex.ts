import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, shadowVar, fontSizeVar, spaceVar } from '#/styles/tokens.stylex'

export const toggleStyles = stylex.create({
  base: {
    display: 'inline-flex',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spaceVar[2],
    userSelect: 'none',
    fontFamily: 'inherit',
    fontSize: fontSizeVar.sm,
    lineHeight: 1,
    outline: 'none',
    borderWidth: 1,
    borderStyle: 'solid',
    transitionProperty: 'color, background-color, border-color, opacity',
    transitionDuration: '100ms',
    transitionTimingFunction: 'ease',
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineOffset: 2,
      outlineColor: colorVar.fgPrimary
    },
    ':hover': {
      backgroundImage: {
        default: 'linear-gradient(rgba(0,0,0,0.04), rgba(0,0,0,0.04))',
        '[data-disabled]': null,
        '[data-pressed]': null
      }
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  }
})

export const toggleVariants = stylex.create({
  default: {
    backgroundColor: colorVar.bgPage,
    borderColor: colorVar.borderNeutral,
    boxShadow: shadowVar.sm,
    '[data-pressed]': {
      backgroundColor: colorVar.bgNeutralFaded
    }
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    '[data-pressed]': {
      backgroundColor: colorVar.bgNeutralFaded
    }
  }
})

export const toggleSizes = stylex.create({
  sm: {
    height: '2rem',
    minWidth: '2rem',
    borderRadius: radiusVar.xs,
    paddingInline: spaceVar['2.5']
  },
  md: {
    height: '2.25rem',
    minWidth: '2.25rem',
    borderRadius: radiusVar.xs,
    paddingInline: spaceVar['3.5']
  },
  lg: {
    height: '2.75rem',
    minWidth: '2.75rem',
    borderRadius: radiusVar.sm,
    paddingInline: spaceVar[4]
  }
})

export const toggleModes = stylex.create({
  icon: {
    aspectRatio: '1',
    padding: spaceVar[2]
  }
})
