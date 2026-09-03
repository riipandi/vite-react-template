import * as stylex from '@stylexjs/stylex'
import { space } from '#/lib/constants.stylex'
import { z, duration, easing, stroke, container } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'

export const drawerStyles = stylex.create({
  overlay: {
    backgroundColor: colors.overlay,
    inset: 0,
    minHeight: '100dvh',
    // Fades with the swipe: Base UI drives --drawer-swipe-progress inline.
    opacity: {
      default: 'max(0, calc(1 - var(--drawer-swipe-progress, 0)))',
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    position: 'fixed',
    transitionDuration: duration.slow,
    transitionProperty: 'opacity',
    transitionTimingFunction: easing.drawer,
    userSelect: 'none',
    zIndex: z.popup
  },
  viewport: {
    inset: 0,
    pointerEvents: 'none',
    position: 'fixed',
    userSelect: 'none',
    zIndex: z.popup
  },
  viewportModal: {
    pointerEvents: 'auto'
  },
  popup: {
    backgroundColor: colors.popover,
    color: colors.popoverForeground,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    minHeight: 0,
    outline: 'none',
    pointerEvents: 'auto',
    position: 'fixed',
    // The transform (swipe/snap vars + per-direction closed pose) lives in
    // `directions` below.
    transitionDuration: { default: duration.slow, '[data-swiping]': '0s' },
    transitionProperty: {
      default: 'transform, opacity',
      '@media (prefers-reduced-motion: reduce)': 'opacity'
    },
    transitionTimingFunction: easing.drawer,
    userSelect: 'none',
    willChange: 'transform',
    zIndex: z.popup
  },
  content: {
    borderRadius: 'inherit',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minHeight: 0,
    overflow: 'hidden',
    overscrollBehavior: 'contain',
    userSelect: 'text'
  },
  swipeHandle: {
    cursor: { default: 'grab', ':active': 'grabbing' },
    display: 'flex',
    flexShrink: 0,
    position: 'relative',
    '::after': {
      backgroundColor: colors.muted,
      borderRadius: radius.full,
      content: '""',
      display: 'block',
      flexShrink: 0
    },
    zIndex: 1
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    gap: space.s05,
    padding: space.s4,
    paddingBottom: 0
  },
  headerCentered: {
    textAlign: 'center'
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    gap: space.s2,
    marginTop: 'auto',
    padding: space.s4
  },
  title: {
    color: colors.foreground,
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

export const drawerDirections = stylex.create({
  down: {
    // Base UI drives the swipe/snap offsets through these inline vars.
    transform: {
      default:
        'translate3d(var(--drawer-swipe-movement-x, 0px), calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)), 0)',
      '[data-starting-style]': `translate3d(0, calc(100% + ${space.s05}), 0)`,
      '[data-ending-style]': `translate3d(0, calc(100% + ${space.s05}), 0)`
    },
    borderTopColor: colors.border,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderTopStyle: 'solid',
    borderTopWidth: stroke.border,
    bottom: 0,
    left: 0,
    maxHeight: `calc(100dvh - ${space.s16} - ${space.s8})`,
    right: 0
  },
  up: {
    // Base UI drives the swipe/snap offsets through these inline vars.
    transform: {
      default:
        'translate3d(var(--drawer-swipe-movement-x, 0px), calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)), 0)',
      '[data-starting-style]': `translate3d(0, calc(-100% - ${space.s05}), 0)`,
      '[data-ending-style]': `translate3d(0, calc(-100% - ${space.s05}), 0)`
    },
    borderBottomColor: colors.border,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    borderBottomStyle: 'solid',
    borderBottomWidth: stroke.border,
    left: 0,
    maxHeight: `calc(100dvh - ${space.s16} - ${space.s8})`,
    right: 0,
    top: 0
  },
  left: {
    // Base UI drives the swipe/snap offsets through these inline vars.
    transform: {
      default:
        'translate3d(var(--drawer-swipe-movement-x, 0px), calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)), 0)',
      '[data-starting-style]': `translate3d(calc(-100% - ${space.s05}), 0, 0)`,
      '[data-ending-style]': `translate3d(calc(-100% - ${space.s05}), 0, 0)`
    },
    borderRightColor: colors.border,
    borderBottomRightRadius: radius.xl,
    borderRightStyle: 'solid',
    borderRightWidth: stroke.border,
    borderTopRightRadius: radius.xl,
    bottom: 0,
    flexDirection: 'row',
    left: 0,
    maxWidth: container.lg,
    top: 0,
    width: '75%'
  },
  right: {
    // Base UI drives the swipe/snap offsets through these inline vars.
    transform: {
      default:
        'translate3d(var(--drawer-swipe-movement-x, 0px), calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)), 0)',
      '[data-starting-style]': `translate3d(calc(100% + ${space.s05}), 0, 0)`,
      '[data-ending-style]': `translate3d(calc(100% + ${space.s05}), 0, 0)`
    },
    borderLeftColor: colors.border,
    borderBottomLeftRadius: radius.xl,
    borderLeftStyle: 'solid',
    borderLeftWidth: stroke.border,
    borderTopLeftRadius: radius.xl,
    bottom: 0,
    flexDirection: 'row',
    maxWidth: container.lg,
    right: 0,
    top: 0,
    width: '75%'
  }
})

export const drawerSwipeHandles = stylex.create({
  down: {
    alignItems: 'flex-end',
    height: space.s3,
    justifyContent: 'center',
    width: '100%',
    '::after': {
      height: space.s1,
      width: `calc(${space.s16} + ${space.s8})`
    }
  },
  up: {
    alignItems: 'flex-start',
    height: space.s3,
    justifyContent: 'center',
    order: 1,
    width: '100%',
    '::after': {
      height: space.s1,
      width: `calc(${space.s16} + ${space.s8})`
    }
  },
  left: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-start',
    order: 1,
    width: space.s3,
    '::after': {
      height: `calc(${space.s16} + ${space.s8})`,
      width: space.s1
    }
  },
  right: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    width: space.s3,
    '::after': {
      height: `calc(${space.s16} + ${space.s8})`,
      width: space.s1
    }
  }
})
