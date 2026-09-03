import { Dialog as BaseDialog } from '@base-ui/react/dialog'
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
import { colors, font, shadow, radius } from '#/lib/tokens.stylex'

interface StyleXStyleProps {
  style?: stylex.StyleXStyles
}

export type SheetSide = 'top' | 'right' | 'bottom' | 'left'

export const Sheet = BaseDialog.Root
export const SheetTrigger = BaseDialog.Trigger
export const SheetClose = BaseDialog.Close
export const SheetPortal = BaseDialog.Portal

export function SheetOverlay({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseDialog.Backdrop {...props} {...stylex.props(styles.overlay, style)} />
}

export function SheetContent({
  style,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>, 'className' | 'style'> &
  StyleXStyleProps & { side?: SheetSide; showCloseButton?: boolean }) {
  return (
    <BaseDialog.Portal>
      <SheetOverlay />
      <BaseDialog.Popup {...props} {...stylex.props(styles.content, sides[side], style)}>
        {children}
        {showCloseButton && (
          <BaseDialog.Close aria-label='Close' {...stylex.props(styles.close)}>
            <svg
              width='16'
              height='16'
              viewBox={`0 0 16 16`}
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              aria-hidden
            >
              <path d={`m3 3 10 10M13 3 3 13`} />
            </svg>
          </BaseDialog.Close>
        )}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

export function SheetHeader({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(styles.header, style)} />
}

export function SheetFooter({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(styles.footer, style)} />
}

export function SheetTitle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Title>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseDialog.Title {...props} {...stylex.props(styles.title, style)} />
}

export function SheetDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Description>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseDialog.Description {...props} {...stylex.props(styles.description, style)} />
}

const styles = stylex.create({
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

const sides = stylex.create({
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
