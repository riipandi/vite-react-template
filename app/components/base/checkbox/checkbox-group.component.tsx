/**
 * A group of checkboxes sharing a selection value.
 *
 * @see: https://base-ui.com/react/components/checkbox-group
 * @see: https://github.com/reshaped-ui/reshaped
 *
 * Usage:
 * <CheckboxGroup defaultValue={['a']} onValueChange={...}>
 *   <Checkbox value='a'>Option A</Checkbox>
 *   <Checkbox value='b'>Option B</Checkbox>
 * </CheckboxGroup>
 */

import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import type { CheckboxGroupProps as BaseCheckboxGroupProps } from '@base-ui/react/checkbox-group'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import React from 'react'
import { customClassName } from '#/styles/core/utils.stylex'
import { CheckboxGroupContext } from './checkbox-group.context'
import { checkboxGroupStyles } from './checkbox-group.stylex'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CheckboxGroupProps extends Omit<BaseCheckboxGroupProps, 'className' | 'style'> {
  /** Node for inserting checkboxes or custom layout components. */
  children?: React.ReactNode
  /** Show an error state on all child checkboxes. */
  hasError?: boolean
  /** Names of the checkboxes in the group that should be ticked. */
  value?: string[]
  /** Names of the checkboxes in the group that should be initially ticked. */
  defaultValue?: string[]
  /** Additional class name for the root element. */
  className?: string
  /** StyleX styles. */
  style?: StyleXStyles
}

// ---------------------------------------------------------------------------
// Checkbox Group
// ---------------------------------------------------------------------------

export function CheckboxGroup({
  hasError = false,
  disabled = false,
  className,
  style,
  children,
  ...props
}: CheckboxGroupProps) {
  return (
    <CheckboxGroupContext.Provider value={{ hasError, disabled }}>
      <BaseCheckboxGroup
        data-slot='checkbox-group'
        disabled={disabled}
        {...props}
        {...stylex.props(checkboxGroupStyles.root, customClassName(className), style)}
      >
        {children}
      </BaseCheckboxGroup>
    </CheckboxGroupContext.Provider>
  )
}
