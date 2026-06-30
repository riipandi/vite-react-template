import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu'
import { ArrowDown } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import '../../../styles/shared/menu-base.css'

function ContextMenu(props: ContextMenuPrimitive.Root.Props) {
  return <ContextMenuPrimitive.Root {...props} />
}

function ContextMenuTrigger(props: ContextMenuPrimitive.Trigger.Props) {
  return <ContextMenuPrimitive.Trigger {...props} />
}

function ContextMenuContent({
  align = 'start',
  alignOffset = 0,
  side,
  sideOffset = 6,
  ...props
}: ContextMenuPrimitive.Popup.Props &
  Pick<ContextMenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
  return (
    <ContextMenuPrimitive.Portal data-ui='context-menu-portal'>
      <ContextMenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <ContextMenuPrimitive.Popup data-ui='context-menu-content' {...props} />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuGroup({ ...props }: ContextMenuPrimitive.Group.Props) {
  return <ContextMenuPrimitive.Group data-ui='context-menu-group' {...props} />
}

function ContextMenuGroupLabel({ ...props }: ContextMenuPrimitive.GroupLabel.Props) {
  return <ContextMenuPrimitive.GroupLabel data-ui='context-menu-group-label' {...props} />
}

function ContextMenuItem({ ...props }: ContextMenuPrimitive.Item.Props) {
  return <ContextMenuPrimitive.Item data-ui='context-menu-item' {...props} />
}

function ContextMenuSeparator(props: ContextMenuPrimitive.Separator.Props) {
  return <ContextMenuPrimitive.Separator data-ui='context-menu-separator' {...props} />
}

function ContextMenuSubmenu(props: ContextMenuPrimitive.SubmenuRoot.Props) {
  return <ContextMenuPrimitive.SubmenuRoot {...props} />
}

function ContextMenuSubmenuTrigger({
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger data-ui='context-menu-submenu-trigger' {...props}>
      {children}
      <HugeiconsIcon icon={ArrowDown} />
    </ContextMenuPrimitive.SubmenuTrigger>
  )
}

function ContextMenuCheckboxItem({ children, ...props }: ContextMenuPrimitive.CheckboxItem.Props) {
  return (
    <ContextMenuPrimitive.CheckboxItem data-ui='context-menu-checkbox-item' {...props}>
      <div>{children}</div>
      <ContextMenuPrimitive.CheckboxItemIndicator>
        <span data-ui='context-menu-checkbox-indicator' />
      </ContextMenuPrimitive.CheckboxItemIndicator>
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioGroup(props: ContextMenuPrimitive.RadioGroup.Props) {
  return <ContextMenuPrimitive.RadioGroup data-ui='context-menu-radio-group' {...props} />
}

function ContextMenuRadioItem(props: ContextMenuPrimitive.RadioItem.Props) {
  return (
    <ContextMenuPrimitive.RadioItem data-ui='context-menu-radio-item' {...props}>
      <div>{props.children}</div>
      <ContextMenuPrimitive.RadioItemIndicator>
        <span data-ui='context-menu-radio-indicator' />
      </ContextMenuPrimitive.RadioItemIndicator>
    </ContextMenuPrimitive.RadioItem>
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSubmenu,
  ContextMenuSubmenuTrigger,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem
}
