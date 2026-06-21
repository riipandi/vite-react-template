import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type ContainerProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

export const Container = <T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: ContainerProps<T>) => {
  const Component = as || 'div'
  return (
    <Component
      className={['mx-auto w-full max-w-7xl', 'px-4 py-6 sm:px-6 lg:px-8', className].join(' ')}
      {...props}
    >
      {children}
    </Component>
  )
}
