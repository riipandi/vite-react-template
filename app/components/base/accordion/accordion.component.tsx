import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { accordionStyles as s } from './accordion.stylex'

interface StyleXStyleProps {
  style?: stylex.StyleXStyles
}

export function Accordion({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAccordion.Root>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseAccordion.Root {...props} {...stylex.props(s.root, style)} />
}

export function AccordionItem({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAccordion.Item>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseAccordion.Item {...props} {...stylex.props(s.item, style)} />
}

export function AccordionTrigger({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger>, 'className' | 'style'> &
  StyleXStyleProps) {
  return (
    <BaseAccordion.Header {...stylex.props(s.header)}>
      <BaseAccordion.Trigger {...props} {...stylex.props(s.trigger, style)}>
        {children}
        <svg
          width='16'
          height='16'
          viewBox={`0 0 16 16`}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden
          {...stylex.props(s.chevron)}
        >
          <path d={`m3 6 5 5 5-5`} />
        </svg>
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  )
}

export function AccordionContent({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAccordion.Panel>, 'className' | 'style'> &
  StyleXStyleProps) {
  return (
    <BaseAccordion.Panel {...props} {...stylex.props(s.panel)}>
      <div {...stylex.props(s.inner, style)}>{children}</div>
    </BaseAccordion.Panel>
  )
}
