/**
 * Wrapper for SVG assets to control their appearance. Ported from Reshaped's
 * Icon utility (https://www.reshaped.so/docs/utilities/icon) and adapted to
 * Base UI's `useRender`, StyleX, and local design tokens.
 *
 * The icon inherits `currentColor` from its parent; pass `color` to apply a
 * foreground token directly. Size defaults to `1em` so the icon scales with
 * the surrounding text; pass a number (pixels) or any CSS size to override.
 *
 * Deviations from Reshaped:
 * - `size` numbers are pixels (Reshaped multiplies the theme unit token).
 * - Extra props are spread onto the root element (Reshaped uses `attributes`).
 * - Responsive `size` objects are not supported.
 * - The `render` prop can swap the root element (e.g. an anchor), like the
 *   Base UI components in this codebase.
 *
 * In the default span form the root is `aria-hidden` and the svg is not
 * focusable; pass `render` to swap the root element and own its a11y
 * semantics (e.g. render the icon as a labeled anchor).
 */

import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { iconColors, iconStyles as s } from './icon.stylex'

export type IconColor =
  | 'neutral'
  | 'neutralFaded'
  | 'primary'
  | 'positive'
  | 'warning'
  | 'critical'
  | 'disabled'

export interface IconProps extends Omit<
  useRender.ComponentProps<'span'>,
  'className' | 'style' | 'color'
> {
  /** Icon svg component (e.g. a Lucide icon) or a raw svg element. */
  svg: React.ReactElement | React.ComponentType | null
  /** Icon size in pixels (number) or any CSS size (string). Defaults to `1em`. */
  size?: number | string
  /** Foreground color token. Inherits the parent text color when omitted. */
  color?: IconColor
  /** Use the width of the svg asset instead of a square bounding box. */
  autoWidth?: boolean
  style?: stylex.StyleXStyles
}

/**
 * Sizing applied to the wrapped svg. StyleX has no descendant selectors, so
 * the `.root svg` rules from Reshaped's stylesheet are inlined onto the child
 * instead. Merged after the child's own style, matching the CSS override
 * semantics ("override the sizes that might be defined on the svg element").
 */
const svgStyle = {
  display: 'block',
  height: '100%',
  minWidth: '100%',
  width: 'auto'
} as const

export function Icon({
  svg,
  size = '1em',
  color,
  autoWidth = false,
  style,
  render,
  ...props
}: IconProps) {
  const icon = (
    React.isValidElement(svg) || svg === null ? svg : React.createElement(svg)
  ) as React.ReactElement<React.SVGProps<SVGSVGElement>> | null
  const children = icon
    ? React.cloneElement(icon, {
        focusable: false,
        style: { ...icon.props.style, ...svgStyle }
      })
    : undefined
  return useRender({
    defaultTagName: 'span',
    render,
    props: mergeProps<'span'>(
      // Decorative only in the default span form; when `render` swaps the
      // root (e.g. an anchor), the caller owns the a11y semantics.
      render ? {} : { 'aria-hidden': true },
      icon !== null ? { children } : {},
      stylex.props(
        s.root,
        autoWidth && s.auto,
        color && iconColors[color],
        s.size(typeof size === 'number' ? `${size}px` : size),
        style
      ),
      props
    )
  })
}
