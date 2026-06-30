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
import type { StyleXStyles } from '@stylexjs/stylex'
// import { buttonStyles } from '../button'

export type AlertDialogRootProps = React.ComponentProps<typeof BaseAlertDialog.Root> & {
  xstyle?: StyleXStyles
}
export type AlertDialogTriggerProps = React.ComponentProps<typeof BaseAlertDialog.Trigger> & {
  xstyle?: StyleXStyles
}
export type AlertDialogPopupProps = React.ComponentProps<typeof BaseAlertDialog.Popup> & {
  xstyle?: StyleXStyles
}
export type AlertDialogHeaderProps = React.ComponentProps<'header'> & {
  xstyle?: StyleXStyles
}
export type AlertDialogTitleProps = React.ComponentProps<typeof BaseAlertDialog.Title> & {
  xstyle?: StyleXStyles
}
export type AlertDialogBodyProps = React.ComponentProps<'div'> & {
  xstyle?: StyleXStyles
}
export type AlertDialogDescriptionProps = React.ComponentProps<
  typeof BaseAlertDialog.Description
> & {
  xstyle?: StyleXStyles
}
export type AlertDialogFooterProps = React.ComponentProps<'footer'> & {
  xstyle?: StyleXStyles
}
export type AlertDialogCloseProps = React.ComponentProps<typeof BaseAlertDialog.Close> & {
  xstyle?: StyleXStyles
}

export function AlertDialog({ ...props }: AlertDialogRootProps) {
  return <BaseAlertDialog.Root data-slot='alert-dialog' {...props} />
}

export function AlertDialogTrigger({ children, ...props }: AlertDialogTriggerProps) {
  return (
    <BaseAlertDialog.Trigger data-slot='alert-dialog-trigger' {...props}>
      {children}
    </BaseAlertDialog.Trigger>
  )
}

export function AlertDialogPopup({ children, ...props }: AlertDialogPopupProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop />
      <BaseAlertDialog.Popup data-slot='alert-dialog-popup' {...props}>
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  )
}

export function AlertDialogHeader({ children, ...props }: AlertDialogHeaderProps) {
  return (
    <header data-slot='alert-dialog-header' {...props}>
      {children}
    </header>
  )
}

export function AlertDialogTitle({ children, ...props }: AlertDialogTitleProps) {
  return (
    <BaseAlertDialog.Title data-slot='alert-dialog-title' {...props}>
      {children}
    </BaseAlertDialog.Title>
  )
}

export function AlertDialogBody({ children, ...props }: AlertDialogBodyProps) {
  return (
    <div data-slot='alert-dialog-body' {...props}>
      {children}
    </div>
  )
}

export function AlertDialogDescription({ children, ...props }: AlertDialogDescriptionProps) {
  return (
    <BaseAlertDialog.Description data-slot='alert-dialog-description' {...props}>
      {children}
    </BaseAlertDialog.Description>
  )
}

export function AlertDialogFooter({ children, ...props }: AlertDialogFooterProps) {
  return (
    <footer data-slot='alert-dialog-footer' {...props}>
      {children}
    </footer>
  )
}

export function AlertDialogClose({ render, children, ...props }: AlertDialogCloseProps) {
  return (
    <BaseAlertDialog.Close render={render} data-slot='alert-dialog-close' {...props}>
      {children}
    </BaseAlertDialog.Close>
  )
}
