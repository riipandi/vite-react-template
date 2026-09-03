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
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { shadow } from '#/lib/tokens.stylex'
import { ring } from '#/styles/core/utils.stylex'
import { popoverStyles as s } from './popover.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export const Popover = BasePopover.Root
export const PopoverTrigger = BasePopover.Trigger
export const PopoverClose = BasePopover.Close

export interface PopoverContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BasePopover.Popup>, 'className' | 'style'>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BasePopover.Positioner>,
      'align' | 'alignOffset' | 'side' | 'sideOffset'
    > {
  style?: stylex.StyleXStyles
}

export function PopoverContent({
  style,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(s.positioner)}
      >
        <BasePopover.Popup
          {...props}
          {...stylex.props(s.popup, ring({ shadow: shadow.md }), style)}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

/** Layout wrapper for `PopoverTitle` + `PopoverDescription` inside `PopoverContent`. */
export function PopoverHeader({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return <div {...props} {...stylex.props(s.header, style)} />
}

export function PopoverTitle({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BasePopover.Title>, 'className' | 'style'> &
  StyleProp) {
  return <BasePopover.Title {...props} {...stylex.props(s.title, style)} />
}

export function PopoverDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BasePopover.Description>, 'className' | 'style'> &
  StyleProp) {
  return <BasePopover.Description {...props} {...stylex.props(s.description, style)} />
}
