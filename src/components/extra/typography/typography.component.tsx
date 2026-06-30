/**
 * Text components for displaying headings, paragraphs, links, and code.
 *
 * Anatomy:
 * <Heading />
 * <Text />
 * <Lead />
 * <Strong />
 * <Code />
 */

import { useRender } from '@base-ui/react/use-render'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import {
  codeStyles,
  headingSizes,
  headingStyles,
  leadStyles,
  strongStyles,
  textStyles
} from './typography.stylex'

export type HeadingSize = keyof typeof headingSizes

export type HeadingProps = useRender.ComponentProps<'h1'> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: HeadingSize
  xstyle?: StyleXStyles
}

export function Heading({ level = 1, size, render, xstyle, ...props }: HeadingProps) {
  const levelMap: Record<string, number> = {
    xl: 1,
    lg: 2,
    md: 3,
    sm: 4,
    xs: 5
  }

  const selectedLevel = levelMap[size || 'lg'] || level

  return useRender({
    defaultTagName: `h${selectedLevel}` as keyof React.JSX.IntrinsicElements,
    render,
    props: {
      'data-slot': 'heading',
      'data-level': level,
      ...stylex.props(headingStyles.base, size && headingSizes[size], xstyle),
      ...props
    }
  })
}

export type TextProps = useRender.ComponentProps<'p'> & {
  xstyle?: StyleXStyles
}

export function Text({ render, xstyle, ...props }: TextProps) {
  return useRender({
    defaultTagName: 'p',
    render,
    props: {
      'data-slot': 'text',
      ...stylex.props(textStyles.base, xstyle),
      ...props
    }
  })
}

export type LeadProps = useRender.ComponentProps<'p'> & {
  xstyle?: StyleXStyles
}

export function Lead({ render, xstyle, ...props }: LeadProps) {
  return useRender({
    defaultTagName: 'p',
    render,
    props: {
      'data-slot': 'text-lead',
      ...stylex.props(leadStyles.base, xstyle),
      ...props
    }
  })
}

export type StrongProps = React.ComponentProps<'strong'> & {
  xstyle?: StyleXStyles
}

export function Strong({ xstyle, ...props }: StrongProps) {
  return <strong data-slot='text-strong' {...stylex.props(strongStyles.base, xstyle)} {...props} />
}

export type CodeProps = React.ComponentProps<'code'> & {
  xstyle?: StyleXStyles
}

export function Code({ xstyle, ...props }: CodeProps) {
  return <code data-slot='text-code' {...stylex.props(codeStyles.base, xstyle)} {...props} />
}
