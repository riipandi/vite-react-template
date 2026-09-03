import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  textAlignStyles,
  textAlignStylesLarge,
  textAlignStylesMedium,
  textAlignStylesXLarge,
  textColorStyles,
  textStyles,
  textVariantStyles,
  textVariantStylesLarge,
  textVariantStylesMedium,
  textVariantStylesXLarge,
  textWeightStyles,
  textWeightStylesLarge,
  textWeightStylesMedium,
  textWeightStylesXLarge
} from './text.stylex'

export type TextVariant =
  | 'headline-1'
  | 'headline-2'
  | 'headline-3'
  | 'featured-1'
  | 'featured-2'
  | 'featured-3'
  | 'featured-4'
  | 'featured-5'
  | 'featured-6'
  | 'body-1'
  | 'body-2'
  | 'caption-1'
  | 'caption-2'

export type TextColor =
  | 'neutral'
  | 'neutral-faded'
  | 'positive'
  | 'warning'
  | 'critical'
  | 'primary'
  | 'disabled'

export type TextWeight =
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'

export type TextAlign = 'start' | 'center' | 'end'

/** Mobile-first responsive value: string applies to all viewports, object per breakpoint. */
export type Responsive<T> = T | { s?: T; m?: T; l?: T; xl?: T }

// `CompiledStyles` accepts every `stylex.create()` output, including the
// media-query variants that plain `StyleXStyles` rejects.
type BreakpointStyles<T extends string> = Record<T, stylex.CompiledStyles>

interface ResponsiveSpec<T extends string> {
  base: BreakpointStyles<T>
  m: BreakpointStyles<T>
  l: BreakpointStyles<T>
  xl: BreakpointStyles<T>
}

const VARIANT_SPEC: ResponsiveSpec<TextVariant> = {
  base: textVariantStyles,
  m: textVariantStylesMedium,
  l: textVariantStylesLarge,
  xl: textVariantStylesXLarge
}

const WEIGHT_SPEC: ResponsiveSpec<TextWeight> = {
  base: textWeightStyles,
  m: textWeightStylesMedium,
  l: textWeightStylesLarge,
  xl: textWeightStylesXLarge
}

const ALIGN_SPEC: ResponsiveSpec<TextAlign> = {
  base: textAlignStyles,
  m: textAlignStylesMedium,
  l: textAlignStylesLarge,
  xl: textAlignStylesXLarge
}

// Featured variants render as headings by default, like Reshaped.
const TAG_MAP: Partial<Record<TextVariant, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>> = {
  'featured-1': 'h1',
  'featured-2': 'h2',
  'featured-3': 'h3',
  'featured-4': 'h4',
  'featured-5': 'h5',
  'featured-6': 'h6'
}

/**
 * Resolves a mobile-first responsive value into one style per breakpoint.
 * `s` becomes the base style (all viewports); each wider breakpoint gets its
 * own media style only when its effective value (own value or inherited from
 * the nearest smaller breakpoint) differs from the base.
 */
function resolveResponsive<T extends string>(
  value: Responsive<T> | undefined,
  spec: ResponsiveSpec<T>
): stylex.CompiledStyles[] {
  if (value === undefined) return []
  if (typeof value === 'string') return [spec.base[value]]

  const out: stylex.CompiledStyles[] = []
  const base = value.s
  if (base !== undefined) out.push(spec.base[base])

  const m = value.m ?? base
  if (m !== undefined && m !== base) out.push(spec.m[m])
  const l = value.l ?? m
  if (l !== undefined && l !== base) out.push(spec.l[l])
  const xl = value.xl ?? l
  if (xl !== undefined && xl !== base) out.push(spec.xl[xl])
  return out
}

export interface TextProps extends Omit<useRender.ComponentProps<'div'>, 'className' | 'style'> {
  variant?: Responsive<TextVariant>
  color?: TextColor
  weight?: Responsive<TextWeight>
  align?: Responsive<TextAlign>
  decoration?: 'underline' | 'line-through'
  maxLines?: number
  wrap?: 'balance' | 'nowrap'
  monospace?: boolean
  numeric?: boolean
  style?: stylex.StyleXStyles
}

export function Text({
  variant = 'body-1',
  color,
  weight,
  align,
  decoration,
  maxLines,
  wrap,
  monospace = false,
  numeric = false,
  style,
  render,
  ...props
}: TextProps) {
  const largestVariant =
    typeof variant === 'string' ? variant : (variant.xl ?? variant.l ?? variant.m ?? variant.s)
  const defaultTagName = (largestVariant && TAG_MAP[largestVariant]) || 'div'
  // Consumed by the `clamp` style; only set when clamping is requested.
  const runtimeStyle =
    maxLines !== undefined
      ? { style: { '--text-lines': maxLines } as React.CSSProperties }
      : undefined

  return useRender({
    defaultTagName,
    render,
    props: mergeProps<'div'>(
      stylex.props(
        // Variant first so weight/color overrides win the cascade.
        ...resolveResponsive(variant, VARIANT_SPEC),
        color && textColorStyles[color],
        ...resolveResponsive(weight, WEIGHT_SPEC),
        ...resolveResponsive(align, ALIGN_SPEC),
        decoration === 'underline' && textStyles.decorationUnderline,
        decoration === 'line-through' && textStyles.decorationLineThrough,
        wrap === 'balance' && textStyles.wrapBalance,
        wrap === 'nowrap' && textStyles.wrapNowrap,
        monospace && textStyles.monospace,
        numeric && textStyles.numeric,
        maxLines !== undefined && textStyles.clamp,
        maxLines === 1 && textStyles.breakAll,
        style
      ),
      runtimeStyle,
      props
    )
  })
}
