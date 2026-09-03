import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { ring } from '#/lib/stylex-utils'
import { shadow } from '#/lib/tokens.stylex'
import { autocompleteStyles as s } from './autocomplete.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

/**
 * Free-text input with a filtered suggestion popup — unlike Combobox, any
 * typed value is allowed; the list only suggests. Pass `items` to the root;
 * `AutocompleteList` accepts a render function over the filtered items.
 */
export const Autocomplete = BaseAutocomplete.Root
export const AutocompleteValue = BaseAutocomplete.Value
export const AutocompleteCollection = BaseAutocomplete.Collection

export function AutocompleteInput({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Input>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Input {...props} {...stylex.props(s.input, style)} />
}

export interface AutocompleteContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Popup>, 'className' | 'style'>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Positioner>,
      'align' | 'alignOffset' | 'side' | 'sideOffset' | 'anchor'
    >,
    StyleProp {}

export function AutocompleteContent({
  style,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: AutocompleteContentProps) {
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        anchor={anchor}
        {...stylex.props(s.positioner)}
      >
        <BaseAutocomplete.Popup
          {...props}
          {...stylex.props(s.popup, ring({ shadow: shadow.md }), style)}
        />
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  )
}

export function AutocompleteList({
  style,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof BaseAutocomplete.List>,
  'className' | 'style' | 'children'
> &
  StyleProp & {
    /** Static items, or a render function over the filtered items. */
    // oxlint-disable-next-line typescript/no-explicit-any
    children?: React.ReactNode | ((item: any) => React.ReactNode)
  }) {
  return <BaseAutocomplete.List {...props} {...stylex.props(s.list, style)} />
}

export function AutocompleteItem({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Item>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Item {...props} {...stylex.props(s.item, style)} />
}

export function AutocompleteGroup({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Group>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Group {...props} {...stylex.props(style)} />
}

export function AutocompleteLabel({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.GroupLabel>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.GroupLabel {...props} {...stylex.props(s.label, style)} />
}

export function AutocompleteEmpty({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Empty>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Empty {...props} {...stylex.props(s.empty, style)} />
}

export function AutocompleteSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Separator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseAutocomplete.Separator {...props} {...stylex.props(s.separator, style)} />
}
