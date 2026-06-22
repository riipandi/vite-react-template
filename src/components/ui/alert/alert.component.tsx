import * as stylex from '@stylexjs/stylex'
import type { FC, ReactNode } from 'react'
import { clx } from '#/libraries/utils'
import { alertStyles } from './alert.stylex'

interface AlertProps {
  variant?: 'info' | 'success' | 'destructive' | 'warning' | 'subtle'
  children: ReactNode
  className?: string
}

const variantMap = {
  info: alertStyles.info,
  success: alertStyles.success,
  destructive: alertStyles.destructive,
  warning: alertStyles.warning,
  subtle: alertStyles.subtle
} as const

export const Alert: FC<AlertProps> = ({ children, variant = 'info', className }) => {
  const sx = stylex.props(alertStyles.base, variantMap[variant])
  return (
    <div className={clx(sx.className, className)} style={sx.style} role='alert'>
      {children}
    </div>
  )
}
