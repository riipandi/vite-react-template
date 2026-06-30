/**
 * A popup that opens on top of the entire page.
 *
 * @see: https://base-ui.com/react/components/dialog
 *
 * BaseUI Anatomy:
 * <Dialog.Root>
 *   <Dialog.Trigger />
 *   <Dialog.Portal>
 *     <Dialog.Backdrop />
 *     <Dialog.Viewport>
 *       <Dialog.Popup>
 *         <Dialog.Title />
 *         <Dialog.Description />
 *         <Dialog.Close />
 *       </Dialog.Popup>
 *     </Dialog.Viewport>
 *   </Dialog.Portal>
 * </Dialog.Root>
 */

import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { buttonColors, buttonStyles, buttonVariants } from '../button'
import { dialogStyles } from './dialog.stylex'

export type DialogRootProps = React.ComponentProps<typeof BaseDialog.Root> & {
  xstyle?: StyleXStyles
}
export type DialogTriggerProps = React.ComponentProps<typeof BaseDialog.Trigger> & {
  xstyle?: StyleXStyles
}
export type DialogPopupProps = React.ComponentProps<typeof BaseDialog.Popup> & {
  xstyle?: StyleXStyles
}
export type DialogHeaderProps = React.ComponentProps<'header'> & {
  xstyle?: StyleXStyles
}
export type DialogTitleProps = React.ComponentProps<typeof BaseDialog.Title> & {
  xstyle?: StyleXStyles
}
export type DialogBodyProps = React.ComponentProps<'div'> & {
  xstyle?: StyleXStyles
}
export type DialogDescriptionProps = React.ComponentProps<typeof BaseDialog.Description> & {
  xstyle?: StyleXStyles
}
export type DialogFooterProps = React.ComponentProps<'footer'> & {
  xstyle?: StyleXStyles
}
export type DialogCloseProps = BaseDialog.Close.Props & {
  xstyle?: StyleXStyles
}

export function Dialog({ xstyle, ...props }: DialogRootProps) {
  return (
    <BaseDialog.Root data-slot='dialog' {...stylex.props(dialogStyles.root, xstyle)} {...props} />
  )
}

export function DialogTrigger({ children, xstyle, ...props }: DialogTriggerProps) {
  return (
    <BaseDialog.Trigger
      data-slot='dialog-trigger'
      {...stylex.props(dialogStyles.trigger, xstyle)}
      {...props}
    >
      {children}
    </BaseDialog.Trigger>
  )
}

export function DialogPopup({ children, xstyle, ...props }: DialogPopupProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop data-slot='dialog-backdrop' {...stylex.props(dialogStyles.backdrop)} />
      <BaseDialog.Popup
        data-slot='dialog-popup'
        {...stylex.props(dialogStyles.popup, xstyle)}
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

export function DialogHeader({ children, xstyle, ...props }: DialogHeaderProps) {
  return (
    <header data-slot='dialog-header' {...stylex.props(dialogStyles.header, xstyle)} {...props}>
      {children}
    </header>
  )
}

export function DialogTitle({ children, xstyle, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      data-slot='dialog-title'
      {...stylex.props(dialogStyles.title, xstyle)}
      {...props}
    >
      {children}
    </BaseDialog.Title>
  )
}

export function DialogBody({ children, xstyle, ...props }: DialogBodyProps) {
  return (
    <div data-slot='dialog-body' {...stylex.props(dialogStyles.body, xstyle)} {...props}>
      {children}
    </div>
  )
}

export function DialogDescription({ children, xstyle, ...props }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      data-slot='dialog-description'
      {...stylex.props(dialogStyles.description, xstyle)}
      {...props}
    >
      {children}
    </BaseDialog.Description>
  )
}

export function DialogFooter({ children, xstyle, ...props }: DialogFooterProps) {
  return (
    <footer data-slot='dialog-footer' {...stylex.props(dialogStyles.footer, xstyle)} {...props}>
      {children}
    </footer>
  )
}

export function DialogClose({ children, render, xstyle, ...props }: DialogCloseProps) {
  return (
    <BaseDialog.Close
      render={render}
      data-slot='dialog-close'
      {...stylex.props(buttonStyles.base, buttonVariants.ghost, buttonColors.neutral, xstyle)}
      {...props}
    >
      {children}
    </BaseDialog.Close>
  )
}
