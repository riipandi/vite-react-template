import './style.css'
import { NumberField as NumberFieldPrimitive } from '@base-ui/react/number-field'
import * as Lucide from 'lucide-react'

function NumberField(props: NumberFieldPrimitive.Root.Props) {
  return <NumberFieldPrimitive.Root data-ui='number-field' {...props} />
}

function NumberFieldScrubArea({ children, ...props }: NumberFieldPrimitive.ScrubArea.Props) {
  return (
    <NumberFieldPrimitive.ScrubArea data-ui='number-field-scrub-area' {...props}>
      {children}
      <NumberFieldPrimitive.ScrubAreaCursor>
        <Lucide.GripHorizontal size={16} />
      </NumberFieldPrimitive.ScrubAreaCursor>
    </NumberFieldPrimitive.ScrubArea>
  )
}

function NumberFieldGroup(props: NumberFieldPrimitive.Group.Props) {
  return <NumberFieldPrimitive.Group data-ui='number-field-control-group' {...props} />
}

function NumberFieldInput(props: NumberFieldPrimitive.Input.Props) {
  return <NumberFieldPrimitive.Input data-slot='number-field-input' {...props} />
}

function NumberFieldIncrement(props: NumberFieldPrimitive.Increment.Props) {
  return <NumberFieldPrimitive.Increment data-slot='number-field-increment' {...props} />
}

function NumberFieldDecrement(props: NumberFieldPrimitive.Decrement.Props) {
  return <NumberFieldPrimitive.Decrement data-slot='number-field-decrement' {...props} />
}

export {
  NumberField,
  NumberFieldScrubArea,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement
}
