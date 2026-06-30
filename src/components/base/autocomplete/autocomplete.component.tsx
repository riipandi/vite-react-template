import './style.css'
import '../../../styles/shared/select-base.css'
import { Autocomplete as AutocompletePrimitive } from '@base-ui/react/autocomplete'
import * as Lucide from 'lucide-react'
import { InputIcon, InputWrapper } from '../../extra/input-group'
import { Button } from '../button'
import { Input } from '../input'
import { ScrollArea } from '../scroll-area'
import { Separator } from '../separator'

const Autocomplete = AutocompletePrimitive.Root

function AutocompleteInput({
  showTrigger = false,
  showClear = false,
  startAddon,
  ...props
}: AutocompletePrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
  startAddon?: React.ReactNode
}) {
  return (
    <InputWrapper data-slot='autocomplete-input'>
      {startAddon && (
        <InputIcon data-slot='start-addon' aria-hidden='true'>
          {startAddon}
        </InputIcon>
      )}

      <AutocompletePrimitive.Input render={<Input />} {...props} />

      <div data-ui='autocomplete-input-actions'>
        {showTrigger && (
          <AutocompletePrimitive.Trigger
            render={
              <Button variant='neutral' mode='ghost' size='sm' asIcon>
                <Lucide.ChevronsUpDown size={16} />
              </Button>
            }
          />
        )}

        {showClear && (
          <AutocompletePrimitive.Clear
            render={
              <Button variant='neutral' mode='ghost' size='sm' asIcon>
                <Lucide.X size={16} />
              </Button>
            }
          />
        )}
      </div>
    </InputWrapper>
  )
}

function AutocompletePopup({
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  ...props
}: AutocompletePrimitive.Popup.Props &
  Pick<AutocompletePrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
  return (
    <AutocompletePrimitive.Portal>
      <AutocompletePrimitive.Positioner
        data-ui='autocomplete-positioner'
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <AutocompletePrimitive.Popup data-ui='autocomplete-content' {...props}>
          {children}
        </AutocompletePrimitive.Popup>
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  )
}

function AutocompleteItem({ children, ...props }: AutocompletePrimitive.Item.Props) {
  return (
    <AutocompletePrimitive.Item data-ui='autocomplete-item' {...props}>
      {children}
    </AutocompletePrimitive.Item>
  )
}

function AutocompleteSeparator(props: AutocompletePrimitive.Separator.Props) {
  return (
    <AutocompletePrimitive.Separator
      data-slot='autocomplete-separator'
      render={<Separator />}
      {...props}
    />
  )
}

function AutocompleteGroup(props: AutocompletePrimitive.Group.Props) {
  return <AutocompletePrimitive.Group data-ui='autocomplete-group' {...props} />
}

function AutocompleteGroupLabel(props: AutocompletePrimitive.GroupLabel.Props) {
  return <AutocompletePrimitive.GroupLabel data-ui='autocomplete-group-label' {...props} />
}

function AutocompleteEmpty(props: AutocompletePrimitive.Empty.Props) {
  return <AutocompletePrimitive.Empty data-ui='autocomplete-empty' {...props} />
}

function AutocompleteRow(props: AutocompletePrimitive.Row.Props) {
  return <AutocompletePrimitive.Row data-ui='autocomplete-row' {...props} />
}

function AutocompleteValue(props: AutocompletePrimitive.Value.Props) {
  return <AutocompletePrimitive.Value data-ui='autocomplete-value' {...props} />
}

function AutocompleteList(props: AutocompletePrimitive.List.Props) {
  return (
    <ScrollArea scrollFade>
      <AutocompletePrimitive.List data-slot='autocomplete-list' {...props} />
    </ScrollArea>
  )
}

function AutocompleteClear(props: AutocompletePrimitive.Clear.Props) {
  return (
    <AutocompletePrimitive.Clear data-ui='autocomplete-clear' {...props}>
      <Lucide.X size={16} />
    </AutocompletePrimitive.Clear>
  )
}

function AutocompleteStatus(props: AutocompletePrimitive.Status.Props) {
  return <AutocompletePrimitive.Status data-ui='autocomplete-status' {...props} />
}

function AutocompleteCollection(props: AutocompletePrimitive.Collection.Props) {
  return <AutocompletePrimitive.Collection data-ui='autocomplete-collection' {...props} />
}

function AutocompleteTrigger(props: AutocompletePrimitive.Trigger.Props) {
  return (
    <AutocompletePrimitive.Trigger data-ui='autocomplete-trigger' {...props}>
      <Lucide.ChevronsUpDown size={16} />
    </AutocompletePrimitive.Trigger>
  )
}

const useAutocompleteFilter = AutocompletePrimitive.useFilter

export {
  Autocomplete,
  AutocompleteInput,
  AutocompleteTrigger,
  AutocompletePopup,
  AutocompleteItem,
  AutocompleteSeparator,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteEmpty,
  AutocompleteValue,
  AutocompleteList,
  AutocompleteClear,
  AutocompleteStatus,
  AutocompleteRow,
  AutocompleteCollection,
  useAutocompleteFilter
}
