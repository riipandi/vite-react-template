import * as stylex from '@stylexjs/stylex'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { space } from '#/assets/styles/tokens.stylex'
import { cx } from '#/lib/utils'

type ContainerProps<T extends ElementType> = {
  as?: T
  fluid?: boolean
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

const containerStyles = stylex.create({
  base: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    maxWidth: '80rem',
    paddingLeft: space[4],
    paddingRight: space[4],
    paddingTop: space[6],
    paddingBottom: space[8],
    '@media (min-width: 640px)': {
      paddingLeft: space[6],
      paddingRight: space[6],
      paddingTop: space[8],
      paddingBottom: space[10]
    },
    '@media (min-width: 1024px)': {
      paddingLeft: space[8],
      paddingRight: space[8],
      paddingTop: space[10],
      paddingBottom: space[12]
    }
  },
  fluid: {
    marginLeft: 0,
    marginRight: 0,
    maxWidth: 'none',
    paddingLeft: space[4],
    paddingRight: space[4],
    paddingTop: space[6],
    paddingBottom: space[8],
    '@media (min-width: 640px)': {
      paddingLeft: space[6],
      paddingRight: space[6],
      paddingTop: space[8],
      paddingBottom: space[10]
    },
    '@media (min-width: 1024px)': {
      paddingLeft: space[10],
      paddingRight: space[10],
      paddingTop: space[10],
      paddingBottom: space[12]
    }
  }
})

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
    <Component className={cx(sx.className, className)} style={sx.style} {...props}>
      {children}
    </Component>
  )
}
