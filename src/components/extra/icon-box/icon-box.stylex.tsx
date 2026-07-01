import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar } from '#/styles/tokens.stylex'

export const iconBoxStyles = stylex.create({
  base: {
    position: 'relative',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center'
    // ans: pseudo-elements (::before, ::after) not supported in StyleX
    // ans: child selector *: svg positioning not supported
  }
})

export const iconBoxVariants = stylex.create({
  primary: {
    color: colorVar.onPrimary
  },
  secondary: {
    color: colorVar.onBgNeutral
  },
  danger: {
    color: colorVar.onBgCritical
  },
  info: {
    color: colorVar.onPrimary
  },
  success: {
    color: colorVar.onBgPositive
  },
  warning: {
    color: colorVar.onBgWarning
  },
  'primary-subtle': {
    backgroundColor: colorVar.bgPrimaryFaded,
    color: colorVar.fgPrimary
  },
  'secondary-subtle': {
    backgroundColor: colorVar.bgNeutralFaded,
    color: colorVar.fgNeutral
  },
  'danger-subtle': {
    backgroundColor: colorVar.bgCriticalFaded,
    color: colorVar.fgCritical
  },
  'info-subtle': {
    backgroundColor: colorVar.bgPrimaryFaded,
    color: colorVar.fgPrimary
  },
  'success-subtle': {
    backgroundColor: colorVar.bgPositiveFaded,
    color: colorVar.fgPositive
  },
  'warning-subtle': {
    backgroundColor: colorVar.bgWarningFaded,
    color: colorVar.fgWarning
  }
})

export const iconBoxSizes = stylex.create({
  sm: {
    width: '1.625rem',
    height: '1.625rem',
    borderRadius: radiusVar.xs
  },
  md: {
    width: '2.125rem',
    height: '2.125rem',
    borderRadius: radiusVar.sm
  },
  lg: {
    width: '3rem',
    height: '3rem',
    borderRadius: radiusVar.lg
  }
})

export const iconBoxCircles = stylex.create({
  true: {
    borderRadius: radiusVar.full
  }
})
