import './style.css'
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog'
import * as Lucide from 'lucide-react'
import { Button } from '../button'
import { Separator } from '../separator'

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-ui='sheet' {...props} />
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />
}

function SheetClose({
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close> & {
  showCloseButton?: boolean
}) {
  if (!showCloseButton) return null

  return (
    <SheetPrimitive.Close
      data-slot='sheet-close'
      render={
        <Button variant='primary' mode='ghost' size='sm' asIcon>
          <Lucide.X size={16} />
        </Button>
      }
      {...props}
    />
  )
}

function SheetBackdrop({ ...props }: React.ComponentProps<typeof SheetPrimitive.Backdrop>) {
  return <SheetPrimitive.Backdrop data-ui='sheet-backdrop' {...props} />
}

function SheetPopup({
  children,
  side = 'right',
  variant = 'default',
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Popup> & {
  side?: 'right' | 'left' | 'top' | 'bottom'
  variant?: 'default' | 'inset'
  showCloseButton?: boolean
}) {
  return (
    <SheetPrimitive.Portal data-ui='sheet-portal'>
      <SheetBackdrop />
      <SheetPrimitive.Popup
        data-ui='sheet-popup'
        data-side={side}
        data-variant={variant}
        {...props}
      >
        {children}
        {showCloseButton && <SheetClose />}
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
  )
}

function SheetHeader({ children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-ui='sheet-header' {...props}>
      {children}
      <Separator orientation='horizontal' />
    </div>
  )
}

function SheetFooter({
  children,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & {
  variant?: 'default' | 'bare'
}) {
  return (
    <div data-ui='sheet-footer' data-variant={variant} {...props}>
      {variant === 'default' && <Separator orientation='horizontal' />}
      <div data-ui='sheet-footer-children'>{children}</div>
    </div>
  )
}

function SheetTitle({ ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title data-ui='sheet-title' {...props} />
}

function SheetDescription({ ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return <SheetPrimitive.Description data-ui='sheet-description' {...props} />
}

function SheetPanel({ ...props }: React.ComponentProps<'div'>) {
  return <div data-ui='sheet-panel' {...props} />
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetBackdrop,
  SheetBackdrop as SheetOverlay,
  SheetPopup,
  SheetPopup as SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetPanel
}
