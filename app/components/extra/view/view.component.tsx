/**
 * View component with Reshaped-inspired API.
 *
 * No Base UI equivalent — created from scratch using StyleX.
 * Uses `useRender` from Base UI for render prop polymorphism.
 *
 * Usage:
 *   <View padding="4" gap="2">Content</View>
 *   <View direction="row" align="center" gap="4">Content</View>
 *   <View backgroundColor="neutral-faded" borderRadius="medium">Card</View>
 */

import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { viewStyles as s } from './view.stylex'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type GapToken = keyof typeof s.gap
type Direction = keyof typeof s.direction
type Align = keyof typeof s.align
type Justify = keyof typeof s.justify
type Wrap = keyof typeof s.wrap
type PaddingToken = keyof typeof s.padding
type BgColor = keyof typeof s.backgroundColor
type BorderToken = keyof typeof s.border
type BorderRadiusToken = keyof typeof s.borderRadius
type Overflow = keyof typeof s.overflow
type ShadowToken = keyof typeof s.shadow
type TextAlignValue = keyof typeof s.textAlign
type PositionValue = keyof typeof s.position
type ZIndexToken = keyof typeof s.zIndex

type TagName = keyof React.JSX.IntrinsicElements

type ViewRenderProp =
  | React.ReactElement
  | ((
      props: React.HTMLAttributes<HTMLElement>,
      state: Record<string, unknown>
    ) => React.ReactElement)

export type ViewProps = React.ComponentProps<'div'> & {
  /** Flex direction for the content */
  direction?: Direction
  /** Gap between children */
  gap?: GapToken
  /** Flex align-items */
  align?: Align
  /** Flex justify-content */
  justify?: Justify
  /** Flex wrap */
  wrap?: Wrap
  /** Padding for all sides */
  padding?: PaddingToken
  /** Background color */
  backgroundColor?: BgColor
  /** Add border */
  border?: BorderToken
  /** Border radius */
  borderRadius?: BorderRadiusToken
  /** Overflow style */
  overflow?: Overflow
  /** Shadow style */
  shadow?: ShadowToken
  /** Text align */
  textAlign?: TextAlignValue
  /** Position style */
  position?: PositionValue
  /** z-index style */
  zIndex?: ZIndexToken
  /** Render as a different element */
  as?: TagName
  /** Render prop for polymorphism */
  render?: ViewRenderProp
  /** StyleX styles to apply */
  xstyle?: StyleXStyles
}

// ---------------------------------------------------------------------------
// View
// ---------------------------------------------------------------------------

export function View({
  render,
  as,
  direction,
  gap,
  align,
  justify,
  wrap,
  padding,
  backgroundColor,
  border,
  borderRadius,
  overflow,
  shadow,
  textAlign,
  position,
  zIndex,
  xstyle,
  className,
  style,
  children,
  ...otherProps
}: ViewProps) {
  const defaultTagName = as || 'div'

  const sx = stylex.props(
    direction && s.direction[direction],
    gap && s.gap[gap],
    align && s.align[align],
    justify && s.justify[justify],
    wrap && s.wrap[wrap],
    padding && s.padding[padding],
    backgroundColor && s.backgroundColor[backgroundColor],
    border && s.border[border],
    borderRadius && s.borderRadius[borderRadius],
    overflow && s.overflow[overflow],
    shadow && s.shadow[shadow],
    textAlign && s.textAlign[textAlign],
    position && s.position[position],
    zIndex && s.zIndex[zIndex],
    xstyle
  )

  const defaultProps = {
    'data-slot': 'view',
    className: [sx.className, className].filter(Boolean).join(' ') || undefined,
    style: { ...sx.style, ...style },
    children
  }

  return useRender<Record<string, unknown>, HTMLElement>({
    defaultTagName: defaultTagName as TagName,
    render: render as useRender.RenderProp,
    props: mergeProps(defaultProps, otherProps as Record<string, unknown>)
  })
}

View.displayName = 'View'
