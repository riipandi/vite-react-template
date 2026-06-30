import '../../../styles/shared/select-base.css'
import './style.css'
import { Combobox as ComboboxPrimitive } from '@base-ui/react'
import * as Lucide from 'lucide-react'
import React from 'react'
import { InputWrapper } from '../../extra/input-group'
import { Tag, TagDismiss } from '../../extra/tag'
import { Button } from '../button'
import { Input } from '../input'

const Combobox = ComboboxPrimitive.Root

function ComboboxValue(props: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot='combobox-value' {...props} />
}

function ComboboxTrigger({ ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot='combobox-trigger'
      render={
        <Button variant='neutral' mode='ghost' size='sm' asIcon>
          <Lucide.ChevronsUpDown size={16} />
        </Button>
      }
      {...props}
    />
  )
}

function ComboboxClear(props: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot='combobox-clear'
      render={
        <Button variant='neutral' mode='ghost' size='sm' asIcon>
          <Lucide.X size={16} />
        </Button>
      }
      {...props}
    />
  )
}

function ComboboxInput({
  disabled = false,
  showClear = true,
  showTrigger = true,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputWrapper data-slot='combobox-input'>
      <ComboboxPrimitive.Input render={<Input disabled={disabled} />} {...props} />

      <div data-ui='combobox-input-actions'>
        {showClear && <ComboboxClear />}
        {showTrigger && <ComboboxTrigger />}
      </div>
    </InputWrapper>
  )
}

function ComboboxContent({
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        data-ui='combobox-positioner'
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
      >
        <ComboboxPrimitive.Popup data-ui='combobox-content' data-chips={!!anchor} {...props} />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxEmpty(props: ComboboxPrimitive.Empty.Props) {
  return <ComboboxPrimitive.Empty data-ui='combobox-empty' {...props} />
}

function ComboboxList(props: ComboboxPrimitive.List.Props) {
  return <ComboboxPrimitive.List data-slot='combobox-list' {...props} />
}

function ComboboxItem({ children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item data-ui='combobox-item' {...props}>
      {children}
      <ComboboxPrimitive.ItemIndicator data-ui='combobox-item-indicator' />
    </ComboboxPrimitive.Item>
  )
}

function ComboboxChips(
  props: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> & ComboboxPrimitive.Chips.Props
) {
  return <ComboboxPrimitive.Chips data-ui='combobox-chips' {...props} />
}

function ComboboxChip({ ...props }: ComboboxPrimitive.Chip.Props) {
  return (
    <ComboboxPrimitive.Chip
      render={({ children, ...rest }) => (
        <Tag variant='lighter' {...rest}>
          {children}
          <ComboboxPrimitive.ChipRemove render={<TagDismiss />} />
        </Tag>
      )}
      {...props}
    />
  )
}

function ComboboxChipsInput(props: ComboboxPrimitive.Input.Props) {
  return <ComboboxPrimitive.Input data-slot='combobox-chips-input' {...props} />
}

function ComboboxGroup(props: ComboboxPrimitive.Group.Props) {
  return <ComboboxPrimitive.Group data-ui='combobox-group' {...props} />
}

function ComboboxLabel(props: ComboboxPrimitive.GroupLabel.Props) {
  return <ComboboxPrimitive.GroupLabel data-ui='combobox-label' {...props} />
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot='combobox-collection' {...props} />
}

function ComboboxSeparator(props: ComboboxPrimitive.Separator.Props) {
  return <ComboboxPrimitive.Separator data-slot='combobox-separator' {...props} />
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxValue,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxSeparator,
  useComboboxAnchor
}
