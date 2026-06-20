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
      className={twMerge('flex flex-col gap-1', className)}
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
            'min-w-0 flex-1 bg-white px-2 py-1.5 text-gray-800 text-sm outline outline-0 disabled:text-gray-200 dark:bg-zinc-900 dark:text-zinc-200 dark:disabled:text-zinc-600',
            'border-2 rounded-md',
            'outline outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight] outline-offset-2 outline-0 focus-visible:outline-2',
            !state.focused
              ? 'border-gray-300 dark:border-zinc-500 forced-colors:border-[ButtonBorder]'
              : 'border-gray-600 dark:border-zinc-300 forced-colors:border-[Highlight]',
            state.valid === false
              ? 'border-destructive-600 dark:border-destructive-600 forced-colors:border-[Mark]'
              : '',
            state.disabled
              ? 'border-gray-200 dark:border-zinc-700 forced-colors:border-[GrayText]'
              : '',
          )
        }
      />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </Field.Root>
  )
}
