/**
 * The block quotation element.
 *
 * Anatomy:
 * <Blockquote>
 *   <BlockquoteAuthor />
 * </Blockquote>
 */

import { mergeProps, useRender } from '@base-ui/react'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { blockquoteSizes, blockquoteStyles, blockquoteVariants } from './blockquote.stylex'

export type BlockquoteVariant = keyof typeof blockquoteVariants
export type BlockquoteSize = keyof typeof blockquoteSizes

export interface BlockquoteProps extends useRender.ComponentProps<'blockquote'> {
  variant?: BlockquoteVariant
  size?: BlockquoteSize
  xstyle?: StyleXStyles
}

export function Blockquote({
  render,
  variant = 'default',
  size = 'md',
  xstyle,
  ...otherProps
}: BlockquoteProps) {
  return useRender({
    render,
    defaultTagName: 'blockquote',
    props: mergeProps(
      {
        'data-slot': 'blockquote',
        ...stylex.props(
          blockquoteStyles.base,
          blockquoteVariants[variant],
          blockquoteSizes[size],
          xstyle
        )
      },
      otherProps
    )
  })
}

export interface BlockquoteAuthorProps extends useRender.ComponentProps<'cite'> {
  xstyle?: StyleXStyles
}

export function BlockquoteAuthor({ render, xstyle, ...otherProps }: BlockquoteAuthorProps) {
  return useRender({
    render,
    defaultTagName: 'cite',
    props: mergeProps(
      {
        'data-slot': 'blockquote-author',
        ...stylex.props(blockquoteStyles.author, xstyle)
      },
      otherProps
    )
  })
}
