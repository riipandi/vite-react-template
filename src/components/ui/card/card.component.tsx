import * as stylex from '@stylexjs/stylex'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { clx } from '#/libraries/utils'
import { cardStyles } from './card.stylex'

type CardProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

export const Card = <T extends ElementType = 'div'>({ as, children, className }: CardProps<T>) => {
  const Component = as || 'div'
  const sx = stylex.props(cardStyles.base)
  return (
    <Component className={clx(sx.className, className)} style={sx.style}>
      {children}
    </Component>
  )
}
