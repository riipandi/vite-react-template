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
import * as Lucide from 'lucide-react'
import * as React from 'react'
import { numberFieldStyles as s } from './number-field.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

/** Button placement style of the default group. */
export type NumberFieldControls = 'stacked' | 'sides'

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
  controls = 'stacked',
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Group>, 'className' | 'style'> &
  StyleProp & { controls?: NumberFieldControls }) {
  return (
    <BaseNumberField.Group {...props} {...stylex.props(s.group, style)}>
      {children ?? (
        <>
          {controls === 'stacked' ? (
            <>
              <NumberFieldInput />
              <span {...stylex.props(s.controls)}>
                <NumberFieldIncrement controls='stacked' aria-label='Increase' />
                <NumberFieldDecrement controls='stacked' aria-label='Decrease' />
              </span>
            </>
          ) : (
            <>
              <NumberFieldDecrement aria-label='Decrease' />
              <NumberFieldInput />
              <NumberFieldIncrement aria-label='Increase' />
            </>
          )}
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
  icon,
  controls = 'sides',
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Decrement>, 'className' | 'style'> &
  StyleProp & {
    icon?: 'chevron-down' | 'minus'
    controls?: NumberFieldControls
  }) {
  const stacked = controls === 'stacked'
  const preset = icon ?? (stacked ? 'chevron-down' : 'minus')
  const Icon = preset === 'chevron-down' ? Lucide.ChevronDown : Lucide.Minus

  return (
    <BaseNumberField.Decrement
      {...props}
      {...stylex.props(
        s.button,
        stacked ? [s.controlStacked, s.controlStackedLast] : s.decrement,
        style
      )}
    >
      {children ?? <Icon size={16} strokeWidth={2} aria-hidden />}
    </BaseNumberField.Decrement>
  )
}

export function NumberFieldIncrement({
  style,
  children,
  icon,
  controls = 'sides',
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Increment>, 'className' | 'style'> &
  StyleProp & {
    icon?: 'chevron-up' | 'plus'
    controls?: NumberFieldControls
  }) {
  const stacked = controls === 'stacked'
  const preset = icon ?? (stacked ? 'chevron-up' : 'plus')
  const Icon = preset === 'chevron-up' ? Lucide.ChevronUp : Lucide.Plus

  return (
    <BaseNumberField.Increment
      {...props}
      {...stylex.props(
        s.button,
        stacked ? [s.controlStacked, s.controlStackedFirst] : s.increment,
        style
      )}
    >
      {children ?? <Icon size={16} strokeWidth={2} aria-hidden />}
    </BaseNumberField.Increment>
  )
}
