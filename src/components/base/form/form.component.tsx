/**
 * A native form element with consolidated error handling.
 *
 * @see: https://base-ui.com/react/components/form
 */

import { Form as BaseForm } from '@base-ui/react/form'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { formStyles } from './form.stylex'

export type FormProps = React.ComponentProps<typeof BaseForm> & {
  xstyle?: StyleXStyles
}

export function Form({ xstyle, ...props }: FormProps) {
  return <BaseForm data-slot='form' {...stylex.props(formStyles.root, xstyle)} {...props} />
}
