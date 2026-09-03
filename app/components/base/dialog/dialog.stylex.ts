import * as stylex from '@stylexjs/stylex'
import { space, z } from '#/lib/constants.stylex'
import { duration, easing, stroke, container } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'

export const dialogStyles = stylex.create({
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
    borderRadius: radius.lg,
    color: colors.popoverForeground,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: space.s4,
    left: '50%',
    maxWidth: `calc(100% - ${space.s8})`,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    padding: space.s6,
    position: 'fixed',
    top: '50%',
    transform: {
      default: 'translate(-50%, -50%) scale(1)',
      '[data-starting-style]': 'translate(-50%, -50%) scale(0.97)',
      '[data-ending-style]': 'translate(-50%, -50%) scale(0.97)'
    },
    transitionDuration: duration.normal,
    transitionProperty: {
      default: 'opacity, transform',
      '@media (prefers-reduced-motion: reduce)': 'opacity'
    },
    transitionTimingFunction: easing.out,
    width: container.xxl,
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
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    padding: 0,
    position: 'absolute',
    right: space.s3,
    top: space.s3,
    width: space.s7
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.s15
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    gap: space.s2,
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: fontSize.featured6,
    fontWeight: fontWeight.semibold,
    lineHeight: fontLineHeight.featured6,
    margin: 0
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    margin: 0
  }
})
