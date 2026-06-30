import './style.css'
import '../../../styles/shared/dialog-base.css'
import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '../button'

function AlertDialog(props: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root {...props} />
}

function AlertDialogTrigger(props: AlertDialogPrimitive.Trigger.Props) {
  return <AlertDialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />
}

function AlertDialogPortal(props: AlertDialogPrimitive.Portal.Props) {
  return <AlertDialogPrimitive.Portal data-slot='dialog-portal' {...props} />
}

function AlertDialogClose(props: AlertDialogPrimitive.Close.Props) {
  return <AlertDialogPrimitive.Close data-slot='dialog-close' {...props} />
}

function AlertDialogOverlay(props: AlertDialogPrimitive.Backdrop.Props) {
  return <AlertDialogPrimitive.Backdrop data-slot='alert-dialog-overlay' {...props} />
}

function AlertDialogContent({
  children,
  showCloseButton = true,
  ...props
}: AlertDialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <AlertDialogPortal data-ui='alert-dialog-portal'>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup data-ui='alert-dialog-content' {...props}>
        {children}

        {showCloseButton && (
          <AlertDialogPrimitive.Close
            data-slot='dialog-close-icon'
            render={
              <Button variant='neutral' mode='ghost' size='sm' asIcon>
                <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
              </Button>
            }
          />
        )}
      </AlertDialogPrimitive.Popup>
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({ ...props }: React.ComponentProps<'div'>) {
  return <div data-ui='dialog-header' {...props} />
}

function AlertDialogFooter({
  showCloseButton = true,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  showCloseButton?: boolean
}) {
  return (
    <div data-ui='dialog-footer' {...props}>
      <div>
        {showCloseButton && (
          <AlertDialogPrimitive.Close render={<Button variant='neutral' mode='stroke' />}>
            Cancel
          </AlertDialogPrimitive.Close>
        )}
        {children}
      </div>
    </div>
  )
}

function AlertDialogTitle({ ...props }: AlertDialogPrimitive.Title.Props) {
  return <AlertDialogPrimitive.Title data-ui='dialog-title' {...props} />
}

function AlertDialogDescription({ ...props }: AlertDialogPrimitive.Description.Props) {
  return <AlertDialogPrimitive.Description data-ui='dialog-description' {...props} />
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogClose,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription
}
