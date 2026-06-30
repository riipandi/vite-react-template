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
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { collapsibleExpandable, collapsibleStyles } from './collapsible.stylex'

export type CollapsibleRootProps = React.ComponentProps<typeof BaseCollapsible.Root> & {
  xstyle?: StyleXStyles
}
export type CollapsibleTriggerProps = React.ComponentProps<typeof BaseCollapsible.Trigger> & {
  expandableIndicator?: boolean
  xstyle?: StyleXStyles
}
export type CollapsiblePanelProps = React.ComponentProps<typeof BaseCollapsible.Panel> & {
  xstyle?: StyleXStyles
}

export function Collapsible({ xstyle, ...props }: CollapsibleRootProps) {
  return (
    <BaseCollapsible.Root
      data-slot='collapsible'
      {...stylex.props(collapsibleStyles.base, xstyle)}
      {...props}
    />
  )
}

export function CollapsibleTrigger({
  expandableIndicator = false,
  xstyle,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <BaseCollapsible.Trigger
      data-slot='collapsible-trigger'
      data-expandable={expandableIndicator ? true : undefined}
      {...stylex.props(
        collapsibleStyles.trigger,
        expandableIndicator && collapsibleExpandable.true,
        xstyle
      )}
      {...props}
    />
  )
}

export function CollapsiblePanel({ children, xstyle, ...props }: CollapsiblePanelProps) {
  return (
    <BaseCollapsible.Panel
      data-slot='collapsible-panel'
      {...stylex.props(collapsibleStyles.panel, xstyle)}
      {...props}
    >
      <div data-slot='collapsible-panel-content' {...stylex.props(collapsibleStyles.panelContent)}>
        {children}
      </div>
    </BaseCollapsible.Panel>
  )
}
