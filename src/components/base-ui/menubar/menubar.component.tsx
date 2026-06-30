import './style.css'
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubmenu,
  DropdownMenuSubmenuTrigger,
  DropdownMenuTrigger
} from '../dropdown-menu'

function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return <MenubarPrimitive data-ui='menubar' {...props} />
}

const MenubarMenu = DropdownMenu

function MenubarTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuTrigger>) {
  return <DropdownMenuTrigger data-ui='menubar-trigger' {...props} />
}

function MenubarContent({
  align = 'start',
  side = 'top',
  alignOffset = 0,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function MenubarGroup({ ...props }: React.ComponentProps<typeof DropdownMenuGroup>) {
  return <DropdownMenuGroup {...props} />
}

function MenubarLabel({ ...props }: React.ComponentProps<typeof DropdownMenuGroupLabel>) {
  return <DropdownMenuGroupLabel {...props} />
}

function MenubarItem({ ...props }: React.ComponentProps<typeof DropdownMenuItem>) {
  return <DropdownMenuItem {...props} />
}

function MenubarSeparator({ ...props }: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return <DropdownMenuSeparator {...props} />
}

const MenubarSub = DropdownMenuSubmenu

function MenubarSubTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuSubmenuTrigger>) {
  return <DropdownMenuSubmenuTrigger {...props} />
}

function MenubarCheckboxItem({ ...props }: React.ComponentProps<typeof DropdownMenuCheckboxItem>) {
  return <DropdownMenuCheckboxItem {...props} />
}

function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
  return <DropdownMenuRadioGroup {...props} />
}

function MenubarRadioItem({ ...props }: React.ComponentProps<typeof DropdownMenuRadioItem>) {
  return <DropdownMenuRadioItem {...props} />
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarLabel,
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem
}
