/**
 * A set of collapsible panels with headings.
 *
 * @see: https://base-ui.com/react/components/accordion
 *
 * BaseUI Anatomy:
 * <Accordion.Root>
 *   <Accordion.Item>
 *     <Accordion.Header>
 *       <Accordion.Trigger />
 *     </Accordion.Header>
 *     <Accordion.Panel />
 *   </Accordion.Item>
 * </Accordion.Root>
 */

import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import type { StyleXStyles } from '@stylexjs/stylex'

export type AccordionRootProps = React.ComponentProps<typeof BaseAccordion.Root> & {
  xstyle?: StyleXStyles
}
export type AccordionItemProps = React.ComponentProps<typeof BaseAccordion.Item> & {
  xstyle?: StyleXStyles
}
export type AccordionHeaderProps = React.ComponentProps<typeof BaseAccordion.Header> & {
  xstyle?: StyleXStyles
}
export type AccordionTriggerProps = React.ComponentProps<typeof BaseAccordion.Trigger> & {
  xstyle?: StyleXStyles
  expandableIndicator?: boolean
}
export type AccordionPanelProps = React.ComponentProps<typeof BaseAccordion.Panel> & {
  xstyle?: StyleXStyles
}

export function Accordion({ ...props }: AccordionRootProps) {
  return <BaseAccordion.Root data-slot='accordion' {...props} />
}

export function AccordionItem({ children, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item data-slot='accordion-item' {...props}>
      {children}
    </BaseAccordion.Item>
  )
}

export function AccordionHeader({ children, ...props }: AccordionHeaderProps) {
  return (
    <BaseAccordion.Header data-slot='accordion-header' {...props}>
      {children}
    </BaseAccordion.Header>
  )
}

export function AccordionTrigger({ expandableIndicator = true, ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger
      data-slot='accordion-trigger'
      data-expandable={expandableIndicator ? true : undefined}
      {...props}
    />
  )
}

export function AccordionPanel({ children, ...props }: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel data-slot='accordion-panel' {...props}>
      <div data-slot='accordion-panel-content'>{children}</div>
    </BaseAccordion.Panel>
  )
}
