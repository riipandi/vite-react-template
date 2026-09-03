/**
 * Displays rich content in a portal with a trigger.
 *
 * @see: https://base-ui.com/react/components/preview-card
 *
 * BaseUI Anatomy:
 * <PreviewCard.Root>
 *   <PreviewCard.Trigger />
 *   <PreviewCard.Portal>
 *     <PreviewCard.Positioner>
 *       <PreviewCard.Popup>
 *         <PreviewCard.Arrow />
 *       </PreviewCard.Popup>
 *     </PreviewCard.Positioner>
 *   </PreviewCard.Portal>
 * </PreviewCard.Root>
 */

import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { shadow } from '#/styles/core/shadow.stylex'
import { ring } from '#/styles/core/utils.stylex'
import { previewCardStyles as s } from './preview-card.stylex'

export const PreviewCard = BasePreviewCard.Root
export const PreviewCardTrigger = BasePreviewCard.Trigger

export interface PreviewCardContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof BasePreviewCard.Popup>, 'className' | 'style'>,
    Pick<
      React.ComponentPropsWithoutRef<typeof BasePreviewCard.Positioner>,
      'align' | 'alignOffset' | 'side' | 'sideOffset'
    > {
  style?: stylex.StyleXStyles
}

export function PreviewCardContent({
  style,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 4,
  ...props
}: PreviewCardContentProps) {
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(s.positioner)}
      >
        <BasePreviewCard.Popup
          {...props}
          {...stylex.props(s.popup, ring({ shadow: shadow.raised }), style)}
        />
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  )
}
