/**
 * A group of radio buttons sharing a selection value.
 *
 * @see: https://base-ui.com/react/components/radio
 * @see: https://github.com/reshaped-ui/reshaped
 *
 * Usage:
 * <RadioGroup name='size' defaultValue='m' onValueChange={...}>
 *   <Radio value='s'>Small</Radio>
 *   <Radio value='m'>Medium</Radio>
 * </RadioGroup>
 */

import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import type { RadioGroupProps as BaseRadioGroupProps } from '@base-ui/react/radio-group'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import React from 'react'
import { customClassName } from '#/styles/core/utils.stylex'
import { RadioGroupContext } from './radio-group.context'
import { radioGroupStyles } from './radio-group.stylex'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RadioGroupProps extends Omit<BaseRadioGroupProps<string>, 'className' | 'style'> {
  /** Node for inserting radio buttons or custom layout components. */
  children?: React.ReactNode
  /** Show an error state on all child radio buttons. */
  hasError?: boolean
  /** The controlled value of the radio item that should be selected. */
  value?: string
  /** The uncontrolled value of the radio item that should be initially selected. */
  defaultValue?: string
  /** Additional class name for the root element. */
  className?: string
  /** StyleX styles. */
  style?: StyleXStyles
}

// ---------------------------------------------------------------------------
// Radio Group
// ---------------------------------------------------------------------------

export function RadioGroup({
  hasError = false,
  disabled = false,
  className,
  style,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ hasError, disabled }}>
      <BaseRadioGroup
        data-slot='radio-group'
        disabled={disabled}
        {...props}
        {...stylex.props(radioGroupStyles.root, customClassName(className), style)}
      >
        {children}
      </BaseRadioGroup>
    </RadioGroupContext.Provider>
  )
}
