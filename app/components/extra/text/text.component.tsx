/**
 * Text component with Reshaped-inspired API.
 *
 * No Base UI equivalent — created from scratch using StyleX.
 * Uses `useRender` from Base UI for render prop polymorphism.
 *
 * Usage:
 *   <Text variant="body-1">Hello</Text>
 *   <Text variant="featured-2" color="primary">Title</Text>
 *   <Text variant="caption-1" color="neutral-faded">Subtitle</Text>
 *   <Text render={<span />}>Custom element</Text>
 */

import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'
import { textStyles as s } from './text.stylex'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TextVariant = keyof typeof s.variants
type TextWeight = keyof typeof s.weights
type TextColor = keyof typeof s.colorStyles
type TextAlign = keyof typeof s.alignment
type TextDecoration = keyof typeof s.decoration
type TextWrap = keyof typeof s.wrap

const tagMap: Partial<Record<TextVariant, keyof React.JSX.IntrinsicElements>> = {
  'featured-1': 'h1',
  'featured-2': 'h2',
  'featured-3': 'h3',
  'featured-4': 'h4',
  'featured-5': 'h5',
  'featured-6': 'h6'
}

type TagName = keyof React.JSX.IntrinsicElements

type TextRenderProp =
  | React.ReactElement
  | ((
      props: React.HTMLAttributes<HTMLElement>,
      state: Record<string, unknown>
    ) => React.ReactElement)

export type TextProps = React.ComponentProps<'div'> & {
  /** Text render variant */
  variant?: TextVariant
  /** Text font weight */
  weight?: TextWeight
  /** Text color */
  color?: TextColor
  /** Text alignment */
  align?: TextAlign
  /** CSS text decoration style */
  decoration?: TextDecoration
  /** Maximum number of lines to render (text truncation) */
  maxLines?: number
  /** CSS wrapping style */
  wrap?: TextWrap
  /** Render monospace font */
  monospace?: boolean
  /** Render as numeric value to preserve character width */
  numeric?: boolean
  /** Render prop for polymorphism */
  render?: TextRenderProp
}

// ---------------------------------------------------------------------------
// Text
// ---------------------------------------------------------------------------

export function Text({
  render,
  variant,
  color,
  weight,
  align,
  decoration: textDecoration,
  maxLines,
  wrap: textWrap,
  monospace: isMonospace,
  numeric: isNumeric,
  ...otherProps
}: TextProps) {
  const defaultTagName = (variant && tagMap[variant]) || 'div'

  const sx = stylex.props(
    variant && s.variants[variant],
    weight && s.weights[weight],
    color && s.colorStyles[color],
    align && s.alignment[align],
    textDecoration && s.decoration[textDecoration],
    maxLines !== undefined && s.truncation.clamp,
    maxLines === 1 && s.truncation.breakAll,
    textWrap ? s.wrap[textWrap] : null,
    isMonospace && s.monospace.root,
    isNumeric && s.numeric.root
  )

  const defaultProps = {
    'data-slot': 'text',
    className: sx.className,
    style: { ...sx.style, '--text-lines': maxLines } as React.CSSProperties
  }

  return useRender<Record<string, unknown>, HTMLElement>({
    defaultTagName: defaultTagName as TagName,
    render: render as useRender.RenderProp,
    props: mergeProps(defaultProps, otherProps as Record<string, unknown>)
  })
}

Text.displayName = 'Text'
