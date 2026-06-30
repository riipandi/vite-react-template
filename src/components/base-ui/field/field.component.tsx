import './style.css'
import { Field as FieldPrimitive } from '@base-ui/react/field'

function Field({
  orientation = 'vertical',
  ...props
}: FieldPrimitive.Root.Props & {
  orientation?: 'horizontal' | 'vertical'
}) {
  return (
    <FieldPrimitive.Root role='group' data-ui='field' data-orientation={orientation} {...props} />
  )
}

function FieldLabel(props: FieldPrimitive.Label.Props) {
  return <FieldPrimitive.Label data-ui='field-label' {...props} />
}

function FieldDescription(props: FieldPrimitive.Description.Props) {
  return <FieldPrimitive.Description data-ui='field-description' {...props} />
}

function FieldError(props: FieldPrimitive.Error.Props) {
  return <FieldPrimitive.Error data-ui='field-error' {...props} />
}

function FieldGroup({ ...props }: React.ComponentProps<'div'>) {
  return <div data-ui='field-group' {...props} />
}

const FieldControl = FieldPrimitive.Control
const FieldValidity = FieldPrimitive.Validity

export { Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldControl, FieldValidity }
