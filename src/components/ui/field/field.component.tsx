import * as stylex from '@stylexjs/stylex'
import { descriptionStyles, fieldErrorStyles, labelStyles } from './field.stylex'

export function Label({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <label {...stylex.props(labelStyles.base)} className={className}>
      {children}
    </label>
  )
}

export function Description({
  children,
  className
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <p {...stylex.props(descriptionStyles.base)} className={className}>
      {children}
    </p>
  )
}

export function FieldError({
  children,
  className
}: {
  children?: React.ReactNode
  className?: string
}) {
  if (!children) return null
  return (
    <p {...stylex.props(fieldErrorStyles.base)} className={className} role='alert'>
      {children}
    </p>
  )
}
