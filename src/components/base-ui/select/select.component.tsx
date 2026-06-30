import './style.css'
import '../shared/select-base.css'
import { Select as SelectPrimitive } from '@base-ui/react/select'
import { ArrowDown01Icon, ArrowUp01Icon, UnfoldMoreIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

const Select = SelectPrimitive.Root

function SelectGroup({ ...props }: SelectPrimitive.Group.Props) {
  return <SelectPrimitive.Group data-ui='select-group' {...props} />
}

function SelectValue({ ...props }: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value data-ui='select-value' {...props} />
}

function SelectTrigger({
  children,
  size = 'md',
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <SelectPrimitive.Trigger data-ui='select-trigger' data-size={size} {...props}>
      {children}
      <SelectPrimitive.Icon data-ui='icon'>
        <HugeiconsIcon icon={UnfoldMoreIcon} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
  >) {
  return (
    <SelectPrimitive.Portal data-ui='select-portal'>
      <SelectPrimitive.Positioner
        data-ui='select-positioner'
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
      >
        <SelectPrimitive.Popup data-ui='select-content' {...props}>
          <SelectPrimitive.ScrollUpArrow data-ui='scroll-arrow'>
            <HugeiconsIcon icon={ArrowUp01Icon} />
          </SelectPrimitive.ScrollUpArrow>
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectPrimitive.ScrollDownArrow data-ui='scroll-arrow'>
            <HugeiconsIcon icon={ArrowDown01Icon} />
          </SelectPrimitive.ScrollDownArrow>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectSeparator({ ...props }: SelectPrimitive.Separator.Props) {
  return <SelectPrimitive.Separator data-ui='select-separator' {...props} />
}

function SelectLabel({ ...props }: SelectPrimitive.GroupLabel.Props) {
  return <SelectPrimitive.GroupLabel data-ui='select-label' {...props} />
}

function SelectItem({ children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item data-ui='select-item' {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <span data-ui='select-item-indicator' />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectValue,
  SelectItem,
  SelectLabel,
  SelectSeparator
}
