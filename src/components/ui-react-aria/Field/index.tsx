import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export function Label({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <label className={twMerge('w-fit cursor-default font-medium text-gray-500 text-sm dark:text-zinc-400', className)}>
      {children}
    </label>
  )
}

export function Description({ children, className }: { children?: ReactNode; className?: string }) {
  return <p className={twMerge('text-gray-600 text-sm', className)}>{children}</p>
}

export function FieldError({ children, className }: { children?: ReactNode; className?: string }) {
  if (!children) return null
  return (
    <p className={twMerge('text-destructive-600 text-sm forced-colors:text-[Mark]', className)} role="alert">
      {children}
    </p>
  )
}
