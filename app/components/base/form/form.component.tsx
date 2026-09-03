/**
 * A native form element with consolidated error handling.
 *
 * @see: https://base-ui.com/react/components/form
 */

import { Form as BaseForm } from '@base-ui/react/form'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { formStyles as s } from './form.stylex'

export interface FormProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseForm>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

/**
 * Built on Base UI Form: validates the Fields inside it (`validationMode`),
 * consolidates their errors, and accepts external errors — e.g. from a server
 * action — via the `errors` prop, keyed by Field `name`.
 */
export function Form({ style, ...props }: FormProps) {
  return <BaseForm {...props} {...stylex.props(s.root, style)} />
}
