/**
 * A component that provides labeling and validation for form controls.
 *
 * @see: https://base-ui.com/react/components/field
 * @see: https://base-ui.com/react/components/fieldset
 *
 * Field Anatomy:
 * <Field.Root>
 *   <Field.Label />
 *   <Field.Control />
 *   <Field.Description />
 *   <Field.Item />
 *   <Field.Error />
 *   <Field.Validity />
 * </Field.Root>
 *
 * Fieldset Anatomy:
 * <Fieldset.Root>
 *   <Fieldset.Legend />
 * </Fieldset.Root>
 */

import { Field as BaseField } from '@base-ui/react/field'
import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Separator } from '#/components/base/separator'
import { fieldStyles as s, fieldOrientations as orientations } from './field.stylex'
import { fieldLegendVariants as legendVariants } from './field.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

type DivProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp

export function FieldSet({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseFieldset.Root>, 'className' | 'style'> &
  StyleProp) {
  return <BaseFieldset.Root {...props} {...stylex.props(s.set, style)} />
}

export type FieldLegendVariant = 'legend' | 'label'

export function FieldLegend({
  variant = 'legend',
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseFieldset.Legend>, 'className' | 'style'> &
  StyleProp & { variant?: FieldLegendVariant }) {
  return (
    <BaseFieldset.Legend {...props} {...stylex.props(s.legend, legendVariants[variant], style)} />
  )
}

export function FieldGroup({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(s.group, style)} />
}

export type FieldOrientation = 'vertical' | 'horizontal'

/**
 * Built on Base UI Field: wires label/description/error accessibility
 * automatically and adds validation (`name`, `validate`, `validationMode`,
 * `invalid`, …). Base UI form controls placed inside (Input, Checkbox,
 * Select, …) join the field automatically.
 */
export function Field({
  orientation = 'vertical',
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseField.Root>, 'className' | 'style'> &
  StyleProp & { orientation?: FieldOrientation }) {
  return <BaseField.Root {...props} {...stylex.props(s.field, orientations[orientation], style)} />
}

export function FieldContent({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(s.content, style)} />
}

export function FieldLabel({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseField.Label>, 'className' | 'style'> &
  StyleProp) {
  return <BaseField.Label {...props} {...stylex.props(s.labelBase, s.label, style)} />
}

export function FieldTitle({ style, ...props }: DivProps) {
  return <div {...props} {...stylex.props(s.title, style)} />
}

export function FieldDescription({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseField.Description>, 'className' | 'style'> &
  StyleProp) {
  return <BaseField.Description {...props} {...stylex.props(s.description, style)} />
}

export function FieldSeparator({ children, style, ...props }: DivProps) {
  return (
    <div {...props} {...stylex.props(s.separator, style)}>
      <Separator style={s.separatorLine} />
      {children && <span {...stylex.props(s.separatorContent)}>{children}</span>}
    </div>
  )
}

export interface FieldErrorProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BaseField.Error>, 'className' | 'style'>,
    StyleProp {
  /**
   * External errors to render directly (e.g. from react-hook-form or TanStack
   * Form). When set, the message renders unconditionally; otherwise the error
   * comes from the surrounding Field's own validation.
   */
  errors?: Array<{ message?: string } | undefined>
}

export function FieldError({ children, errors, style, ...props }: FieldErrorProps) {
  const external = React.useMemo(() => {
    if (!errors?.length) return null
    const unique = [...new Map(errors.map((error) => [error?.message, error])).values()].filter(
      (error): error is { message: string } => !!error?.message
    )
    if (unique.length === 0) return null
    if (unique.length === 1) return unique[0]?.message
    return (
      <ul {...stylex.props(s.errorList)}>
        {unique.map((error, index) => (
          <li key={index}>{error.message}</li>
        ))}
      </ul>
    )
  }, [errors])

  if (errors) {
    if (!external) return null
    return (
      <div role='alert' {...props} {...stylex.props(s.error, style)}>
        {external}
      </div>
    )
  }

  // No external errors: Base UI renders the field's own validation message
  // (or `children` when `match` allows it). Only pass children when actually
  // given — an explicit `children: undefined` would override Base UI's
  // auto-filled message.
  return (
    <BaseField.Error
      {...(children !== undefined && { children })}
      {...props}
      {...stylex.props(s.error, style)}
    />
  )
}
