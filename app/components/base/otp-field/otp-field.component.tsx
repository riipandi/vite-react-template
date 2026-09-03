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
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { otpFieldStyles as s } from './otp-field.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export function OTPField({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseOTPField.Root>, 'className' | 'style'> &
  StyleProp) {
  return <BaseOTPField.Root {...props} {...stylex.props(s.root, style)} />
}

export function OTPFieldGroup({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return <div {...props} {...stylex.props(s.group, style)} />
}

export function OTPFieldSlot({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseOTPField.Input>, 'className' | 'style'> &
  StyleProp) {
  return <BaseOTPField.Input {...props} {...stylex.props(s.slot, style)} />
}

export function OTPFieldSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return (
    <div role='separator' {...props} {...stylex.props(s.separator, style)}>
      <svg
        width='16'
        height='16'
        viewBox={`0 0 16 16`}
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        aria-hidden
      >
        <path d={`M4 8h8`} />
      </svg>
    </div>
  )
}
