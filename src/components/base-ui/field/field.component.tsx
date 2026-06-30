import './style.css'
import { Field as FieldPrimitive } from '@base-ui/react/field'
import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset'

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

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-ui='field-group' {...props} />
}

function Fieldset(props: FieldsetPrimitive.Root.Props) {
  return <FieldsetPrimitive.Root data-ui='fieldset' {...props} />
}

function FieldsetDescription(props: React.ComponentProps<'p'>) {
  return <p {...props} data-ui='fieldset-description' />
}

function FieldsetLegend(props: FieldsetPrimitive.Legend.Props) {
  return <FieldsetPrimitive.Legend data-ui='fieldset-legend' {...props} />
}

const FieldControl = FieldPrimitive.Control
const FieldValidity = FieldPrimitive.Validity

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
  FieldGroup,
  FieldControl,
  FieldValidity
}
