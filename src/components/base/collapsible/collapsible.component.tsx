import './style.css'
import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'

function Collapsible(props: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-ui='collapsible' {...props} />
}

function CollapsibleTrigger({ children, ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger data-slot='collapsible-trigger' {...props}>
      {children}
    </CollapsiblePrimitive.Trigger>
  )
}

function CollapsiblePanel(props: CollapsiblePrimitive.Panel.Props) {
  return <CollapsiblePrimitive.Panel data-ui='collapsible-panel' {...props} />
}

export { Collapsible, CollapsibleTrigger, CollapsiblePanel }
