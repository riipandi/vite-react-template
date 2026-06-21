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
        variant === 'info' &&
          'border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300',
        variant === 'success' &&
          'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
        variant === 'destructive' &&
          'border-destructive-200 bg-destructive-50 text-destructive-700 dark:border-destructive-800 dark:bg-destructive-950 dark:text-destructive-300',
        variant === 'warning' &&
          'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300',
        variant === 'subtle' &&
          'border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400',
        className
      )}
      role="alert"
    >
      {children}
    </div>
  )
}
