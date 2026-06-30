import './style.css'
import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu'
import * as Lucide from 'lucide-react'

function NavigationMenu({ children, ...props }: NavigationMenuPrimitive.Root.Props) {
  return (
    <NavigationMenuPrimitive.Root data-ui='navigation-menu' {...props}>
      {children}

      <NavigationMenuPositioner />
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList(
  props: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>
) {
  return <NavigationMenuPrimitive.List data-ui='navigation-menu-list' {...props} />
}

function NavigationMenuItem(
  props: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>
) {
  return <NavigationMenuPrimitive.Item data-ui='navigation-menu-item' {...props} />
}

function NavigationMenuTrigger(props: NavigationMenuPrimitive.Trigger.Props) {
  return <NavigationMenuPrimitive.Trigger data-ui='navigation-menu-trigger' {...props} />
}

function NavigationMenuContent({ ...props }: NavigationMenuPrimitive.Content.Props) {
  return <NavigationMenuPrimitive.Content data-ui='navigation-menu-content' {...props} />
}

function NavigationMenuPositioner({
  side = 'bottom',
  sideOffset = 8,
  align = 'start',
  alignOffset = 0,
  ...props
}: NavigationMenuPrimitive.Positioner.Props) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        data-ui='navigation-menu-positioner'
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        {...props}
      >
        <NavigationMenuPrimitive.Popup data-ui='navigation-menu-popup'>
          <NavigationMenuPrimitive.Viewport data-ui='navigation-menu-viewport' />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  )
}

function NavigationMenuLink(props: NavigationMenuPrimitive.Link.Props) {
  return <NavigationMenuPrimitive.Link data-ui='navigation-menu-link' {...props} />
}

function NavigationMenuIndicator(
  props: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>
) {
  return (
    <NavigationMenuPrimitive.Icon data-ui='navigation-menu-indicator' {...props}>
      <Lucide.ChevronDown size={16} />
    </NavigationMenuPrimitive.Icon>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuPositioner
}
