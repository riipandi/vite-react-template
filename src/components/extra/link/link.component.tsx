// oxlint-disable typescript/no-explicit-any

/**
 * A styled link component with variant styles and optional icon.
 *
 * Anatomy:
 * <Link>
 *   <LinkIcon />
 * </Link>
 */

import { mergeProps, useRender } from '@base-ui/react'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import * as React from 'react'
import { linkSizes, linkStyles, linkUnderlines, linkVariants } from './link.stylex'

export type LinkVariant = keyof typeof linkVariants
export type LinkSize = keyof typeof linkSizes
export type LinkUnderline = keyof typeof linkUnderlines

export interface LinkProps extends useRender.ComponentProps<'a'> {
  variant?: LinkVariant
  size?: LinkSize
  underline?: LinkUnderline
  href?: string
  xstyle?: StyleXStyles
}

export function Link(props: LinkProps) {
  const {
    render,
    children,
    variant = 'default',
    underline = 'hover',
    size = 'md',
    href = '#',
    xstyle,
    ...otherProps
  } = props

  // If render is provided and it's a React element, render it directly
  if (render && React.isValidElement(render)) {
    return React.cloneElement(render, {
      ...stylex.props(
        linkStyles.base,
        linkVariants[variant],
        linkUnderlines[underline],
        linkSizes[size],
        xstyle
      ),
      children,
      ...otherProps
    } as any)
  }

  return useRender({
    render,
    defaultTagName: 'a',
    props: mergeProps(
      {
        'data-slot': 'link',
        href,
        ...stylex.props(
          linkStyles.base,
          linkVariants[variant],
          linkUnderlines[underline],
          linkSizes[size],
          xstyle
        ),
        children
      },
      otherProps
    )
  })
}

export interface LinkIconProps extends useRender.ComponentProps<'span'> {
  xstyle?: StyleXStyles
}

export function LinkIcon(props: LinkIconProps) {
  const { render, children, xstyle, ...otherProps } = props

  return useRender({
    render,
    defaultTagName: 'span',
    props: mergeProps(
      {
        'data-slot': 'link-icon',
        'aria-hidden': 'true',
        ...stylex.props(linkStyles.icon, xstyle),
        children: children || <Lucide.ArrowUpRight size={16} strokeWidth={2} />
      },
      otherProps
    )
  })
}
