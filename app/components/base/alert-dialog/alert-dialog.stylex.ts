import * as stylex from '@stylexjs/stylex'
import { stroke, container } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { duration, easing } from '#/styles/core/motion.stylex'
import { unit, radius, zIndex } from '#/styles/core/size.stylex'

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
    transitionDuration: duration.medium,
    transitionProperty: 'opacity',
    transitionTimingFunction: easing.decelerate,
    zIndex: zIndex.absolute
  },
  content: {
    backgroundColor: colors.popover,
    borderRadius: radius.xlarge,
    color: colors.popoverForeground,
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
    padding: unit.x4,
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
    zIndex: zIndex.absolute
  },
  header: {
    alignItems: {
      default: 'center',
      '@media (min-width: 640px)': 'flex-start'
    },
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1_5,
    textAlign: {
      default: 'center',
      '@media (min-width: 640px)': 'left'
    }
  },
  media: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.medium,
    display: 'inline-flex',
    height: unit.x10,
    justifyContent: 'center',
    marginBottom: unit.x2,
    width: unit.x10
  },
  footer: {
    backgroundColor: `color-mix(in srgb, ${colors.muted} 50%, transparent)`,
    borderBottomLeftRadius: radius.xlarge,
    borderBottomRightRadius: radius.xlarge,
    borderTopColor: colors.border,
    borderTopStyle: 'solid',
    borderTopWidth: stroke.border,
    display: 'flex',
    flexDirection: {
      default: 'column-reverse',
      '@media (min-width: 640px)': 'row'
    },
    gap: unit.x2,
    justifyContent: {
      default: 'stretch',
      '@media (min-width: 640px)': 'flex-end'
    },
    marginBottom: `calc(-1 * ${unit.x4})`,
    marginInline: `calc(-1 * ${unit.x4})`,
    padding: unit.x4
  },
  title: {
    fontSize: fontSize.body1,
    fontWeight: fontWeight.medium,
    lineHeight: fontLineHeight.body1,
    margin: 0
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
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
