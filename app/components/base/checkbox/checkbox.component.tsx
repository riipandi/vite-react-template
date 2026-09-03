/**
 * A checkbox component with checkmark and indeterminate states.
 *
 * @see: https://base-ui.com/react/components/checkbox
 * @see: https://github.com/reshaped-ui/reshaped
 *
 * Anatomy:
 * <label>
 *   <Checkbox.Root>       // span[role=checkbox] + hidden input
 *     <Checkbox.Indicator>  // checkmark / dash
 *   </Checkbox.Root>
 *   {children}
 * </label>
 */

import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import type { CheckboxRootProps } from '@base-ui/react/checkbox'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import React from 'react'
import { customClassName } from '#/styles/core/utils.stylex'
import { CheckboxGroupContext } from './checkbox-group.context'
import { checkboxStyles } from './checkbox.stylex'

type Size = keyof typeof checkboxStyles.sizes

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CheckboxProps extends Omit<CheckboxRootProps, 'className' | 'style'> {
  /** Node for inserting the label. */
  children?: React.ReactNode
  /** Component size. @default "medium" */
  size?: Size
  /** Show an error state. */
  hasError?: boolean
  /** Additional attributes for the root label element. */
  attributes?: React.ComponentProps<'label'>
  /** Additional class name for the root element. */
  className?: string
  /** StyleX styles. */
  style?: StyleXStyles
}

// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------

export function Checkbox({
  size = 'medium',
  hasError = false,
  disabled = false,
  attributes,
  className,
  style,
  children,
  ...props
}: CheckboxProps) {
  const groupContext = React.useContext(CheckboxGroupContext)
  const isDisabled = disabled || groupContext?.disabled
  const showError = hasError || groupContext?.hasError

  return (
    <label
      data-slot='checkbox'
      {...attributes}
      {...stylex.props(
        checkboxStyles.root.label,
        checkboxStyles.gaps[size],
        isDisabled && checkboxStyles.root.labelDisabled,
        customClassName(className),
        style
      )}
    >
      <BaseCheckbox.Root
        disabled={isDisabled}
        className={(state) =>
          stylex.props(
            checkboxStyles.field.box,
            checkboxStyles.sizes[size],
            (state.checked || state.indeterminate) && checkboxStyles.field.checked,
            showError && !state.checked && !state.indeterminate && checkboxStyles.field.error,
            state.disabled && checkboxStyles.field.disabled,
            state.disabled &&
              (state.checked || state.indeterminate) &&
              checkboxStyles.field.disabledChecked
          ).className
        }
        {...props}
      >
        <BaseCheckbox.Indicator
          keepMounted
          render={(renderProps, state) => (
            <span
              {...renderProps}
              {...stylex.props(
                checkboxStyles.indicator.root,
                (state.checked || state.indeterminate) && checkboxStyles.indicator.visible,
                state.disabled && checkboxStyles.indicator.disabled
              )}
            >
              {state.indeterminate ? (
                <span {...stylex.props(checkboxStyles.dash.root)} />
              ) : (
                <svg
                  {...stylex.props(checkboxStyles.icon.root)}
                  viewBox='0 0 12 12'
                  fill='none'
                  aria-hidden='true'
                >
                  <path
                    d='M2.5 6 L5 8.5 L9.5 3.5'
                    stroke='currentcolor'
                    strokeWidth={1.5}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
            </span>
          )}
        />
      </BaseCheckbox.Root>
      {children && (
        <span
          data-slot='checkbox-label'
          {...stylex.props(
            checkboxStyles.labelText[size],
            isDisabled && checkboxStyles.root.labelDisabled
          )}
        >
          {children}
        </span>
      )}
    </label>
  )
}
