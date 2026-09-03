import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke, container } from '#/styles/core/tokens.stylex'
import { unit, radius, zIndex } from '#/styles/core/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { duration, easing } from '#/styles/core/tokens.stylex'

export const dialogStyles = stylex.create({
  overlay: {
    backgroundColor: `color-mix(in srgb, ${colors.black} 50%, transparent)`,
    inset: 0,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    position: 'fixed',
    transitionDuration: duration.medium,
    transitionProperty: 'opacity',
    transitionTimingFunction: easing.decelerate,
    zIndex: zIndex.absolute
  },
  content: {
    backgroundColor: colors.backgroundElevationOverlay,
    borderRadius: radius.large,
    color: colors.foregroundNeutral,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: unit.x4,
    left: '50%',
    maxWidth: `calc(100% - ${unit.x8})`,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    padding: unit.x6,
    position: 'fixed',
    top: '50%',
    transform: {
      default: 'translate(-50%, -50%) scale(1)',
      '[data-starting-style]': 'translate(-50%, -50%) scale(0.97)',
      '[data-ending-style]': 'translate(-50%, -50%) scale(0.97)'
    },
    transitionDuration: duration.medium,
    transitionProperty: {
      default: 'opacity, transform',
      '@media (prefers-reduced-motion: reduce)': 'opacity'
    },
    transitionTimingFunction: easing.decelerate,
    width: container.xxl,
    zIndex: zIndex.absolute
  },
  close: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.backgroundNeutralFaded
    },
    borderRadius: radius.small,
    borderStyle: 'none',
    color: {
      default: colors.foregroundNeutralFaded,
      ':hover': colors.foregroundNeutral
    },
    cursor: 'pointer',
    display: 'inline-flex',
    height: unit.x7,
    justifyContent: 'center',
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.foregroundPrimary}`
    },
    padding: 0,
    position: 'absolute',
    right: unit.x3,
    top: unit.x3,
    width: unit.x7
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1_5
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    gap: unit.x2,
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: fontSize.featured6,
    fontWeight: fontWeight.semibold,
    lineHeight: fontLineHeight.featured6,
    margin: 0
  },
  description: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    margin: 0
  }
})
