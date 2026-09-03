/**
 * A native scroll container with custom scrollbars.
 *
 * @see: https://base-ui.com/react/components/scroll-area
 * @see: https://github.com/reshaped-ui/reshaped
 *
 * Anatomy:
 * <ScrollArea>
 *   <Viewport>   // scrollable container, hides the native scrollbar
 *     <Content>  // content wrapper
 *       {children}
 *     </Content>
 *   </Viewport>
 *   <Scrollbar>  // custom scrollbar track
 *     <Thumb />  // draggable thumb
 *   </Scrollbar>
 * </ScrollArea>
 */

import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import type {
  ScrollAreaContentProps as BaseScrollAreaContentProps,
  ScrollAreaCornerProps as BaseScrollAreaCornerProps,
  ScrollAreaRootProps as BaseScrollAreaRootProps,
  ScrollAreaScrollbarProps as BaseScrollAreaScrollbarProps,
  ScrollAreaThumbProps as BaseScrollAreaThumbProps,
  ScrollAreaViewportProps as BaseScrollAreaViewportProps
} from '@base-ui/react/scroll-area'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import React from 'react'
import { customClassName } from '#/styles/core/utils.stylex'
import { scrollAreaStyles as s } from './scroll-area.stylex'

type Height = keyof typeof s.heights
type MaxHeight = keyof typeof s.maxHeights
type Orientation = 'vertical' | 'horizontal'
type OverscrollBehavior = 'auto' | 'contain' | 'none'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScrollAreaProps extends Omit<BaseScrollAreaRootProps, 'className' | 'style'> {
  /** Node for inserting the scrollable content. */
  children?: React.ReactNode
  /** Height of the component, unit scale or 'full'. */
  height?: Height
  /** Maximum height of the component, unit scale. */
  maxHeight?: MaxHeight
  /** Which scrollbars to render. @default "both" */
  orientation?: 'both' | Orientation
  /** When the scrollbars are shown. @default "hover" */
  scrollbarDisplay?: 'hover' | 'scroll' | 'hidden'
  /** Overscroll behavior of the scrollable container. @default "auto" */
  overscrollBehavior?: OverscrollBehavior
  /** Fade content out at the vertical edges while scrolling. */
  fade?: boolean
  /** Additional attributes for the root element. */
  attributes?: React.ComponentProps<'div'>
  /** Additional class name for the root element. */
  className?: string
  /** StyleX styles. */
  style?: StyleXStyles
}

// ---------------------------------------------------------------------------
// ScrollArea (Root)
// ---------------------------------------------------------------------------

export function ScrollArea({
  height,
  maxHeight,
  orientation = 'both',
  scrollbarDisplay = 'hover',
  overscrollBehavior = 'auto',
  fade = false,
  attributes,
  className,
  style,
  children,
  ...props
}: ScrollAreaProps) {
  const showY = orientation !== 'horizontal' && scrollbarDisplay !== 'hidden'
  const showX = orientation !== 'vertical' && scrollbarDisplay !== 'hidden'
  const showCorner = showX && showY

  return (
    <BaseScrollArea.Root
      data-slot='scroll-area'
      {...attributes}
      {...stylex.props(
        height && s.heights[height],
        maxHeight && s.maxHeights[maxHeight],
        customClassName(className),
        style
      )}
      {...props}
    >
      <ScrollAreaViewport fade={fade} overscrollBehavior={overscrollBehavior}>
        <ScrollAreaContent>{children}</ScrollAreaContent>
      </ScrollAreaViewport>
      {showY && <ScrollAreaScrollbar orientation='vertical' />}
      {showX && <ScrollAreaScrollbar orientation='horizontal' />}
      {showCorner && <ScrollAreaCorner />}
    </BaseScrollArea.Root>
  )
}

// ---------------------------------------------------------------------------
// ScrollAreaViewport
// ---------------------------------------------------------------------------

export interface ScrollAreaViewportProps extends Omit<
  BaseScrollAreaViewportProps,
  'className' | 'style'
