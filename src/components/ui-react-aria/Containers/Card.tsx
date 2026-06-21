import * as stylex from '@stylexjs/stylex'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { colors, radius, shadow } from '../../../assets/styles/tokens.stylex'
import { cx } from '../utils'

type CardProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

const cardStyles = stylex.create({
  base: {
    width: '100%',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.zinc200,
    backgroundColor: colors.surface,
    boxShadow: shadow.sm,
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: '200ms',
  },
})

export const Card = <T extends ElementType = 'div'>({ as, children, className }: CardProps<T>) => {
  const Component = as || 'div'
  const sx = stylex.props(cardStyles.base)
  return (
    <Component className={cx(sx.className, className)} style={sx.style}>
      {children}
    </Component>
  )
}
