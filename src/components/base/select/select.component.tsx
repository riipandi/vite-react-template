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
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Chip } from '../../extra/chip'
import { selectStyles, selectVariants } from './select.stylex'

export type SelectVariant = keyof typeof selectVariants

export interface SelectItem {
  value: string
  label: React.ReactNode
  icon?: React.ReactNode
}

export type SelectRootProps = React.ComponentProps<typeof BaseSelect.Root> & {
  xstyle?: StyleXStyles
}
export type SelectTriggerProps = React.ComponentProps<typeof BaseSelect.Trigger> & {
  variant?: SelectVariant
  xstyle?: StyleXStyles
}
export type SelectValueProps = React.ComponentProps<typeof BaseSelect.Value> & {
  placeholder?: string
  xstyle?: StyleXStyles
}
export type SelectPopupProps = React.ComponentProps<typeof BaseSelect.Popup> & {
  align?: BaseSelect.Positioner.Props['align']
  alignOffset?: BaseSelect.Positioner.Props['alignOffset']
  side?: BaseSelect.Positioner.Props['side']
  sideOffset?: BaseSelect.Positioner.Props['sideOffset']
  anchor?: BaseSelect.Positioner.Props['anchor']
  sticky?: BaseSelect.Positioner.Props['sticky']
  positionMethod?: BaseSelect.Positioner.Props['positionMethod']
  xstyle?: StyleXStyles
}
export type SelectListProps = React.ComponentProps<typeof BaseSelect.List> & {
  xstyle?: StyleXStyles
}
export type SelectItemProps = React.ComponentProps<typeof BaseSelect.Item> & {
  xstyle?: StyleXStyles
}
export type SelectGroupProps = React.ComponentProps<typeof BaseSelect.Group> & {
  xstyle?: StyleXStyles
}
export type SelectGroupLabelProps = React.ComponentProps<typeof BaseSelect.GroupLabel> & {
  xstyle?: StyleXStyles
}
export type SelectSeparatorProps = React.ComponentProps<typeof BaseSelect.Separator> & {
  xstyle?: StyleXStyles
}

export function Select({ xstyle, ...props }: SelectRootProps) {
  return (
    <BaseSelect.Root data-slot='select' {...stylex.props(selectStyles.root, xstyle)} {...props} />
  )
}

export function SelectTrigger({
  children,
  variant = 'default',
  xstyle,
  ...props
}: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      data-slot='select-trigger'
      {...stylex.props(selectStyles.base, selectVariants[variant], xstyle)}
      {...props}
    >
      {children}
      <BaseSelect.Icon {...stylex.props(selectStyles.icon)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <title>Select dropdown icon</title>
          <polyline points='6 9 12 15 18 9' />
        </svg>
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

export function SelectValue({
  placeholder = 'Select an option',
  xstyle,
  ...props
}: SelectValueProps) {
  return (
    <BaseSelect.Value data-slot='select-value' {...stylex.props(xstyle)} {...props}>
      {(value: string | SelectItem | null) => (
        <SelectRenderValue value={value} placeholder={placeholder} />
      )}
    </BaseSelect.Value>
  )
}

function SelectRenderValue({
  value,
  placeholder
}: {
  value: string | SelectItem | SelectItem[] | null
  placeholder: string
}) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return <span {...stylex.props(selectStyles.placeholder)}>{placeholder}</span>
  }

  if (Array.isArray(value)) {
    const firstValue = value[0]
    const firstValueLabel = typeof firstValue === 'object' ? firstValue.label : firstValue
    const additionalValues =
      value.length > 1 ? (
        <Chip size='sm' {...stylex.props(selectStyles.chip)}>
          +{value.length - 1} more
        </Chip>
      ) : (
        ''
      )

    return (
      <div {...stylex.props(selectStyles.valueWrapper)}>
        <span {...stylex.props(selectStyles.valueText)}>{firstValueLabel}</span>
        {additionalValues}
      </div>
    )
  }

  if (typeof value === 'object') {
    return (
      <div {...stylex.props(selectStyles.valueWrapper)}>
        {value.icon}
        <span {...stylex.props(selectStyles.valueLabel)}>{value.label}</span>
      </div>
    )
  }

  return <span {...stylex.props(selectStyles.valueText)}>{value}</span>
}

export function SelectPopup({
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
}: SelectPopupProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Backdrop data-slot='select-backdrop' {...stylex.props(selectStyles.backdrop)} />
      <BaseSelect.Positioner
        data-slot='select-positioner'
        {...stylex.props(selectStyles.positioner)}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset || 6}
        anchor={anchor}
        sticky={sticky}
        positionMethod={positionMethod}
      >
        <BaseSelect.ScrollUpArrow
          data-slot='select-scroll-up-arrow'
          {...stylex.props(selectStyles.scrollUpArrow)}
        />
        <BaseSelect.Popup
          data-slot='select-popup'
          {...stylex.props(selectStyles.popup, xstyle)}
          {...props}
        >
          <BaseSelect.Arrow data-slot='select-arrow' {...stylex.props(selectStyles.arrow)} />
          {children}
        </BaseSelect.Popup>
        <BaseSelect.ScrollDownArrow
          data-slot='select-scroll-down-arrow'
          {...stylex.props(selectStyles.scrollDownArrow)}
        />
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

export function SelectList({ xstyle, ...props }: SelectListProps) {
  return (
    <BaseSelect.List
      data-slot='select-list'
      {...stylex.props(selectStyles.list, xstyle)}
      {...props}
    />
  )
}

export function SelectItem({ children, value, xstyle, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item
      data-slot='select-item'
      value={typeof value === 'object' ? value : { value, label: children }}
      {...stylex.props(selectStyles.item, xstyle)}
      {...props}
    >
      <BaseSelect.ItemText data-slot='select-item-text' {...stylex.props(selectStyles.itemText)}>
        {children}
      </BaseSelect.ItemText>
      <BaseSelect.ItemIndicator
        data-slot='select-item-indicator'
        {...stylex.props(selectStyles.itemIndicator)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <title>Selected checkmark</title>
          <polyline points='20 6 9 17 4 12' />
        </svg>
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
}

export function SelectGroup({ xstyle, ...props }: SelectGroupProps) {
  return (
    <BaseSelect.Group
      data-slot='select-group'
      {...stylex.props(selectStyles.group, xstyle)}
      {...props}
    />
  )
}

export function SelectGroupLabel({ xstyle, ...props }: SelectGroupLabelProps) {
  return (
    <BaseSelect.GroupLabel
      data-slot='select-group-label'
      {...stylex.props(selectStyles.groupLabel, xstyle)}
      {...props}
    />
  )
}

export function SelectSeparator({ xstyle, ...props }: SelectSeparatorProps) {
  return (
    <BaseSelect.Separator
      data-slot='select-separator'
      {...stylex.props(selectStyles.separator, xstyle)}
      {...props}
    />
  )
}
