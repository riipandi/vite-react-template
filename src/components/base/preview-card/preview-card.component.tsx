import './style.css'
import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card'

function PreviewCard(props: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-ui='preview-card' {...props} />
}

function PreviewCardTrigger(props: PreviewCardPrimitive.Trigger.Props) {
  return <PreviewCardPrimitive.Trigger data-slot='preview-card-trigger' {...props} />
}

function PreviewCardContent({
  align,
  alignOffset,
  side,
  sideOffset = 8,
  variant = 'dark',
  ...props
}: PreviewCardPrimitive.Popup.Props & { variant?: 'dark' | 'light' } & Pick<
    PreviewCardPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  >) {
  return (
    <PreviewCardPrimitive.Portal>
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <PreviewCardPrimitive.Popup
          data-ui='preview-card-content'
          data-variant={variant}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { PreviewCard, PreviewCardTrigger, PreviewCardContent }
