import * as stylex from '@stylexjs/stylex'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cardStyles } from './card.stylex'

type CardProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  style?: stylex.StyleXStyles
} & ComponentPropsWithoutRef<T>

export const Card = <T extends ElementType = 'div'>({ as, children, style }: CardProps<T>) => {
  const Component = as || 'div'
  return <Component {...stylex.props(cardStyles.base, style)}>{children}</Component>
}
