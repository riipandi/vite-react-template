import * as stylex from '@stylexjs/stylex'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { space } from '../../../assets/styles/tokens.stylex'

type ContainerProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

const containerStyles = stylex.create({
  base: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    maxWidth: '80rem',
    paddingLeft: space[6],
    paddingRight: space[6],
    paddingTop: space[6],
    paddingBottom: space[6],
    '@media (min-width: 640px)': {
      paddingLeft: space[8],
      paddingRight: space[8],
    },
    '@media (min-width: 1024px)': {
      paddingLeft: space[10],
      paddingRight: space[10],
    },
  },
})

export const Container = <T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: ContainerProps<T>) => {
  const Component = as || 'div'
  return (
    <Component {...stylex.props(containerStyles.base)} className={className} {...props}>
      {children}
    </Component>
  )
}
