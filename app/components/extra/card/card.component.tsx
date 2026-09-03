/**
 * A card container with actionable (button/link) and layout variants.
 *
 * @see: https://github.com/reshaped-ui/reshaped
 *
 * Anatomy:
 * <Card root={div | a | button}>   // surface with border/shadow/radius
 *   <span content>                 // padding + optional flex layout
 *     {overlays}                   // selected ring / hover tint
 *     {children}
 *   </span>
 * </Card>
 */

import { useRender, type HTMLProps } from '@base-ui/react/use-render'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import React from 'react'
import { customClassName } from '#/styles/core/utils.stylex'
import { cardStyles } from './card.stylex'

type Radius = keyof typeof cardStyles.radii
type Padding = keyof typeof cardStyles.paddings
type Bleed = keyof typeof cardStyles.bleeds
type Height = keyof typeof cardStyles.heights
type Gap = keyof typeof cardStyles.gaps
type Direction = keyof typeof cardStyles.directions
type Align = keyof typeof cardStyles.alignments
type Justify = keyof typeof cardStyles.justifications

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CardOptions {
  /** Padding on all sides, unit scale. @default 4 */
  padding?: Padding
  /** Border radius. @default "large" */
  borderRadius?: Radius
  /** Highlight the component when used for an active state. */
  selected?: boolean
  /** Apply elevated (raised) styles to the component. */
  raised?: boolean
  /** Negative margin on all sides, unit scale. */
  bleed?: Bleed
  /** Height of the component, unit scale or 'full'. */
  height?: Height
  /** Flex direction of the content. */
  direction?: Direction
  /** Gap between content items, unit scale. */
  gap?: Gap
  /** Align content items along the cross axis. */
  align?: Align
  /** Justify content items along the main axis. */
  justify?: Justify
  /** Callback when the component is clicked, turns the component into a button. */
  onClick?: React.MouseEventHandler<HTMLElement>
  /** URL to navigate to when clicked, turns the component into a link. */
  href?: string
  /** Node for inserting children. */
  children?: React.ReactNode
  /** Additional attributes for the root element. */
  attributes?: React.HTMLAttributes<HTMLElement>
  /** Additional class name for the root element. */
  className?: string
  /** StyleX styles. */
  style?: StyleXStyles
}

export type CardProps = CardOptions &
  Omit<useRender.ElementProps<'div'>, 'children' | 'className' | 'style' | 'onClick' | 'href'> & {
    /** Override the root element with a different tag or component. */
    render?: React.ReactElement | ((props: HTMLProps, state: useRender.State) => React.ReactElement)
  }

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

export const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  {
    padding = 4,
    borderRadius = 'large',
    selected = false,
    raised = false,
    bleed,
    height,
    direction,
    gap,
    align,
    justify,
    href,
    onClick,
    render,
    children,
    attributes,
    className,
    style,
    ...rest
  },
  ref
) {
  const isActionable = Boolean(href || onClick)
  const isFlex =
    direction !== undefined || gap !== undefined || align !== undefined || justify !== undefined
  const {
    className: attributesClassName,
    style: attributesStyle,
    ...attributesRest
  } = attributes ?? {}

  const sx = stylex.props(
    cardStyles.root.base,
    cardStyles.radii[borderRadius],
    height && cardStyles.heights[height],
    bleed && cardStyles.bleeds[bleed],
    isActionable && (selected ? cardStyles.root.actionableSelected : cardStyles.root.actionable),
    raised && cardStyles.root.raised,
    customClassName(className),
    style
  )

  const renderElement = useRender({
    render,
    defaultTagName: href ? 'a' : onClick ? 'button' : 'div',
    ref,
    props: {
      ...rest,
      ...attributesRest,
      onClick,
      href,
      type: onClick ? 'button' : undefined,
      'data-slot': 'card',
      className: [sx.className, attributesClassName].filter(Boolean).join(' ') || undefined,
      style: { ...attributesStyle, ...sx.style },
      children: (
        <span
          data-slot='card-content'
          {...stylex.props(
            cardStyles.content.root,
            cardStyles.paddings[padding],
            isFlex && cardStyles.content.flex,
            direction && cardStyles.directions[direction],
            gap && cardStyles.gaps[gap],
            align && cardStyles.alignments[align],
            justify && cardStyles.justifications[justify]
          )}
        >
          {selected && <span aria-hidden='true' {...stylex.props(cardStyles.overlay.ring)} />}
          {isActionable && !selected && (
            <span aria-hidden='true' {...stylex.props(cardStyles.overlay.hover)} />
          )}
          {children}
        </span>
      )
    }
  })

  return renderElement
})

Card.displayName = 'Card'
