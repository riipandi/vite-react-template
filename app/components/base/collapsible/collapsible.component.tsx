/**
 * A component that can be expanded or collapsed to show/hide content.
 *
 * @see: https://base-ui.com/react/components/collapsible
 *
 * BaseUI Anatomy:
 * <Collapsible.Root>
 *   <Collapsible.Trigger />
 *   <Collapsible.Panel />
 * </Collapsible.Root>
 */

import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { collapsibleStyles as s } from './collapsible.stylex'

// Behavior parts: bring your own trigger (e.g. render={<Button />}) and content styles. The panel animates open/close.
export const Collapsible = BaseCollapsible.Root
export const CollapsibleTrigger = BaseCollapsible.Trigger

export function CollapsibleContent({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCollapsible.Panel>, 'className' | 'style'> & {
  style?: stylex.StyleXStyles
}) {
  return <BaseCollapsible.Panel {...props} {...stylex.props(s.panel, style)} />
}
