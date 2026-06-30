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
import * as stylex from '@stylexjs/stylex'
import { accordionStyles } from './accordion.stylex'

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
  expandableIndicator?: boolean
  xstyle?: StyleXStyles
}
export type AccordionPanelProps = React.ComponentProps<typeof BaseAccordion.Panel> & {
  xstyle?: StyleXStyles
}

export function Accordion({ xstyle, ...props }: AccordionRootProps) {
  return (
    <BaseAccordion.Root
      data-slot='accordion'
      {...stylex.props(accordionStyles.root, xstyle)}
      {...props}
    />
  )
}

export function AccordionItem({ children, xstyle, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      data-slot='accordion-item'
      {...stylex.props(accordionStyles.item, xstyle)}
      {...props}
    >
      {children}
    </BaseAccordion.Item>
  )
}

export function AccordionHeader({ children, xstyle, ...props }: AccordionHeaderProps) {
  return (
    <BaseAccordion.Header
      data-slot='accordion-header'
      {...stylex.props(accordionStyles.header, xstyle)}
      {...props}
    >
      {children}
    </BaseAccordion.Header>
  )
}

export function AccordionTrigger({
  expandableIndicator = true,
  xstyle,
  ...props
}: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger
      data-slot='accordion-trigger'
      data-expandable={expandableIndicator ? true : undefined}
      {...stylex.props(
        accordionStyles.trigger,
        expandableIndicator && accordionStyles.expandableIndicator,
        xstyle
      )}
      {...props}
    />
  )
}

export function AccordionPanel({ children, xstyle, ...props }: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      data-slot='accordion-panel'
      {...stylex.props(accordionStyles.panel, xstyle)}
      {...props}
    >
      <div data-slot='accordion-panel-content' {...stylex.props(accordionStyles.panelContent)}>
        {children}
      </div>
    </BaseAccordion.Panel>
  )
}
