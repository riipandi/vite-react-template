import './style.css'
import { Form as FormPrimitive } from '@base-ui/react/form'

function Form<FormValues extends Record<string, unknown> = Record<string, unknown>>({
  ...props
}: FormPrimitive.Props<FormValues>) {
  return <FormPrimitive data-ui='form' {...props} />
}

export { Form }
