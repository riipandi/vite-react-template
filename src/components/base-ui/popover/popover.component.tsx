import './style.css'
import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '../button'

const PopoverCreateHandle = PopoverPrimitive.createHandle

function Popover(props: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root {...props} />
}

function PopoverTrigger(props: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />
}

function PopoverContent({
  align = 'center',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 8,
  children,
  tooltipStyle = false,
  ...props
}: PopoverPrimitive.Popup.Props & { tooltipStyle?: boolean } & Pick<
    PopoverPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  >) {
  return (
    <PopoverPrimitive.Portal data-ui='popover-portal'>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup data-ui='popover-content' data-tooltip={tooltipStyle} {...props}>
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverClose({ ...props }: PopoverPrimitive.Close.Props) {
  return (
    <PopoverPrimitive.Close
      aria-label='Close'
      data-slot='popover-close'
      render={
        <Button variant='neutral' mode='ghost' size='sm' asIcon>
          <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
        </Button>
      }
      {...props}
    />
  )
}

function PopoverHeader(props: React.ComponentProps<'div'>) {
  return <div data-ui='popover-header' {...props} />
}

function PopoverTitle(props: PopoverPrimitive.Title.Props) {
  return <PopoverPrimitive.Title data-ui='popover-title' {...props} />
}

function PopoverDescription(props: PopoverPrimitive.Description.Props) {
  return <PopoverPrimitive.Description data-ui='popover-description' {...props} />
}

export {
  PopoverCreateHandle,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription
}
