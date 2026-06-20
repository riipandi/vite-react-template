import { Field } from '@base-ui/react/field'
import { Input } from '@base-ui/react/input'
import { twMerge } from 'tailwind-merge'
import { Description, FieldError, Label } from '../Field'

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
  name,
}: TextFieldProps) {
  return (
    <Field.Root
      name={name}
      invalid={!!errorMessage}
      disabled={disabled}
      className={twMerge('flex flex-col gap-1.5', className)}
    >
      {label && <Label>{label}</Label>}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        onBlur={onBlur}
        className={(state) =>
          twMerge(
            'min-w-0 flex-1 rounded-md border px-3 py-2 text-sm transition-colors duration-150',
            'bg-white text-zinc-800 placeholder:text-zinc-400 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500',
            !state.focused && state.valid === true
              ? 'border-zinc-300 dark:border-zinc-600 forced-colors:border-[ButtonBorder]'
              : '',
            state.focused
              ? 'border-primary-500 ring-2 ring-primary-500/20 dark:border-primary-400 dark:ring-primary-400/20'
              : '',
            state.valid === false ? 'border-destructive-500 dark:border-destructive-400' : '',
            state.disabled
              ? 'border-zinc-200 bg-zinc-50 text-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-600'
              : ''
          )
        }
      />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </Field.Root>
  )
}
