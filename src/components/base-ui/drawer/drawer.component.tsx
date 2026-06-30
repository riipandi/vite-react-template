import './style.css'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Drawer as DrawerPrimitive } from 'vaul-base'
import { Button } from '../button'
import { Separator } from '../separator'

function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-ui='drawer' {...props} />
}

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger {...props} />
}

function DrawerContent({
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPrimitive.Portal data-ui='drawer-portal'>
      <DrawerPrimitive.Overlay data-ui='drawer-overlay' />
      <DrawerPrimitive.Content data-ui='drawer-content' {...props}>
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  )
}

function DrawerHandle({ ...props }: React.ComponentProps<'div'>) {
  return <DrawerPrimitive.Handle data-ui='drawer-handle' {...props} />
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

function DrawerTitle({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return <DrawerPrimitive.Title data-ui='drawer-title' {...props} />
}

function DrawerDescription({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return <DrawerPrimitive.Description data-ui='drawer-description' {...props} />
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return (
    <DrawerPrimitive.Close
      data-slot='drawer-close'
      render={
        <Button variant='primary' mode='ghost' size='md' asIcon>
          <HugeiconsIcon icon={Cancel01Icon} />
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
