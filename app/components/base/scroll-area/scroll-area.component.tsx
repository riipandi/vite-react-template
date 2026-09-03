/**
 * A container with scrollable content.
 *
 * @see: https://base-ui.com/react/components/scroll-area
 *
 * BaseUI Anatomy:
 * <ScrollArea.Root>
 *   <ScrollArea.Viewport>
 *     {content}
 *   </ScrollArea.Viewport>
 *   <ScrollArea.Scrollbar orientation={orientation}>
 *     <ScrollArea.Thumb />
 *   </ScrollArea.Scrollbar>
 * </ScrollArea.Root>
 */

import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { scrollAreaStyles as s } from './scroll-area.stylex'
import { scrollAreaScrollbarOrientations as orientations } from './scroll-area.stylex'
import { scrollAreaFadeStyles } from './scroll-area.stylex'

interface StyleXStyleProps {
  style?: stylex.StyleXStyles
}

export function ScrollArea({
  style,
  children,
  fade = false,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseScrollArea.Root>, 'className' | 'style'> &
  StyleXStyleProps & {
    /** Display a fade mask on the sides of the area that can be scrolled towards. */
    fade?: boolean
  }) {
  return (
    <BaseScrollArea.Root {...props} {...stylex.props(s.root, style)}>
      <BaseScrollArea.Viewport {...stylex.props(s.viewport, fade && scrollAreaFadeStyles.fade)}>
        {children}
      </BaseScrollArea.Viewport>
      <ScrollBar />
      <BaseScrollArea.Corner />
    </BaseScrollArea.Root>
  )
}

export function ScrollBar({
  orientation = 'vertical',
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseScrollArea.Scrollbar>, 'className' | 'style'> &
  StyleXStyleProps) {
  return (
    <BaseScrollArea.Scrollbar
      orientation={orientation}
      {...props}
      {...stylex.props(s.scrollbar, orientations[orientation], style)}
    >
      <BaseScrollArea.Thumb {...stylex.props(s.thumb)} />
    </BaseScrollArea.Scrollbar>
  )
}
