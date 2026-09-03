/**
 * A popup that appears when an element is hovered or focused, showing a hint for sighted users.
 *
 * @see: https://base-ui.com/react/components/tooltip
 *
 * BaseUI Anatomy:
 * <Tooltip.Provider>
 *   <Tooltip.Root>
 *     <Tooltip.Trigger />
 *     <Tooltip.Portal>
 *       <Tooltip.Positioner>
 *         <Tooltip.Popup>
 *           <Tooltip.Arrow />
 *         </Tooltip.Popup>
 *       </Tooltip.Positioner>
 *     </Tooltip.Portal>
 *   </Tooltip.Root>
 * </Tooltip.Provider>
 */

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { tooltipStyles as s } from './tooltip.stylex'

// Instant tooltips by default (Base UI's own default is 600ms).
export function TooltipProvider({
  delay = 0,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTooltip.Provider>) {
  return <BaseTooltip.Provider delay={delay} {...props} />
}

export const Tooltip = BaseTooltip.Root
export const TooltipTrigger = BaseTooltip.Trigger

export interface TooltipContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup>, 'className' | 'style'>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BaseTooltip.Positioner>,
      'align' | 'alignOffset' | 'side' | 'sideOffset'
    > {
  style?: stylex.StyleXStyles
}

export function TooltipContent({
  style,
  children,
  side = 'top',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  ...props
}: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(s.positioner)}
      >
        <BaseTooltip.Popup {...props} {...stylex.props(s.popup, style)}>
          {children}
          <BaseTooltip.Arrow {...stylex.props(s.arrow)} />
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}
