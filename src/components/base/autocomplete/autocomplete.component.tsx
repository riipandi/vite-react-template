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
import { cx } from 'css-variants'
import * as React from 'react'

const autocompleteStyles = tv({
  base: 'text-foreground-neutral placeholder:text-foreground-neutral-faded/80 h-9 w-full rounded-sm px-3 text-sm leading-tight transition-all disabled:cursor-not-allowed disabled:opacity-70',
  slots: {
    positioner: [],
    popup: [
      'bg-background-elevation-overlay ring-border-neutral shadow-overlay rounded ring',
      'transition-[transform,scale,opacity] outline-none',
      'max-h-[min(var(---available-height),23rem)] w-(--anchor-width)',
      'data-ending-style:scale-90 data-ending-style:opacity-0',
      'data-starting-style:scale-90 data-starting-style:opacity-0'
    ],
    empty: [
      'text-foreground-neutral-faded flex items-center justify-center px-2.5 py-3 text-center',
      'text-sm empty:hidden empty:h-0 empty:p-0'
    ],
    list: [
      'space-y-0 overflow-auto outline-none empty:hidden empty:h-0 empty:p-0 dark:scheme-dark',
      'max-h-[min(23rem,var(--available-height))] overflow-y-auto p-1 dark:scheme-dark'
    ],
    group: 'pb-2 last:pb-0',
    groupLabel: 'text-foreground-neutral-faded px-2.5 py-1 text-sm font-medium',
    row: '',
    item: [
      'text-foreground-neutral flex cursor-pointer items-center gap-2 rounded px-2.5 py-2 text-sm',
      'data-highlighted:not-data-disabled:bg-background-neutral-faded data-selected:not-data-disabled:bg-background-neutral-faded',
      '[&_svg:not([class*=text-])]:text-foreground-neutral focus-visible:outline-none [&_svg:not([class*=size-])]:size-3.5',
      'data-disabled:cursor-not-allowed data-disabled:opacity-50'
    ],
    separator: 'bg-border-neutral-faded my-1 h-px'
  },
  variants: {
    variant: {
      default: {
        base: 'bg-background-elevation-base ring-border-neutral hover:not-data-disabled:not-focus:ring-border-primary focus:ring-border-primary shadow-raised rounded ring focus:ring-2 focus:outline-0'
      },
      subtle: {
        base: 'bg-background-elevation-base/60 ring-border-neutral hover:not-data-disabled:not-focus:ring-border-primary focus:ring-border-primary shadow-raised rounded ring focus:ring-2 focus:outline-0'
      },
      ghost: 'bg-transparent focus:outline-none'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type AutocompleteRootProps = React.ComponentProps<typeof BaseAutocomplete.Root>
export type AutocompleteInputProps = React.ComponentProps<typeof BaseAutocomplete.Input> &
  VariantProps<typeof autocompleteStyles>
export type AutocompletePopupProps = React.ComponentProps<typeof BaseAutocomplete.Popup>
export type AutocompleteIconProps = React.ComponentProps<typeof BaseAutocomplete.Icon>
export type AutocompleteClearProps = React.ComponentProps<typeof BaseAutocomplete.Clear>
export type AutocompleteValueProps = React.ComponentProps<typeof BaseAutocomplete.Value>
export type AutocompleteTriggerProps = React.ComponentProps<typeof BaseAutocomplete.Trigger>
export type AutocompleteEmptyProps = React.ComponentProps<typeof BaseAutocomplete.Empty>
export type AutocompleteListProps = React.ComponentProps<typeof BaseAutocomplete.List>
export type AutocompleteGroupProps = React.ComponentProps<typeof BaseAutocomplete.Group>
export type AutocompleteGroupLabelProps = React.ComponentProps<typeof BaseAutocomplete.GroupLabel>
export type AutocompleteCollectionProps = React.ComponentProps<typeof BaseAutocomplete.Collection>
export type AutocompleteRowProps = React.ComponentProps<'div'>
export type AutocompleteItemProps = React.ComponentProps<typeof BaseAutocomplete.Item>
export type AutocompleteSeparatorProps = React.ComponentProps<typeof BaseAutocomplete.Separator>

export function Autocomplete({ ...props }: AutocompleteRootProps) {
  return <BaseAutocomplete.Root data-slot='autocomplete' {...props} />
}

export function AutocompleteInput({ className, variant, ...props }: AutocompleteInputProps) {
  const styles = autocompleteStyles({ variant })
  return (
    <BaseAutocomplete.Input
      data-slot='autocomplete-input'
      className={cx(styles.base(), className)}
      {...props}
    />
  )
}

export function AutocompletePopup({
  className,
  children,
  align,
  alignOffset,
  side,
  sideOffset,
  anchor,
  sticky,
  positionMethod,
  ...props
}: AutocompletePopupProps & {
  align?: BaseAutocomplete.Positioner.Props['align']
  alignOffset?: BaseAutocomplete.Positioner.Props['alignOffset']
  side?: BaseAutocomplete.Positioner.Props['side']
  sideOffset?: BaseAutocomplete.Positioner.Props['sideOffset']
  anchor?: BaseAutocomplete.Positioner.Props['anchor']
  sticky?: BaseAutocomplete.Positioner.Props['sticky']
  positionMethod?: BaseAutocomplete.Positioner.Props['positionMethod']
}) {
  const styles = autocompleteStyles()
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Backdrop />
      <BaseAutocomplete.Positioner
        data-slot='autocomplete-positioner'
        className={cx(styles.positioner())}
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
          className={cx(styles.popup(), className)}
          {...props}
        >
          {children}
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  )
}

export function AutocompleteIcon({ ...props }: AutocompleteIconProps) {
  return <BaseAutocomplete.Icon data-slot='autocomplete-icon' {...props} />
}

export function AutocompleteClear({ ...props }: AutocompleteClearProps) {
  return <BaseAutocomplete.Clear data-slot='autocomplete-clear' {...props} />
}

export function AutocompleteValue({ ...props }: AutocompleteValueProps) {
  return <BaseAutocomplete.Value data-slot='autocomplete-value' {...props} />
}

export function AutocompleteTrigger({ ...props }: AutocompleteTriggerProps) {
  return <BaseAutocomplete.Trigger data-slot='autocomplete-trigger' {...props} />
}

export function AutocompleteEmpty({ className, ...props }: AutocompleteEmptyProps) {
  const styles = autocompleteStyles()
  return (
    <BaseAutocomplete.Empty
      data-slot='autocomplete-empty'
      className={cx(styles.empty(), className)}
      {...props}
    />
  )
}

export function AutocompleteList({ className, ...props }: AutocompleteListProps) {
  const styles = autocompleteStyles()
  return (
    <BaseAutocomplete.List
      data-slot='autocomplete-list'
      className={cx(styles.list(), className)}
      {...props}
    />
  )
}

export function AutocompleteGroup({ className, ...props }: AutocompleteGroupProps) {
  const styles = autocompleteStyles()
  return (
    <BaseAutocomplete.Group
      data-slot='autocomplete-group'
      className={cx(styles.group(), className)}
      {...props}
    />
  )
}

export function AutocompleteGroupLabel({ className, ...props }: AutocompleteGroupLabelProps) {
  const styles = autocompleteStyles()
  return (
    <BaseAutocomplete.GroupLabel
      data-slot='autocomplete-group-label'
      className={cx(styles.groupLabel(), className)}
      {...props}
    />
  )
}

export function AutocompleteCollection({ ...props }: AutocompleteCollectionProps) {
  return <BaseAutocomplete.Collection data-slot='autocomplete-collection' {...props} />
}

export function AutocompleteRow({ className, ...props }: AutocompleteRowProps) {
  const styles = autocompleteStyles()
  return <div data-slot='autocomplete-row' className={styles.row({ className })} {...props} />
}

export function AutocompleteItem({ className, ...props }: AutocompleteItemProps) {
  const styles = autocompleteStyles()
  return (
    <BaseAutocomplete.Item
      data-slot='autocomplete-item'
      className={cx(styles.item(), className)}
      {...props}
    />
  )
}

export function AutocompleteSeparator({ className, ...props }: AutocompleteSeparatorProps) {
  const styles = autocompleteStyles()
  return (
    <BaseAutocomplete.Separator
      data-slot='autocomplete-separator'
      className={cx(styles.separator(), className)}
      {...props}
    />
  )
}
