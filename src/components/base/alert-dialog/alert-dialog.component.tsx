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
import * as stylex from '@stylexjs/stylex'
import { buttonColors, buttonStyles, buttonVariants } from '../button'
import { alertDialogStyles } from './alert-dialog.stylex'

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

export function AlertDialog({ xstyle, ...props }: AlertDialogRootProps) {
  return (
    <BaseAlertDialog.Root
      data-slot='alert-dialog'
      {...stylex.props(alertDialogStyles.root, xstyle)}
      {...props}
    />
  )
}

export function AlertDialogTrigger({ children, xstyle, ...props }: AlertDialogTriggerProps) {
  return (
    <BaseAlertDialog.Trigger
      data-slot='alert-dialog-trigger'
      {...stylex.props(alertDialogStyles.trigger, xstyle)}
      {...props}
    >
      {children}
    </BaseAlertDialog.Trigger>
  )
}

export function AlertDialogPopup({ children, xstyle, ...props }: AlertDialogPopupProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop
        data-slot='alert-dialog-backdrop'
        {...stylex.props(alertDialogStyles.backdrop)}
      />
      <BaseAlertDialog.Popup
        data-slot='alert-dialog-popup'
        {...stylex.props(alertDialogStyles.popup, xstyle)}
        {...props}
      >
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  )
}

export function AlertDialogHeader({ children, xstyle, ...props }: AlertDialogHeaderProps) {
  return (
    <header
      data-slot='alert-dialog-header'
      {...stylex.props(alertDialogStyles.header, xstyle)}
      {...props}
    >
      {children}
    </header>
  )
}

export function AlertDialogTitle({ children, xstyle, ...props }: AlertDialogTitleProps) {
  return (
    <BaseAlertDialog.Title
      data-slot='alert-dialog-title'
      {...stylex.props(alertDialogStyles.title, xstyle)}
      {...props}
    >
      {children}
    </BaseAlertDialog.Title>
  )
}

export function AlertDialogBody({ children, xstyle, ...props }: AlertDialogBodyProps) {
  return (
    <div data-slot='alert-dialog-body' {...stylex.props(alertDialogStyles.body, xstyle)} {...props}>
      {children}
    </div>
  )
}

export function AlertDialogDescription({
  children,
  xstyle,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <BaseAlertDialog.Description
      data-slot='alert-dialog-description'
      {...stylex.props(alertDialogStyles.description, xstyle)}
      {...props}
    >
      {children}
    </BaseAlertDialog.Description>
  )
}

export function AlertDialogFooter({ children, xstyle, ...props }: AlertDialogFooterProps) {
  return (
    <footer
      data-slot='alert-dialog-footer'
      {...stylex.props(alertDialogStyles.footer, xstyle)}
      {...props}
    >
      {children}
    </footer>
  )
}

export function AlertDialogClose({ children, render, xstyle, ...props }: AlertDialogCloseProps) {
  return (
    <BaseAlertDialog.Close
      render={render}
      data-slot='alert-dialog-close'
      {...stylex.props(buttonStyles.base, buttonVariants.ghost, buttonColors.neutral, xstyle)}
      {...props}
    >
      {children}
    </BaseAlertDialog.Close>
  )
}
