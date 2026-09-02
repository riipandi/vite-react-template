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
import React from 'react'
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
type PaddingSide = keyof typeof s.paddingTop
type BgColor = keyof typeof s.backgroundColor
type BorderToken = keyof typeof s.border
type BorderSide = keyof typeof s.borderTop
type BorderColorToken = keyof typeof s.borderColor
type BorderRadiusToken = keyof typeof s.borderRadius
type Overflow = keyof typeof s.overflow
type ShadowToken = keyof typeof s.shadow
type TextAlignValue = keyof typeof s.textAlign
type PositionValue = keyof typeof s.position
type InsetValue = keyof typeof s.inset
type ZIndexToken = keyof typeof s.zIndex
type BleedToken = keyof typeof s.bleed

type TagName = keyof React.JSX.IntrinsicElements

type ViewRenderProp =
  | React.ReactElement
  | ((
      props: React.HTMLAttributes<HTMLElement>,
      state: Record<string, unknown>
    ) => React.ReactElement)

export type ViewProps = Omit<React.ComponentProps<'div'>, 'style'> & {
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
  /** Padding top */
  paddingTop?: PaddingSide
  /** Padding bottom */
  paddingBottom?: PaddingSide
  /** Padding inline start */
  paddingStart?: PaddingSide
  /** Padding inline end */
  paddingEnd?: PaddingSide
  /** Padding inline */
  paddingInline?: PaddingSide
  /** Padding block */
  paddingBlock?: PaddingSide
  /** Background color */
  backgroundColor?: BgColor
  /** Add border to all sides */
  border?: BorderToken
  /** Add border to top */
  borderTop?: BorderSide
  /** Add border to bottom */
  borderBottom?: BorderSide
  /** Add border to inline start */
  borderStart?: BorderSide
  /** Add border to inline end */
  borderEnd?: BorderSide
  /** Add border to inline direction */
  borderInline?: BorderSide
  /** Add border to block direction */
  borderBlock?: BorderSide
  /** Border color */
  borderColor?: BorderColorToken
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
  /** Inset (all sides) */
  inset?: InsetValue
  /** Inset top */
  insetTop?: InsetValue
  /** Inset bottom */
  insetBottom?: InsetValue
  /** Inset inline start */
  insetStart?: InsetValue
  /** Inset inline end */
  insetEnd?: InsetValue
  /** Inset inline */
  insetInline?: InsetValue
  /** Inset block */
  insetBlock?: InsetValue
  /** z-index style */
  zIndex?: ZIndexToken
  /** Add transition for properties */
  animated?: boolean
  /** Render a divider between each child */
  divided?: boolean
  /** Direction for divided children */
  dividedDirection?: Direction
  /** Apply negative margin and remove side borders */
  bleed?: BleedToken
  /** Render as a different element */
  as?: TagName
  /** Render prop for polymorphism */
  render?: ViewRenderProp
  /** StyleX styles to apply */
  style?: StyleXStyles
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
  paddingTop: pt,
  paddingBottom: pb,
  paddingStart: ps,
  paddingEnd: pe,
  paddingInline: pi,
  paddingBlock: pbDir,
  backgroundColor,
  border,
  borderTop,
  borderBottom,
  borderStart,
  borderEnd,
  borderInline,
  borderBlock,
  borderColor,
  borderRadius,
  overflow,
  shadow,
  textAlign,
  position,
  inset,
  insetTop,
  insetBottom,
  insetStart,
  insetEnd,
  insetInline,
  insetBlock,
  zIndex,
  animated,
  divided,
  dividedDirection,
  bleed,
  style,
  className,
  children,
  ...otherProps
}: ViewProps) {
  const defaultTagName = as || 'div'

  const isDividedRow =
    divided && (dividedDirection === 'row' || dividedDirection?.startsWith('row'))

  const sx = stylex.props(
    direction && s.direction[direction],
    gap && s.gap[gap],
    align && s.align[align],
    justify && s.justify[justify],
    wrap && s.wrap[wrap],
    padding && s.padding[padding],
    pt && s.paddingTop[pt],
    pb && s.paddingBottom[pb],
    ps && s.paddingStart[ps],
    pe && s.paddingEnd[pe],
    pi && s.paddingInline[pi],
    pbDir && s.paddingBlock[pbDir],
    backgroundColor && s.backgroundColor[backgroundColor],
    border && s.border[border],
    borderTop && s.borderTop[borderTop],
    borderBottom && s.borderBottom[borderBottom],
    borderStart && s.borderStart[borderStart],
    borderEnd && s.borderEnd[borderEnd],
    borderInline && s.borderInline[borderInline],
    borderBlock && s.borderBlock[borderBlock],
    borderColor && s.borderColor[borderColor],
    borderRadius && s.borderRadius[borderRadius],
    overflow && s.overflow[overflow],
    shadow && s.shadow[shadow],
    textAlign && s.textAlign[textAlign],
    position && s.position[position],
    inset && s.inset[inset],
    insetTop && s.insetTop[insetTop],
    insetBottom && s.insetBottom[insetBottom],
    insetStart && s.insetStart[insetStart],
    insetEnd && s.insetEnd[insetEnd],
    insetInline && s.insetInline[insetInline],
    insetBlock && s.insetBlock[insetBlock],
    zIndex && s.zIndex[zIndex],
    animated && s.animated.root,
    divided && s.divided[isDividedRow ? 'row' : 'root'],
    bleed && s.bleed[bleed],
    style
  )

  // Apply divided styles to children after the first
  const processedChildren = divided
    ? React.Children.toArray(children).map((child, index) => {
        if (index === 0 || !React.isValidElement(child)) return child
        const dividedSx = stylex.props(isDividedRow ? s.dividedChild.row : s.dividedChild.root)
        return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          className:
            [dividedSx.className, (child.props as Record<string, unknown>).className]
              .filter(Boolean)
              .join(' ') || undefined,
          style: {
            ...dividedSx.style,
            ...((child.props as Record<string, unknown>).style as React.CSSProperties)
          }
        })
      })
    : children

  const defaultProps = {
    'data-slot': 'view',
    className: [sx.className, className].filter(Boolean).join(' ') || undefined,
    style: sx.style,
    children: processedChildren
  }

  return useRender<Record<string, unknown>, HTMLElement>({
    defaultTagName: defaultTagName as TagName,
    render: render as useRender.RenderProp,
    props: mergeProps(defaultProps, otherProps as Record<string, unknown>)
  })
}

View.displayName = 'View'
