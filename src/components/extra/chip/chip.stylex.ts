import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar, fontSizeVar, fontWeightVar } from '#/styles/tokens.stylex'

export const chipStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent'
  },
  button: {
    cursor: 'pointer',
    opacity: 0.6,
    transitionProperty: 'opacity',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease',
    ':hover': {
      opacity: 1
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.3
    }
  }
})

export const chipVariants = stylex.create({
  default: {
    backgroundColor: colorVar.bgNeutralFaded,
    borderColor: colorVar.borderNeutralFaded,
    color: colorVar.fgNeutral
  },
  primary: {
    backgroundColor: colorVar.bgPrimary,
    borderColor: colorVar.borderPrimary,
    color: colorVar.onPrimary
  },
  outline: {
    borderColor: colorVar.borderNeutralFaded,
    color: colorVar.fgNeutral
  },
  ghost: {
    color: colorVar.fgNeutral,
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  }
})

export const chipSizes = stylex.create({
  sm: {
    height: '1.125rem',
    gap: spaceVar[2],
    borderRadius: radiusVar.xs,
    paddingInline: spaceVar['1.5'],
    fontSize: fontSizeVar.xs
  },
  md: {
    height: '1.5rem',
    gap: spaceVar[2],
    borderRadius: radiusVar.xs,
    paddingInline: spaceVar[2],
    fontSize: fontSizeVar.sm
  },
  lg: {
    height: '1.75rem',
    gap: spaceVar[2],
    borderRadius: radiusVar.xs,
    paddingInline: spaceVar['2.5'],
    fontSize: fontSizeVar.sm
  }
})

export const chipPills = stylex.create({
  true: {
    borderRadius: radiusVar.full
  }
})
