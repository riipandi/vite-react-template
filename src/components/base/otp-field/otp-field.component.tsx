import './style.css'
import { OTPField as OTPFieldPrimitive } from '@base-ui/react/otp-field'

function OTPField(props: OTPFieldPrimitive.Root.Props) {
  return <OTPFieldPrimitive.Root data-ui='otp-field' {...props} />
}

function OTPFieldInput(props: OTPFieldPrimitive.Input.Props) {
  return <OTPFieldPrimitive.Input data-ui='otp-field-input' {...props} />
}

export { OTPField, OTPFieldInput }
