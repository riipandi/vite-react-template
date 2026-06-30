import './style.css'
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer'
import * as Lucide from 'lucide-react'
import { Button } from '../button'
import { Separator } from '../separator'

function Drawer({ ...props }: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-ui='drawer' {...props} />
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger {...props} />
}

function DrawerContent({ children, ...props }: DrawerPrimitive.Content.Props) {
  return (
    <DrawerPrimitive.Portal data-ui='drawer-portal'>
      <DrawerPrimitive.Backdrop data-ui='drawer-backdrop' />
      <DrawerPrimitive.Viewport>
        <DrawerPrimitive.Popup data-ui='drawer-popup'>
          <DrawerPrimitive.Content data-ui='drawer-content' {...props}>
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  )
}

function DrawerHandle({ ...props }: React.ComponentProps<'div'>) {
  return <div data-ui='drawer-handle' {...props} />
}

function DrawerHeader({ children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-ui='drawer-header' {...props}>
      {children}
      <Separator orientation='horizontal' />
    </div>
  )
}

function DrawerFooter({ children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-ui='drawer-footer' {...props}>
      <Separator orientation='horizontal' />
      <div data-ui='drawer-footer-children'>{children}</div>
    </div>
  )
}

function DrawerTitle({ ...props }: DrawerPrimitive.Title.Props) {
  return <DrawerPrimitive.Title data-ui='drawer-title' {...props} />
}

function DrawerDescription({ ...props }: DrawerPrimitive.Description.Props) {
  return <DrawerPrimitive.Description data-ui='drawer-description' {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return (
    <DrawerPrimitive.Close
      data-slot='drawer-close'
      render={
        <Button variant='primary' mode='ghost' size='md' asIcon>
          <Lucide.X size={16} />
        </Button>
      }
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
}
