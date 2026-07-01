/**
 * An input that suggests options as you type.
 *
 * @see: https://base-ui.com/react/components/combobox
 *
 * BaseUI Anatomy:
 * <Combobox.Root>
 *   <Combobox.Trigger>
 *     <Combobox.Value />
 *   </Combobox.Trigger>
 *   <Combobox.Portal>
 *     <Combobox.Backdrop />
 *     <Combobox.Positioner>
 *       <Combobox.Popup>
 *         <Combobox.Arrow />
 *         <Combobox.List>
 *           <Combobox.Item />
 *           <Combobox.Group>
 *             <Combobox.GroupLabel />
 *           </Combobox.Group>
 *         </Combobox.List>
 *       </Combobox.Popup>
 *     </Combobox.Positioner>
 *   </Combobox.Portal>
 * </Combobox.Root>
 */

import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { comboboxStyles, comboboxVariants } from './combobox.stylex'

export type ComboboxVariant = keyof typeof comboboxVariants

export type ComboboxRootProps = React.ComponentProps<typeof BaseCombobox.Root> & {
  xstyle?: StyleXStyles
}
export type ComboboxTriggerProps = React.ComponentProps<typeof BaseCombobox.Trigger> & {
  variant?: ComboboxVariant
  pill?: boolean
  xstyle?: StyleXStyles
}
export type ComboboxPopupProps = React.ComponentProps<typeof BaseCombobox.Popup> & {
  align?: BaseCombobox.Positioner.Props['align']
  alignOffset?: BaseCombobox.Positioner.Props['alignOffset']
  side?: BaseCombobox.Positioner.Props['side']
  sideOffset?: BaseCombobox.Positioner.Props['sideOffset']
  anchor?: BaseCombobox.Positioner.Props['anchor']
  sticky?: BaseCombobox.Positioner.Props['sticky']
  positionMethod?: BaseCombobox.Positioner.Props['positionMethod']
  xstyle?: StyleXStyles
}

export function Combobox({ xstyle, ...props }: ComboboxRootProps) {
  return (
    <BaseCombobox.Root
      data-slot='combobox'
      {...stylex.props(comboboxStyles.root, xstyle)}
      {...props}
    />
  )
}

export function ComboboxTrigger({
  children,
  variant = 'default',
  xstyle,
  ...props
}: ComboboxTriggerProps) {
  return (
    <BaseCombobox.Trigger
      data-slot='combobox-trigger'
      {...stylex.props(comboboxStyles.trigger, comboboxVariants[variant], xstyle)}
      {...props}
    >
      {children}
    </BaseCombobox.Trigger>
  )
}

export function ComboboxValue({
  placeholder = 'Select an option',
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Value> & {
  placeholder?: string
  xstyle?: StyleXStyles
}) {
  return (
    <BaseCombobox.Value data-slot='combobox-value' {...stylex.props(xstyle)} {...props}>
      {(value: string | { value: string; label: string; icon?: React.ReactNode } | null) => (
        <ComboboxRenderValue value={value} placeholder={placeholder} />
      )}
    </BaseCombobox.Value>
  )
}

function ComboboxRenderValue({
  value,
  placeholder
}: {
  value: string | { value: string; label: string; icon?: React.ReactNode } | null
  placeholder: string
}) {
  if (!value) {
    return <span {...stylex.props(comboboxStyles.renderValuePlaceholder)}>{placeholder}</span>
  }

  if (typeof value === 'object') {
    return (
      <div {...stylex.props(comboboxStyles.renderValueWrapper)}>
        {value.icon}
        <span {...stylex.props(comboboxStyles.renderValueLabel)}>{value.label}</span>
      </div>
    )
  }

  return <span {...stylex.props(comboboxStyles.renderValueLabel)}>{value}</span>
}

export function ComboboxInput({
  placeholder,
  variant = 'default',
  xstyle,
  ...props
}: ComboboxInputProps) {
  return (
    <BaseCombobox.Input
      data-slot='combobox-search-input'
      placeholder={placeholder}
      {...stylex.props(comboboxStyles.searchInput, comboboxVariants[variant], xstyle)}
      {...props}
    />
  )
}

export type ComboboxInputProps = React.ComponentProps<typeof BaseCombobox.Input> & {
  variant?: ComboboxVariant
  xstyle?: StyleXStyles
}

export function ComboboxPopup({
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
}: ComboboxPopupProps) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Backdrop />
      <BaseCombobox.Positioner
        data-slot='combobox-positioner'
        {...stylex.props(comboboxStyles.positioner)}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset || 8}
        anchor={anchor}
        sticky={sticky}
        positionMethod={positionMethod}
      >
        <BaseCombobox.Popup
          data-slot='combobox-popup'
          {...stylex.props(comboboxStyles.popup, xstyle)}
          {...props}
        >
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
}

// ans: ComboboxSearch, Empty, List, Item, Group, GroupLabel, Separator, Collection — minimal stylex slots
export function ComboboxSearch({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Input> & { xstyle?: StyleXStyles }) {
  return (
    <BaseCombobox.Input
      data-slot='combobox-search'
      {...stylex.props(comboboxStyles.searchInput, xstyle)}
      {...props}
    />
  )
}

export function ComboboxEmpty({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Empty> & { xstyle?: StyleXStyles }) {
  return (
    <BaseCombobox.Empty
      data-slot='combobox-empty'
      {...stylex.props(comboboxStyles.empty, xstyle)}
      {...props}
    />
  )
}

export function ComboboxList({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseCombobox.List> & { xstyle?: StyleXStyles }) {
  return (
    <BaseCombobox.List
      data-slot='combobox-list'
      {...stylex.props(comboboxStyles.list, xstyle)}
      {...props}
    />
  )
}

export function ComboboxItem({
  children,
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Item> & { xstyle?: StyleXStyles }) {
  return (
    <BaseCombobox.Item
      data-slot='combobox-item'
      {...stylex.props(comboboxStyles.item, xstyle)}
      {...props}
    >
      {children}
    </BaseCombobox.Item>
  )
}

export function ComboboxGroup({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Group> & { xstyle?: StyleXStyles }) {
  return (
    <BaseCombobox.Group
      data-slot='combobox-group'
      {...stylex.props(comboboxStyles.group, xstyle)}
      {...props}
    />
  )
}

export function ComboboxGroupLabel({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseCombobox.GroupLabel> & { xstyle?: StyleXStyles }) {
  return (
    <BaseCombobox.GroupLabel
      data-slot='combobox-group-label'
      {...stylex.props(comboboxStyles.groupLabel, xstyle)}
      {...props}
    />
  )
}

export function ComboboxSeparator({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Separator> & { xstyle?: StyleXStyles }) {
  return (
    <BaseCombobox.Separator
      data-slot='combobox-separator'
      {...stylex.props(comboboxStyles.separator, xstyle)}
      {...props}
    />
  )
}

export function ComboboxCollection({
  ...props
}: React.ComponentProps<typeof BaseCombobox.Collection>) {
  return <BaseCombobox.Collection data-slot='combobox-collection' {...props} />
}
