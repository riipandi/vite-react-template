import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  space,
  fontSize,
  lineHeight,
  fontWeight,
  z,
  duration,
  easing,
  stroke,
  container
} from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

interface StyleProp {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

export type DrawerSwipeDirection = 'up' | 'right' | 'down' | 'left'

interface DrawerContextValue {
  modal: boolean
  showSwipeHandle: boolean
  swipeDirection: DrawerSwipeDirection
}

const DrawerContext = React.createContext<DrawerContextValue>({
  modal: true,
  showSwipeHandle: false,
  swipeDirection: 'down'
})

export function Drawer({
  modal = true,
  showSwipeHandle = false,
  swipeDirection = 'down',
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseDrawer.Root> & {
  showSwipeHandle?: boolean
}) {
  const contextValue = React.useMemo(
    () => ({ modal: modal === true, showSwipeHandle, swipeDirection }),
    [modal, showSwipeHandle, swipeDirection]
  )
  return (
    <DrawerContext.Provider value={contextValue}>
      <BaseDrawer.Root modal={modal} swipeDirection={swipeDirection} {...props} />
    </DrawerContext.Provider>
  )
}

export const DrawerTrigger = BaseDrawer.Trigger
export const DrawerClose = BaseDrawer.Close
export const DrawerPortal = BaseDrawer.Portal

export function DrawerOverlay({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Backdrop>, 'className' | 'style'> &
  StyleProp) {
  return <BaseDrawer.Backdrop {...props} {...stylex.props(styles.overlay, style)} />
}

export function DrawerContent({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Popup>, 'className' | 'style'> &
  StyleProp) {
  const { modal, showSwipeHandle, swipeDirection } = React.useContext(DrawerContext)
  return (
    <BaseDrawer.Portal>
      {modal && <DrawerOverlay />}
      <BaseDrawer.Viewport {...stylex.props(styles.viewport, modal && styles.viewportModal)}>
        <BaseDrawer.Popup
          {...props}
          {...stylex.props(styles.popup, directions[swipeDirection], style)}
        >
          {showSwipeHandle && <DrawerSwipeHandle />}
          <BaseDrawer.Content {...stylex.props(styles.content)}>{children}</BaseDrawer.Content>
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  )
}

export function DrawerSwipeHandle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  const { swipeDirection } = React.useContext(DrawerContext)
  return (
    <div
      aria-hidden
      {...props}
      {...stylex.props(styles.swipeHandle, swipeHandles[swipeDirection], style)}
    />
  )
}

export function DrawerHeader({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  const { swipeDirection } = React.useContext(DrawerContext)
  const vertical = swipeDirection === 'up' || swipeDirection === 'down'
  return (
    <div {...props} {...stylex.props(styles.header, vertical && styles.headerCentered, style)} />
  )
}

export function DrawerFooter({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return <div {...props} {...stylex.props(styles.footer, style)} />
}

export function DrawerTitle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Title>, 'className' | 'style'> &
  StyleProp) {
  return <BaseDrawer.Title {...props} {...stylex.props(styles.title, style)} />
}

export function DrawerDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDrawer.Description>, 'className' | 'style'> &
  StyleProp) {
  return <BaseDrawer.Description {...props} {...stylex.props(styles.description, style)} />
}

const styles = stylex.create({
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
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.normal,
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

const directions = stylex.create({
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

const swipeHandles = stylex.create({
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
