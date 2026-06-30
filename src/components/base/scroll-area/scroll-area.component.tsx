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
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { scrollAreaStyles, scrollAreaOrientations } from './scroll-area.stylex'

export type ScrollAreaRootProps = React.ComponentProps<typeof BaseScrollArea.Root> & {
  scrollbar?: 'both' | 'horizontal' | 'vertical'
  xstyle?: StyleXStyles
}

export function ScrollArea({
  children,
  scrollbar = 'both',
  xstyle,
  ...props
}: ScrollAreaRootProps) {
  const showH = scrollbar === 'both' || scrollbar === 'horizontal'
  const showV = scrollbar === 'both' || scrollbar === 'vertical'

  return (
    <BaseScrollArea.Root
      data-slot='scroll-area'
      {...stylex.props(scrollAreaStyles.root, xstyle)}
      {...props}
    >
      <BaseScrollArea.Viewport
        data-slot='scroll-area-viewport'
        {...stylex.props(scrollAreaStyles.viewport)}
      >
        {children}
      </BaseScrollArea.Viewport>
      {showH && (
        <BaseScrollArea.Scrollbar
          orientation='horizontal'
          data-slot='scroll-area-scrollbar-h'
          {...stylex.props(scrollAreaStyles.scrollbar, scrollAreaOrientations.horizontal)}
        >
          <BaseScrollArea.Thumb
            data-slot='scroll-area-thumb-h'
            {...stylex.props(scrollAreaStyles.thumb)}
          />
        </BaseScrollArea.Scrollbar>
      )}
      {showV && (
        <BaseScrollArea.Scrollbar
          orientation='vertical'
          data-slot='scroll-area-scrollbar-v'
          {...stylex.props(scrollAreaStyles.scrollbar, scrollAreaOrientations.vertical)}
        >
          <BaseScrollArea.Thumb
            data-slot='scroll-area-thumb-v'
            {...stylex.props(scrollAreaStyles.thumb)}
          />
        </BaseScrollArea.Scrollbar>
      )}
    </BaseScrollArea.Root>
  )
}
