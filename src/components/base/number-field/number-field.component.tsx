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
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { numberFieldStyles, numberFieldVariants } from './number-field.stylex'

export type NumberFieldVariant = keyof typeof numberFieldVariants

export type NumberFieldProps = React.ComponentProps<typeof BaseNumberField.Root> & {
  xstyle?: StyleXStyles
}
export type NumberFieldGroupProps = React.ComponentProps<typeof BaseNumberField.Group> & {
  variant?: NumberFieldVariant
  xstyle?: StyleXStyles
}

export function NumberField({ xstyle, ...props }: NumberFieldProps) {
  return (
    <BaseNumberField.Root
      data-slot='number-field'
      {...stylex.props(numberFieldStyles.base, xstyle)}
      {...props}
    />
  )
}

export function NumberFieldScrubArea({
  children,
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseNumberField.ScrubArea> & { xstyle?: StyleXStyles }) {
  return (
    <BaseNumberField.ScrubArea
      data-slot='number-field-scrub-area'
      {...stylex.props(numberFieldStyles.scrubArea, xstyle)}
      {...props}
    >
      {children}
      <NumberFieldScrubAreaCursor />
    </BaseNumberField.ScrubArea>
  )
}

export function NumberFieldScrubAreaCursor(
  props: React.ComponentProps<typeof BaseNumberField.ScrubAreaCursor>
) {
  return (
    <BaseNumberField.ScrubAreaCursor data-slot='number-field-scrub-area-cursor' {...props}>
      <svg
        width='26'
        height='14'
        viewBox='0 0 24 14'
        fill='black'
        stroke='white'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z' />
      </svg>
    </BaseNumberField.ScrubAreaCursor>
  )
}

export function NumberFieldGroup({ variant = 'default', xstyle, ...props }: NumberFieldGroupProps) {
  return (
    <BaseNumberField.Group
      data-slot='number-field-group'
      {...stylex.props(numberFieldStyles.group, numberFieldVariants[variant], xstyle)}
      {...props}
    />
  )
}

export function NumberFieldDecrement({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Decrement> & { xstyle?: StyleXStyles }) {
  return (
    <BaseNumberField.Decrement
      data-slot='number-field-decrement'
      {...stylex.props(numberFieldStyles.decrement, xstyle)}
      {...props}
    />
  )
}

export function NumberFieldIncrement({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Increment> & { xstyle?: StyleXStyles }) {
  return (
    <BaseNumberField.Increment
      data-slot='number-field-increment'
      {...stylex.props(numberFieldStyles.increment, xstyle)}
      {...props}
    />
  )
}

export function NumberFieldInput({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Input> & { xstyle?: StyleXStyles }) {
  return (
    <BaseNumberField.Input
      data-slot='number-field-input'
      {...stylex.props(numberFieldStyles.input, xstyle)}
      {...props}
    />
  )
}
