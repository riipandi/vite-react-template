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
import * as React from 'react'
import { fieldStyles } from './field.stylex'

export type FieldRootProps = React.ComponentProps<typeof BaseField.Root> & {
  xstyle?: StyleXStyles
}
export type FieldItemProps = React.ComponentProps<typeof BaseField.Item> & {
  xstyle?: StyleXStyles
}
export type FieldLabelProps = React.ComponentProps<typeof BaseField.Label> & {
  xstyle?: StyleXStyles
}
export type FieldDescriptionProps = React.ComponentProps<typeof BaseField.Description> & {
  xstyle?: StyleXStyles
}
export type FieldErrorProps = React.ComponentProps<typeof BaseField.Error> & {
  errors?: Array<{ message?: string } | undefined>
  xstyle?: StyleXStyles
}
export type FieldValidityProps = React.ComponentProps<typeof BaseField.Validity> & {
  xstyle?: StyleXStyles
}
export type FieldControlProps = React.ComponentProps<typeof BaseField.Control> & {
  xstyle?: StyleXStyles
}

export function Field({ xstyle, ...props }: FieldRootProps) {
  return <BaseField.Root data-slot='field' {...stylex.props(fieldStyles.base, xstyle)} {...props} />
}

export function FieldItem({ xstyle, ...props }: FieldItemProps) {
  return (
    <BaseField.Item data-slot='field-item' {...stylex.props(fieldStyles.item, xstyle)} {...props} />
  )
}

export function FieldLabel({ xstyle, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label
      data-slot='field-label'
      {...stylex.props(fieldStyles.label, xstyle)}
      {...props}
    />
  )
}

export function FieldDescription({ xstyle, ...props }: FieldDescriptionProps) {
  return (
    <BaseField.Description
      data-slot='field-description'
      {...stylex.props(fieldStyles.description, xstyle)}
      {...props}
    />
  )
}

export function FieldError({ errors, children, xstyle, ...props }: FieldErrorProps) {
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
      <ul {...stylex.props(fieldStyles.errorListParent)}>
        {uniqueErrors.map(
          (error, index) =>
            error?.message && (
              // oxlint-disable-next-line react/no-array-index-key
              <li key={index} {...stylex.props(fieldStyles.errorList)}>
                {error.message}
              </li>
            )
        )}
      </ul>
    )
  }, [children, errors])

  return (
    <BaseField.Error
      data-slot='field-error'
      {...stylex.props(fieldStyles.error, xstyle)}
      {...props}
    >
      {content}
    </BaseField.Error>
  )
}

export function FieldValidity({ xstyle, ...props }: FieldValidityProps) {
  return (
    <BaseField.Validity
      data-slot='field-validity'
      {...stylex.props(fieldStyles.validity, xstyle)}
      {...props}
    />
  )
}

export function FieldControl({ xstyle, ...props }: FieldControlProps) {
  return (
    <BaseField.Control
      data-slot='field-control'
      {...stylex.props(fieldStyles.control, xstyle)}
      {...props}
    />
  )
}
