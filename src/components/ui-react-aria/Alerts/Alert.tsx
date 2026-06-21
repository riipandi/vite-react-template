import * as stylex from '@stylexjs/stylex'
import type { FC, ReactNode } from 'react'

import { colors, radius, space, fontSize } from '../../../assets/styles/tokens.stylex'
import { cx } from '../utils'

interface AlertProps {
  variant?: 'info' | 'success' | 'destructive' | 'warning' | 'subtle'
  children: ReactNode
  className?: string
}

const alertStyles = stylex.create({
  base: {
    marginTop: space[4],
    marginBottom: space[4],
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: space[4],
    fontSize: fontSize.sm,
  },
  info: {
    borderColor: colors.primary200,
    backgroundColor: colors.primary50,
    color: colors.primary700,
  },
  success: {
    borderColor: colors.green200,
    backgroundColor: colors.green50,
    color: colors.green700,
  },
  destructive: {
    borderColor: colors.destructive200,
    backgroundColor: colors.destructive50,
    color: colors.destructive700,
  },
  warning: {
    borderColor: colors.orange200,
    backgroundColor: colors.orange50,
    color: colors.orange700,
  },
  subtle: {
    borderColor: colors.zinc200,
    backgroundColor: colors.zinc50,
    color: colors.zinc600,
  },
})

const variantMap = {
  info: alertStyles.info,
  success: alertStyles.success,
  destructive: alertStyles.destructive,
  warning: alertStyles.warning,
  subtle: alertStyles.subtle,
} as const

export const Alert: FC<AlertProps> = ({ children, variant = 'info', className }) => {
  const sx = stylex.props(alertStyles.base, variantMap[variant])
  return (
    <div className={cx(sx.className, className)} style={sx.style} role="alert">
      {children}
    </div>
  )
}
