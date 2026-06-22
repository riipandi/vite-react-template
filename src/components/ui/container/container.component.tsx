import * as stylex from '@stylexjs/stylex'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { clx } from '#/libraries/utils'
import { containerStyles } from './container.stylex'

type ContainerProps<T extends ElementType> = {
  as?: T
  fluid?: boolean
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

export const Container = <T extends ElementType = 'div'>({
  as,
  fluid = false,
  children,
  className,
  ...props
}: ContainerProps<T>) => {
  const Component = as || 'div'
  const sx = stylex.props(containerStyles.base, fluid && containerStyles.fluid)
  return (
    <Component className={clx(sx.className, className)} style={sx.style} {...props}>
      {children}
    </Component>
  )
}