> {
  /** Overscroll behavior of the scrollable container. @default "auto" */
  overscrollBehavior?: OverscrollBehavior
  /** Fade content out at the vertical edges while scrolling. */
  fade?: boolean
  /** Additional class name for the viewport element. */
  className?: string
  /** StyleX styles. */
  style?: StyleXStyles
}

export function ScrollAreaViewport({
  overscrollBehavior = 'auto',
  fade = false,
  className,
  style,
  children,
  ...props
}: ScrollAreaViewportProps) {
  return (
    <BaseScrollArea.Viewport
      data-slot='scroll-area-viewport'
      className={
        stylex.props(
          s.viewport.base,
          s.viewport[
            overscrollBehavior === 'auto'
              ? 'overscrollAuto'
              : overscrollBehavior === 'contain'
                ? 'overscrollContain'
                : 'overscrollNone'
          ],
          fade && s.viewport.fade,
          customClassName(className),
          style
        ).className
      }
      {...props}
    >
      {children}
    </BaseScrollArea.Viewport>
  )
}

// ---------------------------------------------------------------------------
// ScrollAreaContent
// ---------------------------------------------------------------------------

export interface ScrollAreaContentProps extends Omit<
  BaseScrollAreaContentProps,
  'className' | 'style'
> {
  /** Additional class name for the content element. */
  className?: string
  /** StyleX styles. */
  style?: StyleXStyles
}

export function ScrollAreaContent({
  className,
  style,
  children,
  ...props
}: ScrollAreaContentProps) {
  return (
    <BaseScrollArea.Content
      data-slot='scroll-area-content'
      {...stylex.props(s.content.root, customClassName(className), style)}
      {...props}
    >
      {children}
    </BaseScrollArea.Content>
  )
}

// ---------------------------------------------------------------------------
// ScrollAreaScrollbar
// ---------------------------------------------------------------------------

export interface ScrollAreaScrollbarProps extends Omit<
  BaseScrollAreaScrollbarProps,
  'className' | 'style'
> {
  /** Additional class name for the scrollbar element. */
  className?: string
  /** StyleX styles. */
  style?: StyleXStyles
}

export function ScrollAreaScrollbar({
  orientation = 'vertical',
  className,
  style,
  ...props
}: ScrollAreaScrollbarProps) {
  return (
    <BaseScrollArea.Scrollbar
      orientation={orientation}
      keepMounted
      className={(state) =>
        stylex.props(
          s.scrollbar.root,
          orientation === 'vertical' ? s.scrollbar.vertical : s.scrollbar.horizontal,
          (state.hovering || state.scrolling) && s.scrollbar.visible,
          state.scrolling && s.scrollbar.scrolling,
          customClassName(className),
          style
        ).className
      }
      {...props}
    >
      <ScrollAreaThumb />
    </BaseScrollArea.Scrollbar>
  )
}

// ---------------------------------------------------------------------------
// ScrollAreaThumb
// ---------------------------------------------------------------------------

export interface ScrollAreaThumbProps extends Omit<
  BaseScrollAreaThumbProps,
  'className' | 'style'
> {
  /** Additional class name for the thumb element. */
  className?: string
  /** StyleX styles. */
  style?: StyleXStyles
}

export function ScrollAreaThumb({ className, style, ...props }: ScrollAreaThumbProps) {
  return (
    <BaseScrollArea.Thumb
      data-slot='scroll-area-thumb'
      className={(state) =>
        stylex.props(
          s.thumb.root,
          state.orientation === 'vertical' ? s.thumb.vertical : s.thumb.horizontal,
          customClassName(className),
          style
        ).className
      }
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// ScrollAreaCorner
// ---------------------------------------------------------------------------

export interface ScrollAreaCornerProps extends Omit<
  BaseScrollAreaCornerProps,
  'className' | 'style'
> {
  /** Additional class name for the corner element. */
  className?: string
  /** StyleX styles. */
  style?: StyleXStyles
}

export function ScrollAreaCorner({ className, style, ...props }: ScrollAreaCornerProps) {
  return (
    <BaseScrollArea.Corner
      data-slot='scroll-area-corner'
      {...stylex.props(s.corner.root, customClassName(className), style)}
      {...props}
    />
  )
}
