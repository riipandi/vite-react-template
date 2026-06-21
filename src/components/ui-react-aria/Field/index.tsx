import { twMerge } from 'tailwind-merge'

export function Label({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <label
      className={twMerge(
        'w-fit cursor-default font-medium text-sm text-zinc-500 dark:text-zinc-400',
        className
      )}
    >
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
    <p className={twMerge('text-sm text-zinc-600 dark:text-zinc-400', className)}>{children}</p>
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
    <p
      className={twMerge('text-sm text-destructive-600 forced-colors:text-[Mark]', className)}
      role="alert"
    >
      {children}
    </p>
  )
}
