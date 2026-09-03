import * as stylex from '@stylexjs/stylex'
import { space, duration, easing, stroke } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'

export const switchStyles = stylex.create({
  root: {
    backgroundColor: {
      default: colors.input,
      '[data-checked]': colors.primary,
      '[data-invalid]': colors.destructive
    },
    borderRadius: radius.full,
    borderStyle: 'none',
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    flexShrink: 0,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    outlineOffset: stroke.focus,
    padding: space.s05,
    position: 'relative',
    transitionDuration: duration.fast,
    transitionProperty: 'background-color',
    // Invisible expanded hit area (larger touch target).
    '::after': {
      content: '""',
      insetBlock: `calc(-1 * ${space.s2})`,
      insetInline: `calc(-1 * ${space.s3})`,
      position: 'absolute'
    }
  },
  thumb: {
    backgroundColor: colors.background,
    borderRadius: radius.full,
    transitionDuration: duration.fast,
    transitionProperty: {
      default: 'transform',
      '@media (prefers-reduced-motion: reduce)': 'none'
    },
    transitionTimingFunction: easing.inOut
  }
})

export const switchRootSizes = stylex.create({
  md: {
    height: space.s5,
    width: space.s9
  },
  sm: {
    height: space.s4,
    width: space.s7
  }
})

export const switchThumbSizes = stylex.create({
  md: {
    height: space.s4,
    transform: {
      default: 'translateX(0)',
      '[data-checked]': `translateX(${space.s4})`
    },
    width: space.s4
  },
  sm: {
    height: space.s3,
    transform: {
      default: 'translateX(0)',
      '[data-checked]': `translateX(${space.s3})`
    },
    width: space.s3
  }
})
