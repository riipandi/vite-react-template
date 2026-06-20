import clsx from 'clsx'
import type { FC } from 'react'

interface HorizontalDividerProps {
  label?: string
  className?: string
}

export const HorizontalDivider: FC<HorizontalDividerProps> = ({ label, className }) => {
  const defaultClassName =
    'flex py-5 dark:text-zinc-500 dark:before:border-zinc-700 dark:after:border-zinc-700 before:border-t before:border-zinc-200 after:border-t after:border-zinc-200'
  const withLabelClassName =
    'items-center text-xs uppercase tracking-wider text-zinc-400 before:mr-6 after:ml-6 before:flex-[1_1_0%] after:flex-[1_1_0%]'

  return (
    <div className={clsx(defaultClassName, label && withLabelClassName, className)}>
      {label && label}
    </div>
  )
}
