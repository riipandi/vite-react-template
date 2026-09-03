/**
 * A dialog that requires a user response to proceed.
 *
 * @see: https://base-ui.com/react/components/alert-dialog
 *
 * BaseUI Anatomy:
 * <AlertDialog.Root>
 *   <AlertDialog.Trigger />
 *   <AlertDialog.Portal>
 *     <AlertDialog.Backdrop />
 *     <AlertDialog.Viewport>
 *       <AlertDialog.Popup>
 *         <AlertDialog.Title />
 *         <AlertDialog.Description />
 *         <AlertDialog.Close />
 *       </AlertDialog.Popup>
 *     </AlertDialog.Viewport>
 *   </AlertDialog.Portal>
 * </AlertDialog.Root>
 */

import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Button, type ButtonProps } from '#/components/base/button'
import { ring } from '#/lib/stylex-utils'
import { shadow } from '#/lib/tokens.stylex'
import { alertDialogStyles as s, alertDialogSizes as sizes } from './alert-dialog.stylex'

interface StyleXStyleProps {
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
  return <BaseAlertDialog.Backdrop {...props} {...stylex.props(s.overlay, style)} />
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
        {...stylex.props(s.content, sizes[size], ring({ shadow: shadow.lg }), style)}
      />
    </BaseAlertDialog.Portal>
  )
}

export function AlertDialogHeader({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(s.header, style)} />
}

export function AlertDialogMedia({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(s.media, style)} />
}

export function AlertDialogFooter({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleXStyleProps) {
  return <div {...props} {...stylex.props(s.footer, style)} />
}

export function AlertDialogTitle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Title>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseAlertDialog.Title {...props} {...stylex.props(s.title, style)} />
}

export function AlertDialogDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Description>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseAlertDialog.Description {...props} {...stylex.props(s.description, style)} />
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
