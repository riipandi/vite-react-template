/**
 * An input that suggests options as you type.
 *
 * @see: https://base-ui.com/react/components/autocomplete
 *
 * BaseUI Anatomy:
 * <Autocomplete.Root>
 *   <Autocomplete.Input />
 *   <Autocomplete.Trigger />
 *   <Autocomplete.Icon />
 *   <Autocomplete.Clear />
 *   <Autocomplete.Value />
 *   <Autocomplete.Portal>
 *     <Autocomplete.Backdrop />
 *     <Autocomplete.Positioner>
 *       <Autocomplete.Popup>
 *         <Autocomplete.Arrow />
 *         <Autocomplete.Status />
 *         <Autocomplete.Empty />
 *         <Autocomplete.List>
 *           <Autocomplete.Row>
 *             <Autocomplete.Item />
 *           </Autocomplete.Row>
 *           <Autocomplete.Separator />
 *           <Autocomplete.Group>
 *             <Autocomplete.GroupLabel />
 *           </Autocomplete.Group>
 *           <Autocomplete.Collection />
 *         </Autocomplete.List>
 *       </Autocomplete.Popup>
 *     </Autocomplete.Positioner>
 *   </Autocomplete.Portal>
 * </Autocomplete.Root>
 */

import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { autocompleteStyles, autocompleteVariants } from './autocomplete.stylex'

export type AutocompleteVariant = keyof typeof autocompleteVariants

export type AutocompleteRootProps = React.ComponentProps<typeof BaseAutocomplete.Root> & {
  xstyle?: StyleXStyles
}
export type AutocompleteInputProps = React.ComponentProps<typeof BaseAutocomplete.Input> & {
  variant?: AutocompleteVariant
  xstyle?: StyleXStyles
}
export type AutocompletePopupProps = React.ComponentProps<typeof BaseAutocomplete.Popup> & {
  align?: BaseAutocomplete.Positioner.Props['align']
  alignOffset?: BaseAutocomplete.Positioner.Props['alignOffset']
  side?: BaseAutocomplete.Positioner.Props['side']
  sideOffset?: BaseAutocomplete.Positioner.Props['sideOffset']
  anchor?: BaseAutocomplete.Positioner.Props['anchor']
  sticky?: BaseAutocomplete.Positioner.Props['sticky']
  positionMethod?: BaseAutocomplete.Positioner.Props['positionMethod']
  xstyle?: StyleXStyles
}
export type AutocompleteIconProps = React.ComponentProps<typeof BaseAutocomplete.Icon> & {
  xstyle?: StyleXStyles
}
export type AutocompleteClearProps = React.ComponentProps<typeof BaseAutocomplete.Clear> & {
  xstyle?: StyleXStyles
}
export type AutocompleteValueProps = React.ComponentProps<typeof BaseAutocomplete.Value> & {
  xstyle?: StyleXStyles
}
export type AutocompleteTriggerProps = React.ComponentProps<typeof BaseAutocomplete.Trigger> & {
  xstyle?: StyleXStyles
}
export type AutocompleteEmptyProps = React.ComponentProps<typeof BaseAutocomplete.Empty> & {
  xstyle?: StyleXStyles
}
export type AutocompleteListProps = React.ComponentProps<typeof BaseAutocomplete.List> & {
  xstyle?: StyleXStyles
}
export type AutocompleteGroupProps = React.ComponentProps<typeof BaseAutocomplete.Group> & {
  xstyle?: StyleXStyles
}
export type AutocompleteGroupLabelProps = React.ComponentProps<
  typeof BaseAutocomplete.GroupLabel
> & {
  xstyle?: StyleXStyles
}
export type AutocompleteCollectionProps = React.ComponentProps<
  typeof BaseAutocomplete.Collection
> & {
  xstyle?: StyleXStyles
}
export type AutocompleteRowProps = React.ComponentProps<'div'> & {
  xstyle?: StyleXStyles
}
export type AutocompleteItemProps = React.ComponentProps<typeof BaseAutocomplete.Item> & {
  xstyle?: StyleXStyles
}
export type AutocompleteSeparatorProps = React.ComponentProps<typeof BaseAutocomplete.Separator> & {
  xstyle?: StyleXStyles
}

export function Autocomplete({ xstyle, ...props }: AutocompleteRootProps) {
  return (
    <BaseAutocomplete.Root
      data-slot='autocomplete'
      {...stylex.props(autocompleteStyles.root, xstyle)}
      {...props}
    />
  )
}

