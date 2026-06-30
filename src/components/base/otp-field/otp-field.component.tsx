/**
 * A one-time password input composed of individual character slots.
 *
 * @see: https://base-ui.com/react/components/otp-field
 *
 * BaseUI Anatomy:
 * <OTPField.Root>
 *   <OTPField.Input />
 *   <OTPField.Separator />
 * </OTPField.Root>
 */

import { OTPField as BaseOTPField } from '@base-ui/react/otp-field'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { otpFieldStyles, otpFieldSizes } from './otp-field.stylex'

export type OTPFieldSize = keyof typeof otpFieldSizes

export type OTPFieldRootProps = React.ComponentProps<typeof BaseOTPField.Root> & {
  size?: OTPFieldSize
  xstyle?: StyleXStyles
}
export type OTPFieldInputProps = Omit<React.ComponentProps<typeof BaseOTPField.Input>, 'size'> & {
  size?: OTPFieldSize
  xstyle?: StyleXStyles
}
export type OTPFieldSeparatorProps = React.ComponentProps<typeof BaseOTPField.Separator> & {
  size?: OTPFieldSize
  xstyle?: StyleXStyles
}

export function OTPField({ size, xstyle, ...props }: OTPFieldRootProps) {
  return (
    <BaseOTPField.Root
      data-slot='otp-field'
      {...stylex.props(otpFieldStyles.root, size && otpFieldSizes[size], xstyle)}
      {...props}
    />
  )
}

export function OTPFieldInput({ size, xstyle, ...props }: OTPFieldInputProps) {
  return (
    <BaseOTPField.Input
      data-slot='otp-field-input'
      {...stylex.props(otpFieldStyles.input, size && otpFieldSizes[size], xstyle)}
      {...props}
    />
  )
}

export function OTPFieldSeparator({ size, xstyle, ...props }: OTPFieldSeparatorProps) {
  return (
    <BaseOTPField.Separator
      data-slot='otp-field-separator'
      {...stylex.props(otpFieldStyles.separator, size && otpFieldSizes[size], xstyle)}
      {...props}
    />
  )
}
