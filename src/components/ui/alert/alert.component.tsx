import * as stylex from '@stylexjs/stylex'
import type { FC, ReactNode } from 'react'
import { alertStyles } from './alert.stylex'

interface AlertProps {
  variant?: 'info' | 'success' | 'destructive' | 'warning' | 'subtle'
  children: ReactNode
  style?: stylex.StyleXStyles
}

const variantMap = {
  info: alertStyles.info,
  success: alertStyles.success,
  destructive: alertStyles.destructive,
  warning: alertStyles.warning,
  subtle: alertStyles.subtle
} as const

export const Alert: FC<AlertProps> = ({ children, variant = 'info', style }) => {
  return (
    <div {...stylex.props(alertStyles.base, variantMap[variant], style)} role='alert'>
      {children}
    </div>
  )
}
