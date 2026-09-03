import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space } from '#/lib/constants.stylex'
import { font } from '#/lib/tokens.stylex'

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
  return <BaseCheckboxGroup {...props} {...stylex.props(styles.root, style)} />
}

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: font.sans,
    gap: space.s2
  }
})
