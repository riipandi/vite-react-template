import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import * as Lucide from 'lucide-react'
import '../../../styles/shared/menu-base.css'

function Menu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root {...props} />
}

function MenuTrigger(props: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot='menu-trigger' {...props} />
}

function MenuContent({
  align = 'start',
  alignOffset = 0,
  side,
  sideOffset = 6,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
  return (
    <MenuPrimitive.Portal data-ui='menu-portal'>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup data-ui='menu-content' {...props} />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function MenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-ui='menu-group' {...props} />
}

function MenuGroupLabel({ ...props }: MenuPrimitive.GroupLabel.Props) {
  return <MenuPrimitive.GroupLabel data-ui='menu-group-label' {...props} />
}

function MenuItem({ ...props }: MenuPrimitive.Item.Props) {
  return <MenuPrimitive.Item data-ui='menu-item' {...props} />
}

function MenuSeparator(props: MenuPrimitive.Separator.Props) {
  return <MenuPrimitive.Separator data-ui='menu-separator' {...props} />
}

function MenuSubmenu(props: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot {...props} />
}

function MenuSubmenuTrigger({ children, ...props }: MenuPrimitive.SubmenuTrigger.Props) {
  return (
    <MenuPrimitive.SubmenuTrigger data-ui='menu-submenu-trigger' {...props}>
      {children}
      <Lucide.ChevronDown size={16} />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function MenuCheckboxItem({ children, ...props }: MenuPrimitive.CheckboxItem.Props) {
  return (
    <MenuPrimitive.CheckboxItem data-ui='menu-checkbox-item' {...props}>
      <div>{children}</div>
      <MenuPrimitive.CheckboxItemIndicator>
        <span data-ui='menu-checkbox-indicator' />
      </MenuPrimitive.CheckboxItemIndicator>
    </MenuPrimitive.CheckboxItem>
  )
}

function MenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-ui='menu-radio-group' {...props} />
}

function MenuRadioItem(props: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem data-ui='menu-radio-item' {...props}>
      <div>{props.children}</div>
      <MenuPrimitive.RadioItemIndicator>
        <span data-ui='menu-radio-indicator' />
      </MenuPrimitive.RadioItemIndicator>
    </MenuPrimitive.RadioItem>
  )
}

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem
}
