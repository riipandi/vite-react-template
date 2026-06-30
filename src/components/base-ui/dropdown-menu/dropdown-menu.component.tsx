import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import * as Lucide from 'lucide-react'
import '../../../styles/shared/menu-base.css'

function DropdownMenu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root {...props} />
}

function DropdownMenuTrigger(props: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot='dropdown-menu-trigger' {...props} />
}

function DropdownMenuContent({
  align = 'start',
  alignOffset = 0,
  side,
  sideOffset = 6,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
  return (
    <MenuPrimitive.Portal data-ui='dropdown-menu-portal'>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup data-ui='dropdown-menu-content' {...props} />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-ui='dropdown-menu-group' {...props} />
}

function DropdownMenuGroupLabel({ ...props }: MenuPrimitive.GroupLabel.Props) {
  return <MenuPrimitive.GroupLabel data-ui='dropdown-menu-group-label' {...props} />
}

function DropdownMenuItem({ ...props }: MenuPrimitive.Item.Props) {
  return <MenuPrimitive.Item data-ui='dropdown-menu-item' {...props} />
}

function DropdownMenuSeparator(props: MenuPrimitive.Separator.Props) {
  return <MenuPrimitive.Separator data-ui='dropdown-menu-separator' {...props} />
}

function DropdownMenuSubmenu(props: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot {...props} />
}

function DropdownMenuSubmenuTrigger({ children, ...props }: MenuPrimitive.SubmenuTrigger.Props) {
  return (
    <MenuPrimitive.SubmenuTrigger data-ui='dropdown-menu-submenu-trigger' {...props}>
      {children}
      <Lucide.ChevronDown size={16} />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuCheckboxItem({ children, ...props }: MenuPrimitive.CheckboxItem.Props) {
  return (
    <MenuPrimitive.CheckboxItem data-ui='dropdown-menu-checkbox-item' {...props}>
      <div>{children}</div>
      <MenuPrimitive.CheckboxItemIndicator>
        <span data-ui='dropdown-menu-checkbox-indicator' />
      </MenuPrimitive.CheckboxItemIndicator>
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-ui='dropdown-menu-radio-group' {...props} />
}

function DropdownMenuRadioItem(props: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem data-ui='dropdown-menu-radio-item' {...props}>
      <div>{props.children}</div>
      <MenuPrimitive.RadioItemIndicator>
        <span data-ui='dropdown-menu-radio-indicator' />
      </MenuPrimitive.RadioItemIndicator>
    </MenuPrimitive.RadioItem>
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSubmenu,
  DropdownMenuSubmenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
}
