import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { duration, easing } from '#/styles/core/tokens.stylex'

export const switchStyles = stylex.create({
  root: {
    backgroundColor: {
      default: colors.borderNeutralFaded,
      '[data-checked]': colors.backgroundPrimary,
      '[data-invalid]': colors.backgroundCritical
    },
    borderRadius: radius.full,
    borderStyle: 'none',
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    flexShrink: 0,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: stroke.ring2,
    padding: unit.x0_5,
    position: 'relative',
    transitionDuration: duration.fast,
    transitionProperty: 'background-color',
    // Invisible expanded hit area (larger touch target).
    '::after': {
      content: '""',
      insetBlock: `calc(-1 * ${unit.x2})`,
      insetInline: `calc(-1 * ${unit.x3})`,
      position: 'absolute'
    }
  },
  thumb: {
    backgroundColor: colors.backgroundPage,
    borderRadius: radius.full,
    transitionDuration: duration.fast,
    transitionProperty: {
      default: 'transform',
      '@media (prefers-reduced-motion: reduce)': 'none'
    },
    transitionTimingFunction: easing.standard
  }
})

export const switchRootSizes = stylex.create({
  md: {
    height: unit.x5,
    width: unit.x9
  },
  sm: {
    height: unit.x4,
    width: unit.x7
  }
})

export const switchThumbSizes = stylex.create({
  md: {
    height: unit.x4,
    transform: {
      default: 'translateX(0)',
      '[data-checked]': `translateX(${unit.x4})`
    },
    width: unit.x4
  },
  sm: {
    height: unit.x3,
    transform: {
      default: 'translateX(0)',
      '[data-checked]': `translateX(${unit.x3})`
    },
    width: unit.x3
  }
})
