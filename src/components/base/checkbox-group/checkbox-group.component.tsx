import './style.css'
import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group'

function CheckboxGroup(props: CheckboxGroupPrimitive.Props) {
  return <CheckboxGroupPrimitive data-ui='checkbox-group' {...props} />
}

export { CheckboxGroup }
