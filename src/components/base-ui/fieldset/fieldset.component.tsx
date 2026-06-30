import './style.css'
import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset'

function Fieldset(props: FieldsetPrimitive.Root.Props) {
  return <FieldsetPrimitive.Root data-ui='fieldset' {...props} />
}

function FieldsetLegend(props: FieldsetPrimitive.Legend.Props) {
  return <FieldsetPrimitive.Legend data-ui='fieldset-legend' {...props} />
}

function FieldsetDescription(props: React.ComponentProps<'p'>) {
  return <p data-ui='fieldset-description' {...props} />
}

export { Fieldset, FieldsetLegend, FieldsetDescription }
