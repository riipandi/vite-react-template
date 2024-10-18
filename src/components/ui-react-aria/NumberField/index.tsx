import * as Lucide from 'lucide-react'
import {
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
  Button,
  type ButtonProps,
  type ValidationResult,
} from 'react-aria-components'

import { Description, FieldError, FieldGroup, Input, Label, fieldBorderStyles } from '../Field'
import { ctrp } from '../utils'

export interface NumberFieldProps extends AriaNumberFieldProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function NumberField({ label, description, errorMessage, ...props }: NumberFieldProps) {
  return (
    <AriaNumberField {...props} className={ctrp(props.className, 'group flex flex-col gap-1')}>
      <Label>{label}</Label>
      <FieldGroup>
        {(renderProps) => (
          <>
            <Input />
            <div
              className={fieldBorderStyles({ ...renderProps, class: 'flex flex-col border-s-2' })}
            >
              <StepperButton slot="increment">
                <Lucide.ChevronUp aria-hidden className="h-4 w-4" />
              </StepperButton>
              <div className={fieldBorderStyles({ ...renderProps, class: 'border-b-2' })} />
              <StepperButton slot="decrement">
                <Lucide.ChevronDown aria-hidden className="h-4 w-4" />
              </StepperButton>
            </div>
          </>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaNumberField>
  )
}

function StepperButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="cursor-default pressed:bg-gray-100 px-0.5 text-gray-500 group-disabled:text-gray-200 dark:pressed:bg-zinc-800 dark:text-zinc-400 dark:group-disabled:text-zinc-600 forced-colors:group-disabled:text-[GrayText]"
    />
  )
}
