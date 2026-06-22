import * as stylex from '@stylexjs/stylex'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cx } from '#/lib/utils'
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
    <Component className={cx(sx.className, className)} style={sx.style}>
      {children}
    </Component>
  )
}
