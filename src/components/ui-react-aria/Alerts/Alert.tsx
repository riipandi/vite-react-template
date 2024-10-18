import clsx from 'clsx'
import type { FC, ReactNode } from 'react'

interface AlertProps {
  variant?: 'info' | 'success' | 'destructive' | 'warning' | 'subtle'
  children: ReactNode
  className?: string
}

export const Alert: FC<AlertProps> = ({ children, variant = 'info', className }) => {
  return (
    <div
      className={clsx(
        'my-4 rounded-md border p-4 text-sm',
        variant === 'info' && 'border-blue-200 bg-primary-50 text-blue-600',
        variant === 'success' && 'border border-green-200 bg-green-50 text-green-600',
        variant === 'destructive' &&
          'border border-destructive-200 bg-destructive-50 text-destructive-600 text-sm',
        variant === 'warning' && 'border border-orange-200 bg-orange-50 text-orange-800 text-sm',
        variant === 'subtle' && 'border-white/[.1 bg-white/[.1] text-gray-600 dark:text-gray-400',
        className
      )}
      role="alert"
    >
      {children}
    </div>
  )
}
