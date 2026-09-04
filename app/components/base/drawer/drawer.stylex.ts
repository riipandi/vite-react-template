import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke, container } from '#/styles/core/tokens.stylex'
import { unit, radius, zIndex } from '#/styles/core/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { duration, easing } from '#/styles/core/tokens.stylex'

export const drawerStyles = stylex.create({
  overlay: {
    backgroundColor: `color-mix(in srgb, ${colors.black} 50%, transparent)`,
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
    transitionTimingFunction: easing.decelerate,
    userSelect: 'none',
    zIndex: zIndex.absolute
  },
  viewport: {
    inset: 0,
    pointerEvents: 'none',
    position: 'fixed',
    userSelect: 'none',
    zIndex: zIndex.absolute
  },
  viewportModal: {
    pointerEvents: 'auto'
  },
  popup: {
    backgroundColor: colors.backgroundElevationOverlay,
    color: colors.foregroundNeutral,
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
    transitionTimingFunction: easing.decelerate,
    userSelect: 'none',
    willChange: 'transform',
    zIndex: zIndex.absolute
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
      backgroundColor: colors.backgroundNeutral,
      borderRadius: radius.circular,
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
    gap: unit.x0_5,
    padding: unit.x4,
    paddingBottom: 0
  },
  headerCentered: {
    textAlign: 'center'
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
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
    margin: 0
  }
})

export const drawerDirections = stylex.create({
  down: {
    // Base UI drives the swipe/snap offsets through these inline vars.
    transform: {
      default:
        'translate3d(var(--drawer-swipe-movement-x, 0px), calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)), 0)',
      '[data-starting-style]': `translate3d(0, calc(100% + ${unit.x0_5}), 0)`,
      '[data-ending-style]': `translate3d(0, calc(100% + ${unit.x0_5}), 0)`
    },
    borderTopColor: colors.borderNeutralFaded,
    borderTopLeftRadius: radius.xlarge,
    borderTopRightRadius: radius.xlarge,
    borderTopStyle: 'solid',
    borderTopWidth: stroke.border,
    bottom: 0,
    left: 0,
    maxHeight: `calc(100dvh - ${unit.x16} - ${unit.x8})`,
    right: 0
  },
  up: {
    // Base UI drives the swipe/snap offsets through these inline vars.
    transform: {
      default:
        'translate3d(var(--drawer-swipe-movement-x, 0px), calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)), 0)',
      '[data-starting-style]': `translate3d(0, calc(-100% - ${unit.x0_5}), 0)`,
      '[data-ending-style]': `translate3d(0, calc(-100% - ${unit.x0_5}), 0)`
    },
    borderBottomColor: colors.borderNeutralFaded,
    borderBottomLeftRadius: radius.xlarge,
    borderBottomRightRadius: radius.xlarge,
    borderBottomStyle: 'solid',
    borderBottomWidth: stroke.border,
    left: 0,
    maxHeight: `calc(100dvh - ${unit.x16} - ${unit.x8})`,
    right: 0,
    top: 0
  },
  left: {
    // Base UI drives the swipe/snap offsets through these inline vars.
    transform: {
      default:
        'translate3d(var(--drawer-swipe-movement-x, 0px), calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)), 0)',
      '[data-starting-style]': `translate3d(calc(-100% - ${unit.x0_5}), 0, 0)`,
      '[data-ending-style]': `translate3d(calc(-100% - ${unit.x0_5}), 0, 0)`
    },
    borderRightColor: colors.borderNeutralFaded,
    borderBottomRightRadius: radius.xlarge,
    borderRightStyle: 'solid',
    borderRightWidth: stroke.border,
    borderTopRightRadius: radius.xlarge,
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
      '[data-starting-style]': `translate3d(calc(100% + ${unit.x0_5}), 0, 0)`,
      '[data-ending-style]': `translate3d(calc(100% + ${unit.x0_5}), 0, 0)`
    },
    borderLeftColor: colors.borderNeutralFaded,
    borderBottomLeftRadius: radius.xlarge,
    borderLeftStyle: 'solid',
    borderLeftWidth: stroke.border,
    borderTopLeftRadius: radius.xlarge,
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
    height: unit.x3,
    justifyContent: 'center',
    width: '100%',
    '::after': {
      height: unit.x1,
      width: `calc(${unit.x16} + ${unit.x8})`
    }
  },
  up: {
    alignItems: 'flex-start',
    height: unit.x3,
    justifyContent: 'center',
    order: 1,
    width: '100%',
    '::after': {
      height: unit.x1,
      width: `calc(${unit.x16} + ${unit.x8})`
    }
  },
  left: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-start',
    order: 1,
    width: unit.x3,
    '::after': {
      height: `calc(${unit.x16} + ${unit.x8})`,
      width: unit.x1
    }
  },
  right: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    width: unit.x3,
    '::after': {
      height: `calc(${unit.x16} + ${unit.x8})`,
      width: unit.x1
    }
  }
})
