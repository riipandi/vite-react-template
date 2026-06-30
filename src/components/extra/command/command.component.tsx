import './style.css'
import { Dialog as CommandDialogPrimitive } from '@base-ui/react/dialog'
import * as Lucide from 'lucide-react'
import type * as React from 'react'
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteSeparator
} from '../../base/autocomplete'

const CommandDialog = CommandDialogPrimitive.Root

const CommandDialogPortal = CommandDialogPrimitive.Portal

const CommandCreateHandle = CommandDialogPrimitive.createHandle

function CommandDialogTrigger(props: CommandDialogPrimitive.Trigger.Props) {
  return <CommandDialogPrimitive.Trigger data-slot='command-dialog-trigger' {...props} />
}

function CommandDialogBackdrop({ ...props }: CommandDialogPrimitive.Backdrop.Props) {
  return <CommandDialogPrimitive.Backdrop data-ui='command-dialog-backdrop' {...props} />
}

function CommandDialogViewport({ ...props }: CommandDialogPrimitive.Viewport.Props) {
  return <CommandDialogPrimitive.Viewport data-ui='command-dialog-viewport' {...props} />
}

function CommandDialogContent({ children, ...props }: CommandDialogPrimitive.Popup.Props) {
  return (
    <CommandDialogPortal>
      <CommandDialogBackdrop data-slot='command-dialog-overlay' />

      <CommandDialogViewport>
        <CommandDialogPrimitive.Popup data-ui='command-dialog-content' {...props}>
          {children}
        </CommandDialogPrimitive.Popup>
      </CommandDialogViewport>
    </CommandDialogPortal>
  )
}

function Command({
  autoHighlight = 'always',
  keepHighlight = true,
  ...props
}: React.ComponentProps<typeof Autocomplete>) {
  return (
    <Autocomplete
      autoHighlight={autoHighlight}
      inline
      keepHighlight={keepHighlight}
      open
      {...props}
    />
  )
}

function CommandInput({
  placeholder = undefined,
  ...props
}: React.ComponentProps<typeof AutocompleteInput>) {
  return (
    <div data-ui='command-input-wrapper'>
      <AutocompleteInput
        placeholder={placeholder}
        startAddon={<Lucide.Command size={16} />}
        {...props}
      />
    </div>
  )
}

function CommandList({ ...props }: React.ComponentProps<typeof AutocompleteList>) {
  return <AutocompleteList data-ui='command-list' {...props} />
}

function CommandEmpty({ ...props }: React.ComponentProps<typeof AutocompleteEmpty>) {
  return <AutocompleteEmpty data-slot='command-empty' {...props} />
}

function CommandPanel({ ...props }: React.ComponentProps<'div'>) {
  return <div data-ui='command-panel' {...props} />
}

function CommandGroup({ ...props }: React.ComponentProps<typeof AutocompleteGroup>) {
  return <AutocompleteGroup data-ui='command-group' {...props} />
}

function CommandGroupLabel({ ...props }: React.ComponentProps<typeof AutocompleteGroupLabel>) {
  return <AutocompleteGroupLabel data-ui='command-group-label' {...props} />
}

function CommandCollection({ ...props }: React.ComponentProps<typeof AutocompleteCollection>) {
  return <AutocompleteCollection data-ui='command-collection' {...props} />
}

function CommandItem({ ...props }: React.ComponentProps<typeof AutocompleteItem>) {
  return <AutocompleteItem data-ui='command-item' {...props} />
}

function CommandSeparator({ ...props }: React.ComponentProps<typeof AutocompleteSeparator>) {
  return <AutocompleteSeparator data-slot='command-separator' {...props} />
}

function CommandShortcut({ ...props }: React.ComponentProps<'kbd'>) {
  return <kbd data-slot='command-shortcut' {...props} />
}

function CommandFooter({ ...props }: React.ComponentProps<'div'>) {
  return <div data-ui='command-footer' {...props} />
}

export {
  CommandCreateHandle,
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogContent,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
  CommandShortcut
}
