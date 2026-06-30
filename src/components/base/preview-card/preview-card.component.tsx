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
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { previewCardStyles } from './preview-card.stylex'

export type PreviewCardRootProps = React.ComponentProps<typeof BasePreviewCard.Root> & {
  xstyle?: StyleXStyles
}
export type PreviewCardTriggerProps = React.ComponentProps<typeof BasePreviewCard.Trigger> & {
  xstyle?: StyleXStyles
}
export type PreviewCardPopupProps = React.ComponentProps<typeof BasePreviewCard.Popup> & {
  align?: BasePreviewCard.Positioner.Props['align']
  alignOffset?: BasePreviewCard.Positioner.Props['alignOffset']
  side?: BasePreviewCard.Positioner.Props['side']
  sideOffset?: BasePreviewCard.Positioner.Props['sideOffset']
  anchor?: BasePreviewCard.Positioner.Props['anchor']
  sticky?: BasePreviewCard.Positioner.Props['sticky']
  positionMethod?: BasePreviewCard.Positioner.Props['positionMethod']
  xstyle?: StyleXStyles
}

export function PreviewCard({ xstyle, ...props }: PreviewCardRootProps) {
  return (
    <BasePreviewCard.Root
      data-slot='preview-card'
      {...stylex.props(previewCardStyles.root, xstyle)}
      {...props}
    />
  )
}

export function PreviewCardTrigger({ xstyle, ...props }: PreviewCardTriggerProps) {
  return (
    <BasePreviewCard.Trigger
      data-slot='preview-card-trigger'
      {...stylex.props(previewCardStyles.trigger, xstyle)}
      {...props}
    />
  )
}

export function PreviewCardPopup({
  children,
  xstyle,
  align,
  alignOffset,
  side,
  sideOffset,
  anchor,
  sticky,
  positionMethod,
  ...props
}: PreviewCardPopupProps) {
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner
        data-slot='preview-card-positioner'
        {...stylex.props(previewCardStyles.positioner)}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset || 8}
        anchor={anchor}
        sticky={sticky}
        positionMethod={positionMethod}
      >
        <BasePreviewCard.Popup
          data-slot='preview-card-popup'
          {...stylex.props(previewCardStyles.popup, xstyle)}
          {...props}
        >
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  )
}
