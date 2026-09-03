import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { checkboxStyles, checkboxGroupStyles } from './checkbox.stylex'

export interface CheckboxProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function Checkbox({ style, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root {...props} {...stylex.props(checkboxStyles.root, style)}>
      <BaseCheckbox.Indicator
        render={(indicatorProps, state) => (
          <span {...indicatorProps} {...stylex.props(checkboxStyles.indicator)}>
            <svg
              width='12'
              height='12'
              viewBox={`0 0 12 12`}
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden
            >
              {state.indeterminate ? <path d={`M2.5 6h7`} /> : <path d={`M2 6.5 4.5 9 10 3`} />}
            </svg>
          </span>
        )}
      />
    </BaseCheckbox.Root>
  )
}

export interface CheckboxGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCheckboxGroup>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

/**
 * Shares checked state across Checkboxes: give each child Checkbox a `name`
 * and control the group with `value` / `defaultValue` (arrays of names).
 * A parent checkbox is supported via Base UI's `allValues`.
 */
export function CheckboxGroup({ style, ...props }: CheckboxGroupProps) {
  return <BaseCheckboxGroup {...props} {...stylex.props(checkboxGroupStyles.root, style)} />
}
