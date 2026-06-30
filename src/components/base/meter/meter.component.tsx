import './style.css'
import { Meter as MeterPrimitive } from '@base-ui/react/meter'

function Meter({ children, ...props }: MeterPrimitive.Root.Props) {
  return (
    <MeterPrimitive.Root data-ui='meter' {...props}>
      {children ?? (
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      )}
    </MeterPrimitive.Root>
  )
}

function MeterLabel(props: MeterPrimitive.Label.Props) {
  return <MeterPrimitive.Label data-ui='meter-label' {...props} />
}

function MeterTrack(props: MeterPrimitive.Track.Props) {
  return <MeterPrimitive.Track data-ui='meter-track' {...props} />
}

function MeterIndicator(props: MeterPrimitive.Indicator.Props) {
  return <MeterPrimitive.Indicator data-ui='meter-indicator' {...props} />
}

function MeterValue(props: MeterPrimitive.Value.Props) {
  return <MeterPrimitive.Value data-ui='meter-value' {...props} />
}

export { Meter, MeterLabel, MeterTrack, MeterIndicator, MeterValue }
