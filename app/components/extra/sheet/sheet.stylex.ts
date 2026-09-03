import * as stylex from '@stylexjs/stylex'
import { space, fontSize, lineHeight, fontWeight } from '#/lib/constants.stylex'
import { z, duration, easing, stroke, container } from '#/lib/constants.stylex'
import { colors, font, shadow, radius } from '#/lib/tokens.stylex'

export const sheetStyles = stylex.create({
  overlay: {
    backgroundColor: colors.overlay,
    inset: 0,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    position: 'fixed',
    transitionDuration: duration.normal,
    transitionProperty: 'opacity',
    transitionTimingFunction: easing.out,
    zIndex: z.popup
  },
  content: {
    backgroundColor: colors.popover,
    boxShadow: shadow.lg,
    color: colors.popoverForeground,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    gap: space.s4,
    lineHeight: lineHeight.normal,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    position: 'fixed',
    transitionDuration: duration.normal,
    transitionProperty: {
      default: 'opacity, transform',
      '@media (prefers-reduced-motion: reduce)': 'opacity'
    },
    transitionTimingFunction: easing.out,
    zIndex: z.popup
  },
  close: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.accent
    },
    borderRadius: radius.sm,
    borderStyle: 'none',
    color: {
      default: colors.mutedForeground,
      ':hover': colors.accentForeground
    },
    cursor: 'pointer',
    display: 'inline-flex',
    height: space.s7,
    justifyContent: 'center',
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    padding: 0,
    position: 'absolute',
    right: space.s3,
    top: space.s3,
    width: space.s7
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.s05,
    padding: space.s4
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.s2,
    marginTop: 'auto',
    padding: space.s4
  },
  title: {
    color: colors.foreground,
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.tight,
    margin: 0
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.normal,
    margin: 0
  }
})

export const sheetSides = stylex.create({
  right: {
    transform: {
      default: 'translate(0, 0)',
      '[data-starting-style]': `translateX(${space.s10})`,
      '[data-ending-style]': `translateX(${space.s10})`
    },
    borderLeftColor: colors.border,
    borderLeftStyle: 'solid',
    borderLeftWidth: stroke.border,
    bottom: 0,
    maxWidth: container.lg,
    right: 0,
    top: 0,
    width: '75%'
  },
  left: {
    transform: {
      default: 'translate(0, 0)',
      '[data-starting-style]': `translateX(calc(-1 * ${space.s10}))`,
      '[data-ending-style]': `translateX(calc(-1 * ${space.s10}))`
    },
    borderRightColor: colors.border,
    borderRightStyle: 'solid',
    borderRightWidth: stroke.border,
    bottom: 0,
    left: 0,
    maxWidth: container.lg,
    top: 0,
    width: '75%'
  },
  top: {
    transform: {
      default: 'translate(0, 0)',
      '[data-starting-style]': `translateY(calc(-1 * ${space.s10}))`,
      '[data-ending-style]': `translateY(calc(-1 * ${space.s10}))`
    },
    borderBottomColor: colors.border,
    borderBottomStyle: 'solid',
    borderBottomWidth: stroke.border,
    left: 0,
    right: 0,
    top: 0
  },
  bottom: {
    transform: {
      default: 'translate(0, 0)',
      '[data-starting-style]': `translateY(${space.s10})`,
      '[data-ending-style]': `translateY(${space.s10})`
    },
    borderBottomStyle: 'none',
    borderTopColor: colors.border,
    borderTopStyle: 'solid',
    borderTopWidth: stroke.border,
    bottom: 0,
    left: 0,
    right: 0
  }
})
