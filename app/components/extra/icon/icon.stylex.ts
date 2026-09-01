import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/color.stylex'
import { duration, easing } from '#/styles/core/motion.stylex'
import { unit } from '#/styles/core/size.stylex'

// ---------------------------------------------------------------------------
// Base styles
// ---------------------------------------------------------------------------

const base = stylex.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: '1 / 1',
    transitionProperty: 'color',
    transitionDuration: duration.fast,
    transitionTimingFunction: easing.standard
  }
})

// ---------------------------------------------------------------------------
// Size tokens (height values, width follows aspect-ratio)
// ---------------------------------------------------------------------------

const sizes = stylex.create({
  '0.5': { height: unit['x0.5'] },
  '1': { height: unit.x1 },
  '1.5': { height: unit['x1.5'] },
  '2': { height: unit.x2 },
  '2.5': { height: '2.5rem' },
  '3': { height: unit.x3 },
  '3.5': { height: '3.5rem' },
  '4': { height: unit.x4 },
  '5': { height: unit.x5 },
  '6': { height: unit.x6 },
  '8': { height: unit.x8 },
  '10': { height: unit.x10 },
  '12': { height: unit.x12 },
  '16': { height: unit.x16 },
  '20': { height: unit.x20 }
})

// ---------------------------------------------------------------------------
// Auto width (use SVG's natural width)
// ---------------------------------------------------------------------------

const autoWidth = stylex.create({
  root: {
    aspectRatio: 'auto',
    justifyContent: 'flex-start',
    width: 'auto'
  }
})

// ---------------------------------------------------------------------------
// Color styles
// ---------------------------------------------------------------------------

const colorStyles = stylex.create({
  neutral: { color: colors.foregroundNeutral },
  'neutral-faded': { color: colors.foregroundNeutralFaded },
  critical: { color: colors.foregroundCritical },
  warning: { color: colors.foregroundWarning },
  positive: { color: colors.foregroundPositive },
  primary: { color: colors.foregroundPrimary },
  disabled: { color: colors.foregroundDisabled }
})

const svgBase = stylex.create({
  root: {
    display: 'block',
    minWidth: '100%',
    height: '100%',
    width: 'auto'
  }
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const iconStyles = {
  base,
  sizes,
  autoWidth,
  colorStyles,
  svgBase
} as const