export function AutocompleteInput({
  variant = 'default',
  xstyle,
  ...props
}: AutocompleteInputProps) {
  return (
    <BaseAutocomplete.Input
      data-slot='autocomplete-input'
      {...stylex.props(autocompleteStyles.base, autocompleteVariants[variant], xstyle)}
      {...props}
    />
  )
}

export function AutocompletePopup({
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
}: AutocompletePopupProps) {
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Backdrop
        data-slot='autocomplete-backdrop'
        {...stylex.props(autocompleteStyles.backdrop)}
      />
      <BaseAutocomplete.Positioner
        data-slot='autocomplete-positioner'
        {...stylex.props(autocompleteStyles.positioner)}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset || 8}
        anchor={anchor}
        sticky={sticky}
        positionMethod={positionMethod}
      >
        <BaseAutocomplete.Popup
          data-slot='autocomplete-popup'
          {...stylex.props(autocompleteStyles.popup, xstyle)}
          {...props}
        >
          {children}
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  )
}

export function AutocompleteIcon({ xstyle, ...props }: AutocompleteIconProps) {
  return (
    <BaseAutocomplete.Icon
      data-slot='autocomplete-icon'
      {...stylex.props(autocompleteStyles.icon, xstyle)}
      {...props}
    />
  )
}

export function AutocompleteClear({ xstyle, ...props }: AutocompleteClearProps) {
  return (
    <BaseAutocomplete.Clear
      data-slot='autocomplete-clear'
      {...stylex.props(autocompleteStyles.clear, xstyle)}
      {...props}
    />
  )
}

export function AutocompleteValue({ xstyle, ...props }: AutocompleteValueProps) {
  return (
    <BaseAutocomplete.Value
      data-slot='autocomplete-value'
      {...stylex.props(autocompleteStyles.value, xstyle)}
      {...props}
    />
  )
}

export function AutocompleteTrigger({ xstyle, ...props }: AutocompleteTriggerProps) {
  return (
    <BaseAutocomplete.Trigger
      data-slot='autocomplete-trigger'
      {...stylex.props(autocompleteStyles.trigger, xstyle)}
      {...props}
    />
  )
}

export function AutocompleteEmpty({ xstyle, ...props }: AutocompleteEmptyProps) {
  return (
    <BaseAutocomplete.Empty
      data-slot='autocomplete-empty'
      {...stylex.props(autocompleteStyles.empty, xstyle)}
      {...props}
    />
  )
}

export function AutocompleteList({ xstyle, ...props }: AutocompleteListProps) {
  return (
    <BaseAutocomplete.List
      data-slot='autocomplete-list'
      {...stylex.props(autocompleteStyles.list, xstyle)}
      {...props}
    />
  )
}

export function AutocompleteGroup({ xstyle, ...props }: AutocompleteGroupProps) {
  return (
    <BaseAutocomplete.Group
      data-slot='autocomplete-group'
      {...stylex.props(autocompleteStyles.group, xstyle)}
      {...props}
    />
  )
}

export function AutocompleteGroupLabel({ xstyle, ...props }: AutocompleteGroupLabelProps) {
  return (
    <BaseAutocomplete.GroupLabel
      data-slot='autocomplete-group-label'
      {...stylex.props(autocompleteStyles.groupLabel, xstyle)}
      {...props}
    />
  )
}

export function AutocompleteCollection({ xstyle, ...props }: AutocompleteCollectionProps) {
  return (
    <BaseAutocomplete.Collection
      data-slot='autocomplete-collection'
      {...stylex.props(autocompleteStyles.collection, xstyle)}
      {...props}
    />
  )
}

export function AutocompleteRow({ children, xstyle, ...props }: AutocompleteRowProps) {
  return (
    <div data-slot='autocomplete-row' {...stylex.props(autocompleteStyles.row, xstyle)} {...props}>
      {children}
    </div>
  )
}

export function AutocompleteItem({ xstyle, ...props }: AutocompleteItemProps) {
  return (
    <BaseAutocomplete.Item
      data-slot='autocomplete-item'
      {...stylex.props(autocompleteStyles.item, xstyle)}
      {...props}
    />
  )
}

export function AutocompleteSeparator({ xstyle, ...props }: AutocompleteSeparatorProps) {
  return (
    <BaseAutocomplete.Separator
      data-slot='autocomplete-separator'
      {...stylex.props(autocompleteStyles.separator, xstyle)}
      {...props}
    />
  )
}
