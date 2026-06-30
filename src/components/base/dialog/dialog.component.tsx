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
import { cx } from 'css-variants'
import { buttonStyles } from '../button'

export const dialogStyles = tv({
  base: '',
  slots: {
    backdrop: [
      'fixed inset-0 min-h-dvh bg-black/70 backdrop-blur-sm transition-[color,opacity]',
      'data-ending-style:opacity-0 data-starting-style:opacity-0'
    ],
    popup: [
      'fixed left-1/2 -translate-x-1/2 -translate-y-1/2',
      'top-[calc(50%+1.25rem*var(--nested-dialogs))]',
      'bg-background-elevation-overlay text-foreground-neutral backdrop-blur-sm',
      'ring-border-neutral shadow-overlay rounded-lg ring',
      'scale-[calc(1-0.1*var(--nested-dialogs))]',
      'w-md max-w-[calc(100%-2rem)] transition-all outline-none',
      'data-nested-dialog-open:after:absolute',
      'data-nested-dialog-open:after:inset-0',
      'data-nested-dialog-open:after:rounded-lg',
      'data-nested-dialog-open:after:bg-black/20',
      'data-nested-dialog-open:after:z-10',
      'data-ending-style:opacity-0 data-starting-style:opacity-0',
      'data-ending-style:scale-90 data-starting-style:scale-90'
    ],
    header: 'flex items-center gap-2 px-5 pt-4',
    title: 'text-lg font-semibold',
    body: 'space-y-2 px-5 py-4',
    description: 'text-foreground-neutral-faded text-sm leading-relaxed',
    footer: [
      'flex items-center justify-end gap-2',
      'bg-background-elevation-raised border-border-neutral rounded-b-lg border-t px-4 py-3'
    ]
  }
})

export type DialogRootProps = React.ComponentProps<typeof BaseDialog.Root>
export type DialogTriggerProps = React.ComponentProps<typeof BaseDialog.Trigger>
export type DialogPopupProps = React.ComponentProps<typeof BaseDialog.Popup>
export type DialogHeaderProps = React.ComponentProps<'header'>
export type DialogTitleProps = React.ComponentProps<typeof BaseDialog.Title>
export type DialogBodyProps = React.ComponentProps<'div'>
export type DialogDescriptionProps = React.ComponentProps<typeof BaseDialog.Description>
export type DialogFooterProps = React.ComponentProps<'footer'>
export type DialogCloseProps = BaseDialog.Close.Props

export function Dialog({ ...props }: DialogRootProps) {
  return <BaseDialog.Root data-slot='dialog' {...props} />
}

export function DialogTrigger({ children, ...props }: DialogTriggerProps) {
  return (
    <BaseDialog.Trigger data-slot='dialog-trigger' {...props}>
      {children}
    </BaseDialog.Trigger>
  )
}

export function DialogPopup({ className, children, ...props }: DialogPopupProps) {
  const styles = dialogStyles()
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={styles.backdrop()} />
      <BaseDialog.Popup
        data-slot='dialog-popup'
        className={cx(styles.popup(), className)}
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

export function DialogHeader({ className, children, ...props }: DialogHeaderProps) {
  const styles = dialogStyles()
  return (
    <header data-slot='dialog-header' {...props} className={styles.header({ className })}>
      {children}
    </header>
  )
}

export function DialogTitle({ className, children, ...props }: DialogTitleProps) {
  const styles = dialogStyles()
  return (
    <BaseDialog.Title data-slot='dialog-title' {...props} className={cx(styles.title(), className)}>
      {children}
    </BaseDialog.Title>
  )
}

export function DialogBody({ className, children, ...props }: DialogBodyProps) {
  const styles = dialogStyles()
  return (
    <div data-slot='dialog-body' {...props} className={styles.body({ className })}>
      {children}
    </div>
  )
}

export function DialogDescription({ className, children, ...props }: DialogDescriptionProps) {
  const styles = dialogStyles()
  return (
    <BaseDialog.Description
      data-slot='dialog-description'
      {...props}
      className={cx(styles.description(), className)}
    >
      {children}
    </BaseDialog.Description>
  )
}

export function DialogFooter({ className, children, ...props }: DialogFooterProps) {
  const styles = dialogStyles()
  return (
    <footer data-slot='dialog-footer' {...props} className={styles.footer({ className })}>
      {children}
    </footer>
  )
}

export function DialogClose({ className, children, render, ...props }: DialogCloseProps) {
  const styles = buttonStyles({ variant: 'ghost', color: 'neutral' })
  return (
    <BaseDialog.Close
      data-slot='dialog-close'
      render={render}
      {...props}
      className={cx(!render && styles, className)}
    >
      {children}
    </BaseDialog.Close>
  )
}
