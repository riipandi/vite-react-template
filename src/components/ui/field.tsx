import * as stylex from '@stylexjs/stylex'

import { colors, fontSize, fontWeight, space } from '../../assets/styles/tokens.stylex'

const labelStyles = stylex.create({
  base: {
    display: 'block',
    width: '100%',
    margin: 0,
    paddingLeft: space[3],
    cursor: 'default',
    fontWeight: fontWeight.medium,
    fontSize: fontSize.sm,
    color: colors.zinc500,
  },
})

const descriptionStyles = stylex.create({
  base: {
    margin: 0,
    fontSize: fontSize.sm,
    color: colors.zinc600,
    paddingLeft: space[3],
  },
})

const fieldErrorStyles = stylex.create({
  base: {
    margin: 0,
    paddingLeft: space[3],
    paddingTop: 0,
    fontSize: fontSize.xs,
    color: colors.destructive600,
    lineHeight: 1.25,
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
