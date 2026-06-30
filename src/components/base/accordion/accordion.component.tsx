import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { accordionStyles } from './accordion.stylex'

function Accordion({ ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root {...stylex.props(accordionStyles.root)} {...props} />
}

function AccordionItem({ ...props }: AccordionPrimitive.Item.Props) {
  return <AccordionPrimitive.Item {...stylex.props(accordionStyles.item)} {...props} />
}

function AccordionTrigger({ children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        {...stylex.props(accordionStyles.trigger, stylex.defaultMarker())}
        {...props}
      >
        {children}
        <Lucide.ChevronDown {...stylex.props(accordionStyles.chevron)} size={16} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ ...props }: AccordionPrimitive.Panel.Props) {
  return <AccordionPrimitive.Panel {...stylex.props(accordionStyles.content)} {...props} />
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
