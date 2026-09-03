import * as stylex from '@stylexjs/stylex'
import { space, lineHeight, z } from '#/lib/constants.stylex'
import { duration, easing, stroke, container } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/font.stylex'

export const alertDialogStyles = stylex.create({
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
    borderRadius: radius.xl,
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
    padding: space.s4,
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
    zIndex: z.popup
  },
  header: {
    alignItems: {
      default: 'center',
      '@media (min-width: 640px)': 'flex-start'
    },
    display: 'flex',
    flexDirection: 'column',
    gap: space.s15,
    textAlign: {
      default: 'center',
      '@media (min-width: 640px)': 'left'
    }
  },
  media: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.md,
    display: 'inline-flex',
    height: space.s10,
    justifyContent: 'center',
    marginBottom: space.s2,
    width: space.s10
  },
  footer: {
    backgroundColor: `color-mix(in srgb, ${colors.muted} 50%, transparent)`,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    borderTopColor: colors.border,
    borderTopStyle: 'solid',
    borderTopWidth: stroke.border,
    display: 'flex',
    flexDirection: {
      default: 'column-reverse',
      '@media (min-width: 640px)': 'row'
    },
    gap: space.s2,
    justifyContent: {
      default: 'stretch',
      '@media (min-width: 640px)': 'flex-end'
    },
    marginBottom: `calc(-1 * ${space.s4})`,
    marginInline: `calc(-1 * ${space.s4})`,
    padding: space.s4
  },
  title: {
    fontSize: fontSize.body1,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.tight,
    margin: 0
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.body2,
    lineHeight: lineHeight.normal,
    margin: 0
  }
})

export const alertDialogSizes = stylex.create({
  md: {
    width: {
      default: container.md,
      '@media (min-width: 640px)': container.lg
    }
  },
  sm: {
    width: container.md
  }
})
