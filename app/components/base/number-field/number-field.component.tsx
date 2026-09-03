/**
 * A numeric input element with increment and decrement buttons, and a scrub area.
 *
 * @see: https://base-ui.com/react/components/number-field
 *
 * BaseUI Anatomy:
 * <NumberField.Root>
 *   <NumberField.ScrubArea>
 *     <NumberField.ScrubAreaCursor />
 *   </NumberField.ScrubArea>
 *   <NumberField.Group>
 *     <NumberField.Decrement />
 *     <NumberField.Input />
 *     <NumberField.Increment />
 *   </NumberField.Group>
 * </NumberField.Root>
 */

import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { numberFieldStyles as s } from './number-field.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export const NumberFieldScrubArea = BaseNumberField.ScrubArea
export const NumberFieldScrubAreaCursor = BaseNumberField.ScrubAreaCursor

export function NumberField({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Root>, 'className' | 'style'> &
  StyleProp) {
  return <BaseNumberField.Root {...props} {...stylex.props(s.root, style)} />
}

export function NumberFieldGroup({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Group>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseNumberField.Group {...props} {...stylex.props(s.group, style)}>
      {children ?? (
        <>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </>
      )}
    </BaseNumberField.Group>
  )
}

export function NumberFieldInput({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Input>, 'className' | 'style'> &
  StyleProp) {
  return <BaseNumberField.Input {...props} {...stylex.props(s.input, style)} />
}

export function NumberFieldDecrement({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Decrement>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseNumberField.Decrement {...props} {...stylex.props(s.button, s.decrement, style)}>
      {children ?? (
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
      )}
    </BaseNumberField.Decrement>
  )
}

export function NumberFieldIncrement({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Increment>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseNumberField.Increment {...props} {...stylex.props(s.button, s.increment, style)}>
      {children ?? (
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
          <path d={`M8 4v8M4 8h8`} />
        </svg>
      )}
    </BaseNumberField.Increment>
  )
}
