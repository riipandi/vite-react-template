import './style.css'
import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'

function RadioGroup(props: RadioGroupPrimitive.Props) {
  return <RadioGroupPrimitive data-ui='radio-group' {...props} />
}

function RadioGroupItem({ children, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root data-ui='radio-group-item' {...props}>
      {children}
      <RadioPrimitive.Indicator data-ui='radio-group-item-indicator' />
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
