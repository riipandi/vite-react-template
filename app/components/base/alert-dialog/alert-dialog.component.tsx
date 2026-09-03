import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Button, type ButtonProps } from '#/components/base/button'
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

export const AlertDialog = BaseAlertDialog.Root
export const AlertDialogTrigger = BaseAlertDialog.Trigger
export const AlertDialogPortal = BaseAlertDialog.Portal

export function AlertDialogOverlay({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Backdrop>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseAlertDialog.Backdrop {...props} {...stylex.props(styles.overlay, style)} />
}

export type AlertDialogSize = 'md' | 'sm'

export function AlertDialogContent({
  style,
  size = 'md',
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Popup>, 'className' | 'style'> &
  StyleXStyleProps & { size?: AlertDialogSize }) {
  return (
    <BaseAlertDialog.Portal>
      <AlertDialogOverlay />
      <BaseAlertDialog.Popup
        {...props}
        {...stylex.props(styles.content, sizes[size], ring({ shadow: shadow.lg }), style)}
      />
    </BaseAlertDialog.Portal>
  )
}

export function AlertDialogHeader({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(styles.header, style)} />
}

export function AlertDialogMedia({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(styles.media, style)} />
}

export function AlertDialogFooter({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(styles.footer, style)} />
}

export function AlertDialogTitle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Title>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseAlertDialog.Title {...props} {...stylex.props(styles.title, style)} />
}

export function AlertDialogDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Description>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseAlertDialog.Description {...props} {...stylex.props(styles.description, style)} />
}

// Action is a plain Button — wire your own onClick (and close
// via the dialog's open state) so destructive actions can await work first.
export function AlertDialogAction(props: ButtonProps) {
  return <Button {...props} />
}

export function AlertDialogCancel({
  variant = 'outline',
  size = 'md',
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Close>, 'className' | 'style'> &
  Pick<ButtonProps, 'variant' | 'size'> &
  StyleXStyleProps) {
  return (
    <BaseAlertDialog.Close
      render={<Button variant={variant} size={size} style={style} />}
      {...props}
    />
  )
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
    borderRadius: radius.xl,
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

const sizes = stylex.create({
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
