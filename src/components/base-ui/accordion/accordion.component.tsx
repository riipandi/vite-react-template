'use client'

import './style.css'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

function Accordion({ ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-ui='accordion' {...props} />
}

function AccordionItem({ ...props }: AccordionPrimitive.Item.Props) {
  return <AccordionPrimitive.Item data-ui='accordion-item' {...props} />
}

function AccordionTrigger({ children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header data-ui='accordion-header'>
      <AccordionPrimitive.Trigger data-ui='accordion-trigger' {...props}>
        {children}
        <HugeiconsIcon icon={ArrowDown01Icon} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ ...props }: AccordionPrimitive.Panel.Props) {
  return <AccordionPrimitive.Panel data-ui='accordion-content' {...props} />
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
