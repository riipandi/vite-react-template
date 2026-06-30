/**
 * Displays rich content in a portal.
 *
 * @see: https://base-ui.com/react/components/popover
 *
 * BaseUI Anatomy:
 * <Popover.Root>
 *   <Popover.Trigger />
 *   <Popover.Portal>
 *     <Popover.Backdrop />
 *     <Popover.Positioner>
 *       <Popover.Popup>
 *         <Popover.Arrow />
 *         <Popover.Viewport>
 *           <Popover.Title />
 *           <Popover.Description />
 *           <Popover.Close />
 *         </Popover.Viewport>
 *       </Popover.Popup>
 *     </Popover.Positioner>
 *   </Popover.Portal>
 * </Popover.Root>
 */

import { Popover as BasePopover } from '@base-ui/react/popover'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { popoverStyles } from './popover.stylex'

export type PopoverRootProps = React.ComponentProps<typeof BasePopover.Root> & {
  xstyle?: StyleXStyles
}
export type PopoverTriggerProps = React.ComponentProps<typeof BasePopover.Trigger> & {
  xstyle?: StyleXStyles
}
export type PopoverPopupProps = React.ComponentProps<typeof BasePopover.Popup> & {
  align?: BasePopover.Positioner.Props['align']
  alignOffset?: BasePopover.Positioner.Props['alignOffset']
  side?: BasePopover.Positioner.Props['side']
  sideOffset?: BasePopover.Positioner.Props['sideOffset']
  anchor?: BasePopover.Positioner.Props['anchor']
  sticky?: BasePopover.Positioner.Props['sticky']
  positionMethod?: BasePopover.Positioner.Props['positionMethod']
  xstyle?: StyleXStyles
}
export type PopoverTitleProps = React.ComponentProps<typeof BasePopover.Title> & {
  xstyle?: StyleXStyles
}
export type PopoverDescriptionProps = React.ComponentProps<typeof BasePopover.Description> & {
  xstyle?: StyleXStyles
}

export function Popover({ xstyle, ...props }: PopoverRootProps) {
  return (
    <BasePopover.Root
      data-slot='popover'
      {...stylex.props(popoverStyles.root, xstyle)}
      {...props}
    />
  )
}

export function PopoverTrigger({ xstyle, ...props }: PopoverTriggerProps) {
  return (
    <BasePopover.Trigger
      data-slot='popover-trigger'
      {...stylex.props(popoverStyles.trigger, xstyle)}
      {...props}
    />
  )
}

export function PopoverPopup({
  children,
  xstyle,
  align,
  alignOffset,
  side,
  sideOffset,
  anchor,
  sticky,
  positionMethod,
  ...props
}: PopoverPopupProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Backdrop />
      <BasePopover.Positioner
        data-slot='popover-positioner'
        {...stylex.props(popoverStyles.positioner)}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset || 12}
        anchor={anchor}
        sticky={sticky}
        positionMethod={positionMethod}
      >
        <BasePopover.Popup
          data-slot='popover-popup'
          {...stylex.props(popoverStyles.popup, xstyle)}
          {...props}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

export function PopoverTitle({ xstyle, ...props }: PopoverTitleProps) {
  return (
    <BasePopover.Title
      data-slot='popover-title'
      {...stylex.props(popoverStyles.title, xstyle)}
      {...props}
    />
  )
}

export function PopoverDescription({ xstyle, ...props }: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      data-slot='popover-description'
      {...stylex.props(popoverStyles.description, xstyle)}
      {...props}
    />
  )
}
