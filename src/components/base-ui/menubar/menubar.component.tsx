import './style.css'
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar'
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger
} from '../menu'

function Menubar({ ...props }: MenubarPrimitive.Props) {
  return <MenubarPrimitive data-ui='menubar' {...props} />
}

const MenubarMenu = Menu

function MenubarTrigger({ ...props }: React.ComponentProps<typeof MenuTrigger>) {
  return <MenuTrigger data-ui='menubar-trigger' {...props} />
}

function MenubarContent({
  align = 'start',
  side = 'top',
  alignOffset = 0,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenuContent>) {
  return (
    <MenuContent
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      side={side}
      {...props}
    />
  )
}

function MenubarGroup({ ...props }: React.ComponentProps<typeof MenuGroup>) {
  return <MenuGroup {...props} />
}

function MenubarLabel({ ...props }: React.ComponentProps<typeof MenuGroupLabel>) {
  return <MenuGroupLabel {...props} />
}

function MenubarItem({ ...props }: React.ComponentProps<typeof MenuItem>) {
  return <MenuItem {...props} />
}

function MenubarSeparator({ ...props }: React.ComponentProps<typeof MenuSeparator>) {
  return <MenuSeparator {...props} />
}

const MenubarSub = MenuSubmenu

function MenubarSubTrigger({ ...props }: React.ComponentProps<typeof MenuSubmenuTrigger>) {
  return <MenuSubmenuTrigger {...props} />
}

function MenubarCheckboxItem({ ...props }: React.ComponentProps<typeof MenuCheckboxItem>) {
  return <MenuCheckboxItem {...props} />
}

function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof MenuRadioGroup>) {
  return <MenuRadioGroup {...props} />
}

function MenubarRadioItem({ ...props }: React.ComponentProps<typeof MenuRadioItem>) {
  return <MenuRadioItem {...props} />
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
