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
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { tooltipStyles } from './tooltip.stylex'

export interface TooltipProps extends BaseTooltip.Root.Props {
  delay?: BaseTooltip.Provider.Props['delay']
  closeDelay?: BaseTooltip.Provider.Props['closeDelay']
  timeout?: BaseTooltip.Provider.Props['timeout']
}

export function Tooltip(props: TooltipProps) {
  const { delay, closeDelay, timeout, ...rest } = props
  return (
    <BaseTooltip.Provider
      data-slot='tooltip-provider'
      delay={delay || 50}
      closeDelay={closeDelay}
      timeout={timeout}
    >
      <BaseTooltip.Root data-slot='tooltip' {...rest} />
    </BaseTooltip.Provider>
  )
}

export interface TooltipTriggerProps extends BaseTooltip.Trigger.Props {}

export function TooltipTrigger(props: TooltipTriggerProps) {
  return <BaseTooltip.Trigger data-slot='tooltip-trigger' {...props} />
}

export interface TooltipPopupProps extends Omit<BaseTooltip.Popup.Props, 'className'> {
  xstyle?: StyleXStyles
  sideOffset?: BaseTooltip.Positioner.Props['sideOffset']
  side?: BaseTooltip.Positioner.Props['side']
  align?: BaseTooltip.Positioner.Props['align']
  alignOffset?: BaseTooltip.Positioner.Props['alignOffset']
  showArrow?: boolean
}

export function TooltipPopup({
  children,
  sideOffset = 8,
  showArrow = true,
  align,
  alignOffset = 0,
  side,
  xstyle,
  ...props
}: TooltipPopupProps) {
  return (
    <BaseTooltip.Portal data-slot='tooltip-portal'>
      <BaseTooltip.Positioner
        data-slot='tooltip-positioner'
        sideOffset={sideOffset}
        side={side}
        align={align}
        alignOffset={alignOffset}
        {...stylex.props(tooltipStyles.positioner)}
      >
        <BaseTooltip.Popup
          data-slot='tooltip-content'
          {...stylex.props(tooltipStyles.content, xstyle)}
          {...props}
        >
          {children}
          {showArrow && <TooltipArrow />}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}

export interface TooltipArrowProps extends Omit<BaseTooltip.Arrow.Props, 'className'> {}

export function TooltipArrow(props: TooltipArrowProps) {
  return (
    <BaseTooltip.Arrow data-slot='tooltip-arrow' {...stylex.props(tooltipStyles.arrow)} {...props}>
      <svg width='20' height='10' viewBox='0 0 20 10' fill='none'>
        <path d='M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V9H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z' />
        <path d='M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z' />
      </svg>
    </BaseTooltip.Arrow>
  )
}
