import * as stylex from '@stylexjs/stylex'
import { colors, shadow } from '#/styles/core/colors.stylex'
import { stroke, container } from '#/styles/core/tokens.stylex'
import { unit, radius, zIndex } from '#/styles/core/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { duration, easing } from '#/styles/core/tokens.stylex'

export const sheetStyles = stylex.create({
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
    boxShadow: shadow.overlay,
    color: colors.foregroundNeutral,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    gap: unit.x4,
    lineHeight: fontLineHeight.body2,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    position: 'fixed',
    transitionDuration: duration.medium,
    transitionProperty: {
      default: 'opacity, transform',
      '@media (prefers-reduced-motion: reduce)': 'opacity'
    },
    transitionTimingFunction: easing.decelerate,
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
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
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
    gap: unit.x0_5,
    padding: unit.x4
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2,
    marginTop: 'auto',
    padding: unit.x4
  },
  title: {
    color: colors.foregroundNeutral,
    fontSize: fontSize.body1,
    fontWeight: fontWeight.semibold,
    lineHeight: fontLineHeight.body1,
    margin: 0
  },
  description: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    marginTop: unit.x1,
    margin: 0
  }
})

export const sheetSides = stylex.create({
  right: {
    transform: {
      default: 'translate(0, 0)',
      '[data-starting-style]': `translateX(${unit.x10})`,
      '[data-ending-style]': `translateX(${unit.x10})`
    },
    borderBottomLeftRadius: radius.xlarge,
    borderTopLeftRadius: radius.xlarge,
    borderLeftColor: colors.borderNeutralFaded,
    borderLeftStyle: 'solid',
    borderLeftWidth: stroke.ring1,
    bottom: 0,
    maxWidth: container.lg,
    right: 0,
    top: 0,
    width: '75%'
  },
  left: {
    transform: {
      default: 'translate(0, 0)',
      '[data-starting-style]': `translateX(calc(-1 * ${unit.x10}))`,
      '[data-ending-style]': `translateX(calc(-1 * ${unit.x10}))`
    },
    borderBottomRightRadius: radius.xlarge,
    borderTopRightRadius: radius.xlarge,
    borderRightColor: colors.borderNeutralFaded,
    borderRightStyle: 'solid',
    borderRightWidth: stroke.ring1,
    bottom: 0,
    left: 0,
    maxWidth: container.lg,
    top: 0,
    width: '75%'
  },
  top: {
    transform: {
      default: 'translate(0, 0)',
      '[data-starting-style]': `translateY(calc(-1 * ${unit.x10}))`,
      '[data-ending-style]': `translateY(calc(-1 * ${unit.x10}))`
    },
    borderBottomColor: colors.borderNeutralFaded,
    borderBottomLeftRadius: radius.xlarge,
    borderBottomRightRadius: radius.xlarge,
    borderBottomStyle: 'solid',
    borderBottomWidth: stroke.ring1,
    left: 0,
    right: 0,
    top: 0
  },
  bottom: {
    transform: {
      default: 'translate(0, 0)',
      '[data-starting-style]': `translateY(${unit.x10})`,
      '[data-ending-style]': `translateY(${unit.x10})`
    },
    borderBottomStyle: 'none',
    borderTopColor: colors.borderNeutralFaded,
    borderTopLeftRadius: radius.xlarge,
    borderTopRightRadius: radius.xlarge,
    borderTopStyle: 'solid',
    borderTopWidth: stroke.ring1,
    bottom: 0,
    left: 0,
    right: 0
  }
})
