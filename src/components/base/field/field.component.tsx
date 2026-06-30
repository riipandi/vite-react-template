/**
 * A component that provides labeling and validation for form controls.
 *
 * @see: https://base-ui.com/react/components/field
 *
 * BaseUI Anatomy:
 * <Field.Root>
 *   <Field.Label />
 *   <Field.Control />
 *   <Field.Description />
 *   <Field.Item />
 *   <Field.Error />
 *   <Field.Validity />
 * </Field.Root>
 */

import { Field as BaseField } from '@base-ui/react/field'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { cx } from 'css-variants'
import * as React from 'react'

export const fieldStyles = tv({
  base: 'flex flex-col gap-2 text-sm font-medium',
  slots: {
    item: [
      'grid grid-cols-[auto_1fr] items-center gap-2',
      '**:data-[slot=field-description]:col-start-2'
    ],
    label: 'text-foreground-neutral flex items-center gap-2',
    description: 'text-foreground-neutral-faded px-1 text-xs leading-relaxed',
    error: 'text-foreground-critical px-1 text-xs',
    errorListParent: 'ml-4 flex list-disc flex-col gap-1',
    errorList: '',
    validity: '',
    control: ''
  }
})

export type FieldRootProps = React.ComponentProps<typeof BaseField.Root>
export type FieldItemProps = React.ComponentProps<typeof BaseField.Item>
export type FieldLabelProps = React.ComponentProps<typeof BaseField.Label>
export type FieldDescriptionProps = React.ComponentProps<typeof BaseField.Description>
export type FieldErrorProps = React.ComponentProps<typeof BaseField.Error> & {
  errors?: Array<{ message?: string } | undefined>
}
export type FieldValidityProps = React.ComponentProps<typeof BaseField.Validity>
export type FieldControlProps = React.ComponentProps<typeof BaseField.Control>

export function Field({ className, ...props }: FieldRootProps) {
  const styles = fieldStyles()
  return <BaseField.Root data-slot='field' className={cx(styles.base(), className)} {...props} />
}

export function FieldItem({ className, ...props }: FieldItemProps) {
  const styles = fieldStyles()
  return (
    <BaseField.Item data-slot='field-item' className={cx(styles.item(), className)} {...props} />
  )
}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  const styles = fieldStyles()
  return (
    <BaseField.Label data-slot='field-label' className={cx(styles.label(), className)} {...props} />
  )
}

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  const styles = fieldStyles()
  return (
    <BaseField.Description
      data-slot='field-description'
      className={cx(styles.description(), className)}
      {...props}
    />
  )
}

export function FieldError({ className, errors, children, ...props }: FieldErrorProps) {
  const styles = fieldStyles()

  const content = React.useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()]

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className={styles.errorListParent()}>
        {uniqueErrors.map(
          (error, index) =>
            error?.message && (
              <li key={index} className={styles.errorList()}>
                {error.message}
              </li>
            )
        )}
      </ul>
    )
  }, [children, errors])

  return (
    <BaseField.Error data-slot='field-error' className={cx(styles.error(), className)} {...props}>
      {content}
    </BaseField.Error>
  )
}

export function FieldValidity({ ...props }: FieldValidityProps) {
  return <BaseField.Validity data-slot='field-validity' {...props} />
}

export function FieldControl({ ...props }: FieldControlProps) {
  const styles = fieldStyles()
  return <BaseField.Control data-slot='field-control' className={styles.control()} {...props} />
}
