import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { duration, easing } from '#/lib/constants.stylex'

// Behavior parts: bring your own trigger (e.g.
// render={<Button />}) and content styles. The panel animates open/close.
export const Collapsible = BaseCollapsible.Root
export const CollapsibleTrigger = BaseCollapsible.Trigger

export function CollapsibleContent({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseCollapsible.Panel>, 'className' | 'style'> & {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}) {
  return <BaseCollapsible.Panel {...props} {...stylex.props(styles.panel, style)} />
}

const styles = stylex.create({
  // Height transition through Base UI's measured --collapsible-panel-height;
  // the starting/ending frames pin it to 0 so both open AND close animate.
  panel: {
    height: {
      default: 'var(--collapsible-panel-height)',
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    overflow: 'hidden',
    transitionDuration: {
      default: duration.fast,
      '@media (prefers-reduced-motion: reduce)': '0s'
    },
    transitionProperty: 'height',
    transitionTimingFunction: easing.out
  }
})
