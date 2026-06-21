import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type CardProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

export const Card = <T extends ElementType = 'div'>({ as, children, className }: CardProps<T>) => {
  const Component = as || 'div'
  return (
    <Component
      className={clsx(
        'rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800',
        className
      )}
    >
      {children}
    </Component>
  )
}
