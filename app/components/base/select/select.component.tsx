/**
 * Displays a list of options for the user to choose from.
 *
 * @see: https://base-ui.com/react/components/select
 *
 * BaseUI Anatomy:
 * <Select.Root>
 *   <Select.Trigger>
 *     <Select.Value />
 *     <Select.Icon />
 *   </Select.Trigger>
 *   <Select.Portal>
 *     <Select.Backdrop />
 *     <Select.Positioner>
 *       <Select.ScrollUpArrow />
 *       <Select.Popup>
 *         <Select.Arrow />
 *         <Select.List>
 *           <Select.Item>
 *             <Select.ItemText />
 *             <Select.ItemIndicator />
 *           </Select.Item>
 *           <Select.Separator />
 *           <Select.Group>
 *             <Select.GroupLabel />
 *           </Select.Group>
 *         </Select.List>
 *       </Select.Popup>
 *       <Select.ScrollDownArrow />
 *     </Select.Positioner>
 *   </Select.Portal>
 * </Select.Root>
 */

import { Select as BaseSelect } from '@base-ui/react/select'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { ring } from '#/lib/stylex-utils'
import { shadow } from '#/lib/tokens.stylex'
import { selectStyles as s } from './select.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export const Select = BaseSelect.Root
export const SelectValue = BaseSelect.Value
export const SelectGroup = BaseSelect.Group

export function SelectTrigger({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseSelect.Trigger {...props} {...stylex.props(s.trigger, style)}>
      {children}
      <BaseSelect.Icon {...stylex.props(s.icon)}>
        <svg width='16' height='16' viewBox={`0 0 16 16`} fill='currentColor' aria-hidden>
          <path d={`M11 10H5l3 3.5zm0-4H5l3-3.5z`} />
        </svg>
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

function ScrollArrow({ direction }: { direction: 'up' | 'down' }) {
  const Arrow = direction === 'up' ? BaseSelect.ScrollUpArrow : BaseSelect.ScrollDownArrow
  return (
    <Arrow
      {...stylex.props(s.scrollArrow, direction === 'up' ? s.scrollArrowUp : s.scrollArrowDown)}
    >
      <svg width='12' height='12' viewBox={`0 0 12 12`} fill='currentColor' aria-hidden>
        {direction === 'up' ? <path d={`M9 7.5H3L6 4z`} /> : <path d={`M9 4.5H3L6 8z`} />}
      </svg>
    </Arrow>
  )
}

export interface SelectContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>, 'className' | 'style'>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner>,
      'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
    >,
    StyleProp {}

// alignItemWithTrigger defaults on (the popup
// overlays the trigger with the selected item aligned to it; the popup itself
// scrolls, with scroll arrows). Pass alignItemWithTrigger={false} for a
// plain anchored dropdown.
export function SelectContent({
  style,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectContentProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(s.positioner)}
      >
        <BaseSelect.Popup
          {...props}
          {...stylex.props(
            s.popup,
            // Edge as a ring, not a border: Base UI's align-item-with-trigger
            // math ignores borders and would shift the aligned text.
            ring({ shadow: shadow.md }),
            // The align-with-trigger overlay repositions on open; a scale-in
            // animation fights that, so it only fades out. Anchored mode gets
            // the full closed pose on entry and exit.
            !alignItemWithTrigger && s.popupAnchored,
            style
          )}
        >
          <ScrollArrow direction='up' />
          <BaseSelect.List {...stylex.props(s.list)}>{children}</BaseSelect.List>
          <ScrollArrow direction='down' />
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

export function SelectItem({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.Item>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseSelect.Item {...props} {...stylex.props(s.item, style)}>
      <BaseSelect.ItemText {...stylex.props(s.itemText)}>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator {...stylex.props(s.itemIndicator)}>
        <svg
          width='12'
          height='12'
          viewBox={`0 0 12 12`}
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden
        >
          <path d={`M2 6.5 4.5 9 10 3`} />
        </svg>
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
}

export function SelectLabel({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>, 'className' | 'style'> &
  StyleProp) {
  return <BaseSelect.GroupLabel {...props} {...stylex.props(s.label, style)} />
}

export function SelectSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.Separator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseSelect.Separator {...props} {...stylex.props(s.separator, style)} />
}
