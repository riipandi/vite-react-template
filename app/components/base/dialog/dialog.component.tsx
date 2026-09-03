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
import { ring } from '#/lib/stylex-utils'
import { colors, font, radius, shadow } from '#/lib/tokens.stylex'

interface StyleXStyleProps {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

export const Dialog = BaseDialog.Root
export const DialogTrigger = BaseDialog.Trigger
export const DialogPortal = BaseDialog.Portal
export const DialogClose = BaseDialog.Close

export function DialogOverlay({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseDialog.Backdrop {...props} {...stylex.props(styles.overlay, style)} />
}

export function DialogContent({
  style,
  children,
  showCloseButton = true,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>, 'className' | 'style'> &
  StyleXStyleProps & { showCloseButton?: boolean }) {
  return (
    <BaseDialog.Portal>
      <DialogOverlay />
      <BaseDialog.Popup
        {...props}
        {...stylex.props(styles.content, ring({ shadow: shadow.lg }), style)}
      >
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

export function DialogHeader({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(styles.header, style)} />
}

export function DialogFooter({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(styles.footer, style)} />
}

export function DialogTitle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Title>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseDialog.Title {...props} {...stylex.props(styles.title, style)} />
}

export function DialogDescription({
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
    borderRadius: radius.lg,
    color: colors.popoverForeground,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: font.sans,
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
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
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
