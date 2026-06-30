import '../../../styles/shared/dialog-base.css'
import './style.css'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '../button'

function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot='dialog-close' {...props} />
}

function DialogOverlay({ ...props }: DialogPrimitive.Backdrop.Props) {
  return <DialogPrimitive.Backdrop data-slot='dialog-overlay' {...props} />
}

function DialogContent({
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup data-ui='dialog-content' {...props}>
        {children}

        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot='dialog-close-icon'
            render={
              <Button variant='neutral' mode='ghost' size='sm' asIcon>
                <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
              </Button>
            }
          />
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ ...props }: React.ComponentProps<'div'>) {
  return <div data-ui='dialog-header' {...props} />
}

function DialogFooter({
  showCloseButton = true,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  showCloseButton?: boolean
}) {
  return (
    <div data-ui='dialog-footer' {...props}>
      <div>
        {children}

        {showCloseButton && (
          <DialogPrimitive.Close render={<Button variant='neutral' mode='stroke' />}>
            Close
          </DialogPrimitive.Close>
        )}
      </div>
    </div>
  )
}

function DialogTitle({ ...props }: DialogPrimitive.Title.Props) {
  return <DialogPrimitive.Title data-ui='dialog-title' {...props} />
}

function DialogDescription({ ...props }: DialogPrimitive.Description.Props) {
  return <DialogPrimitive.Description data-ui='dialog-description' {...props} />
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
}
