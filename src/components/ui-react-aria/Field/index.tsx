import * as stylex from '@stylexjs/stylex'

import { colors, fontSize, fontWeight, space } from '../../../assets/styles/tokens.stylex'

const labelStyles = stylex.create({
  base: {
    display: 'block',
    width: '100%',
    paddingLeft: space[3],
    cursor: 'default',
    fontWeight: fontWeight.medium,
    fontSize: fontSize.sm,
    color: colors.zinc500,
  },
})

const descriptionStyles = stylex.create({
  base: {
    fontSize: fontSize.sm,
    color: colors.zinc600,
    paddingLeft: space[3],
  },
})

const fieldErrorStyles = stylex.create({
  base: {
    marginTop: space[1],
    padding: `0 ${space[3]}`,
    fontSize: fontSize.xs,
    color: colors.destructive600,
  },
})

export function Label({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <label {...stylex.props(labelStyles.base)} className={className}>
      {children}
    </label>
  )
}

export function Description({
  children,
  className,
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
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  if (!children) return null
  return (
    <p {...stylex.props(fieldErrorStyles.base)} className={className} role="alert">
      {children}
    </p>
  )
}
