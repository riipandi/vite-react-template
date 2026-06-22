import { Field } from '@base-ui/react/field'
import { Input } from '@base-ui/react/input'
import * as stylex from '@stylexjs/stylex'
import { cx } from '#/lib/utils'
import { Description, FieldError, Label } from '../field'
import { fieldStyles } from './text-field.stylex'

export interface TextFieldProps {
  label?: string
  description?: string
  errorMessage?: string
  value?: string | number
  defaultValue?: string | number
  onChange?: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
  type?: string
  name?: string
}

export function TextField({
  label,
  description,
  errorMessage,
  value,
  defaultValue,
  onChange,
  onBlur,
  placeholder,
  disabled,
  className,
  type = 'text',
  name
}: TextFieldProps) {
  const rootSx = stylex.props(fieldStyles.root)
  return (
    <Field.Root
      name={name}
      invalid={!!errorMessage}
      disabled={disabled}
      className={cx(rootSx.className, className)}
    >
      {label && <Label>{label}</Label>}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        onBlur={onBlur}
        className={(state: { focused: boolean; valid: boolean | null; disabled: boolean }) => {
          const sx = stylex.props(
            fieldStyles.input,
            state.focused && state.valid !== false && fieldStyles.inputFocused,
            state.valid === false && fieldStyles.inputInvalid,
            state.disabled && fieldStyles.inputDisabled
          )
          return sx.className
        }}
      />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </Field.Root>
  )
}
