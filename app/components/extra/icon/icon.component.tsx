/**
 * Icon component with Reshaped-inspired API.
 *
 * No Base UI equivalent — created from scratch using StyleX.
 * Uses `useRender` from Base UI for render prop polymorphism.
 *
 * Adapted from Reshaped's mixin system:
 * - Reshaped uses CSS custom properties for responsive values
 * - StyleX uses tokens directly (non-responsive)
 * - Reshaped uses CSS modules + classNames composition
 * - StyleX uses atomic CSS via stylex.props()
 *
 * Usage:
 *   <Icon svg={<MyIcon />} />
 *   <Icon svg={<MyIcon />} size="4" color="primary" />
 *   <Icon svg={null} size="2" /> // empty placeholder
 *   <Icon render={<span />}>Custom element</Icon>
 */

import { mergeProps } from '@base-ui/react/merge-props'
import { useRender, type UseRenderRenderProp } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'
import React from 'react'
import { iconStyles as s } from './icon.stylex'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type IconSize = keyof typeof s.sizes
type IconColor = keyof typeof s.colorStyles

type TagName = keyof React.JSX.IntrinsicElements

export type IconProps = Omit<React.ComponentProps<'span'>, 'style'> & {
  /** Icon SVG component or element */
  svg: React.ReactElement | React.ComponentType | null
  /** Icon size (height value, width follows aspect-ratio) */
  size?: IconSize | (string & {})
  /** Icon color */
  color?: IconColor
  /** Use the natural width of the SVG instead of square bounding box */
  autoWidth?: boolean
  /** Render prop for polymorphism */
  render?: UseRenderRenderProp
  /** StyleX styles to apply */
  style?: stylex.StyleXStyles
}

// ---------------------------------------------------------------------------
// Icon
// ---------------------------------------------------------------------------

export function Icon({
  render,
  svg,
  size = '1em',
  color,
  autoWidth: isAutoWidth = false,
  style,
  className,
  ...otherProps
}: IconProps) {
  // Resolve mixin-like styles (adapted from Reshaped's resolveMixin)
  const resolvedStyles = resolveIconMixin({ size, autoWidth: isAutoWidth })

  const sx = stylex.props(
    s.base.root,
    resolvedStyles.size && s.sizes[resolvedStyles.size],
    isAutoWidth && s.autoWidth.root,
    color && s.colorStyles[color],
    style
  )

  // Render SVG component
  const icon =
    React.isValidElement(svg) || svg === null
      ? svg
      : React.createElement(svg as React.ComponentType)

  const svgSx = stylex.props(s.svgBase.root)

  const defaultProps = {
    'data-slot': 'icon',
    className: [sx.className, className].filter(Boolean).join(' ') || undefined,
    style: sx.style,
    children: icon ? (
      <>
        {React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
              focusable: false,
              className:
                [svgSx.className, (icon.props as Record<string, unknown>).className]
                  .filter(Boolean)
                  .join(' ') || undefined,
              style: {
                ...svgSx.style,
                ...((icon.props as Record<string, unknown>).style as React.CSSProperties)
              }
            })
          : icon}
      </>
    ) : null
  }

  return useRender<Record<string, unknown>, HTMLSpanElement>({
    defaultTagName: 'span' as TagName,
    render: render as useRender.RenderProp,
    props: mergeProps(defaultProps, otherProps as Record<string, unknown>)
  })
}

Icon.displayName = 'Icon'

// ---------------------------------------------------------------------------
// Mixin resolver (adapted from Reshaped's resolveMixin)
// ---------------------------------------------------------------------------

interface MixinInput {
  size?: IconSize | string
  autoWidth?: boolean
}

interface MixinOutput {
  size?: IconSize
  className?: string
  variables?: Record<string, string | number>
}

/**
 * Resolves mixin-like props into StyleX-compatible values.
 *
 * Reshaped's resolveMixin returns `{ variables, classNames }` for CSS custom
 * properties and CSS module classes. In StyleX, we resolve to:
 * - `size`: token key for StyleX size styles
 * - `className`: not needed (StyleX handles this)
 * - `variables`: not needed (StyleX uses tokens directly)
 */
function resolveIconMixin(input: MixinInput): MixinOutput {
  const output: MixinOutput = {}

  // Resolve size
  if (input.size !== undefined) {
    // Check if it's a token key
    if (input.size in s.sizes) {
      output.size = input.size as IconSize
    }
    // For non-token values (like "1em"), we pass through as inline style
    // This is handled by the component directly
  }

  return output
}
