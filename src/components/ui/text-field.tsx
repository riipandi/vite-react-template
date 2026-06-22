import { Field } from '@base-ui/react/field'
import { Input } from '@base-ui/react/input'
import * as stylex from '@stylexjs/stylex'
import { cx } from '#/lib/utils'
import { colors, fontSize, radius, space } from '#/styles/tokens.stylex'
import { Description, FieldError, Label } from './field'

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

const fieldStyles = stylex.create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: space[1]
  },
  input: {
    minWidth: 0,
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.zinc300,
    paddingLeft: space[3],
    paddingRight: space[3],
    paddingTop: space[2],
    paddingBottom: space[2],
    fontSize: fontSize.sm,
    backgroundColor: colors.surface,
    color: colors.zinc800,
    '::placeholder': {
      color: colors.zinc400
    },
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: '150ms'
  },
  inputFocused: {
    borderColor: colors.primary500,
    boxShadow: '0 0 0 2px rgb(99 102 241 / 0.2)'
  },
  inputInvalid: {
    borderColor: colors.destructive500
  },
  inputDisabled: {
    borderColor: colors.zinc200,
    backgroundColor: colors.zinc50,
    color: colors.zinc300
  }
})

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
