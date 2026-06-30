import './style.css'
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'

function CheckBox(props: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root data-ui='checkbox' {...props}>
      <CheckboxPrimitive.Indicator data-ui='checkbox-indicator' />
    </CheckboxPrimitive.Root>
  )
}

export { CheckBox }
