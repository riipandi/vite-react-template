import './style.css'
import { Toolbar as ToolBarPrimitive } from '@base-ui/react/toolbar'
import { Separator } from '../separator'

function Toolbar(props: ToolBarPrimitive.Root.Props) {
  return <ToolBarPrimitive.Root data-ui='toolbar' {...props} />
}

function ToolbarButton(props: ToolBarPrimitive.Button.Props) {
  return <ToolBarPrimitive.Button data-slot='toolbar-button' {...props} />
}

function ToolbarLink(props: ToolBarPrimitive.Link.Props) {
  return <ToolBarPrimitive.Link data-slot='toolbar-link' {...props} />
}

function ToolbarSeparator(props: ToolBarPrimitive.Separator.Props) {
  return (
    <ToolBarPrimitive.Separator
      {...props}
      data-slot='toolbar-separator'
      render={<Separator orientation='vertical' />}
    />
  )
}

function ToolbarGroup(props: ToolBarPrimitive.Group.Props) {
  return <ToolBarPrimitive.Group data-slot='toolbar-group' {...props} />
}

function ToolbarInput(props: ToolBarPrimitive.Input.Props) {
  return <ToolBarPrimitive.Input {...props} />
}

export { Toolbar, ToolbarButton, ToolbarLink, ToolbarSeparator, ToolbarGroup, ToolbarInput }
