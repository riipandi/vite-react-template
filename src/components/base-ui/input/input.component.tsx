import '../../../styles/shared/input-base.css'
import { Input as InputPrimitive } from '@base-ui/react/input'

function Input({ type, ...props }: InputPrimitive.Props) {
  return <InputPrimitive type={type} data-ui='input' {...props} />
}

export { Input }
