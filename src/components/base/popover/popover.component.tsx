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
import { cx } from 'css-variants'

const popoverStyles = tv({
  slots: {
    positioner: [],
    popup: [
      'text-foreground-neutral flex flex-col items-start gap-2',
      'bg-background-elevation-overlay ring-border-neutral shadow-overlay rounded-md ring',
      'p-4 transition-[transform,scale,opacity] outline-none',
      'data-ending-style:scale-90 data-ending-style:opacity-0',
      'data-starting-style:scale-90 data-starting-style:opacity-0'
    ],
    arrow: [
      'data-[side=bottom]:-top-2 data-[side=left]:-right-3 data-[side=left]:rotate-90',
      'data-[side=right]:-left-3 data-[side=right]:-rotate-90 data-[side=top]:-bottom-2',
      'data-[side=top]:rotate-180'
    ],
    title: 'text-sm font-semibold',
    description: 'text-foreground-neutral-faded mb-2 text-xs leading-normal'
  }
})

export type PopoverRootProps = React.ComponentProps<typeof BasePopover.Root>
export type PopoverTriggerProps = React.ComponentProps<typeof BasePopover.Trigger>
export type PopoverPopupProps = React.ComponentProps<typeof BasePopover.Popup> & {
  align?: BasePopover.Positioner.Props['align']
  alignOffset?: BasePopover.Positioner.Props['alignOffset']
  side?: BasePopover.Positioner.Props['side']
  sideOffset?: BasePopover.Positioner.Props['sideOffset']
  anchor?: BasePopover.Positioner.Props['anchor']
  sticky?: BasePopover.Positioner.Props['sticky']
  positionMethod?: BasePopover.Positioner.Props['positionMethod']
}
export type PopoverTitleProps = React.ComponentProps<typeof BasePopover.Title>
export type PopoverDescriptionProps = React.ComponentProps<typeof BasePopover.Description>

export function Popover({ ...props }: PopoverRootProps) {
  return <BasePopover.Root data-slot='popover' {...props} />
}

export function PopoverTrigger({ ...props }: PopoverTriggerProps) {
  return <BasePopover.Trigger data-slot='popover-trigger' {...props} />
}

export function PopoverPopup({
  children,
  className,
  align,
  alignOffset,
  side,
  sideOffset,
  anchor,
  sticky,
  positionMethod,
  ...props
}: PopoverPopupProps) {
  const styles = popoverStyles()
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        data-slot='popover-positioner'
        className={cx(styles.positioner())}
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
          className={cx(styles.popup(), className)}
          {...props}
        >
          {children}
          <BasePopover.Arrow className={cx(styles.arrow())}>
            <svg width='20' height='10' viewBox='0 0 20 10' fill='none'>
              <title>Popover arrow</title>
              <path
                d='M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z'
                className='fill-background-elevation-overlay'
              />
              <path
                d='M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z'
                className='fill-border-neutral'
              />
              <path d='M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z' />
            </svg>
          </BasePopover.Arrow>
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  const styles = popoverStyles()
  return (
    <BasePopover.Title
      data-slot='popover-title'
      className={cx(styles.title(), className)}
      {...props}
    />
  )
}

export function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  const styles = popoverStyles()
  return (
    <BasePopover.Description
      data-slot='popover-description'
      className={cx(styles.description(), className)}
      {...props}
    />
  )
}
