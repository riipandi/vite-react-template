/**
 * A native form element with consolidated error handling.
 *
 * @see: https://base-ui.com/react/components/form
 *
 * BaseUI Anatomy:
 * <Form>
 *   <Field.Root>
 *     <Field.Label />
 *     <Field.Control />
 *     <Field.Error />
 *   </Field.Root>
 * </Form>
 */

import { Form as BaseForm } from '@base-ui/react/form'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { cx } from 'css-variants'

const formStyles = tv({
  base: 'flex flex-col gap-4 text-sm'
})

export type FormProps = React.ComponentProps<typeof BaseForm>

export function Form({ className, ...props }: FormProps) {
  const styles = formStyles()
  return <BaseForm data-slot='form' className={cx(styles, className)} {...props} />
}
