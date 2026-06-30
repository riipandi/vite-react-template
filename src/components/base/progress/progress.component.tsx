import './style.css'
import { Progress as ProgressPrimitive } from '@base-ui/react/progress'

function Progress({ children, ...props }: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root data-ui='progress' {...props}>
      {children ?? (
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      )}
    </ProgressPrimitive.Root>
  )
}

function ProgressLabel(props: ProgressPrimitive.Label.Props) {
  return <ProgressPrimitive.Label data-ui='progress-label' {...props} />
}

function ProgressTrack(props: ProgressPrimitive.Track.Props) {
  return <ProgressPrimitive.Track data-ui='progress-track' {...props} />
}

function ProgressIndicator(props: ProgressPrimitive.Indicator.Props) {
  return <ProgressPrimitive.Indicator data-ui='progress-indicator' {...props} />
}

function ProgressValue(props: ProgressPrimitive.Value.Props) {
  return <ProgressPrimitive.Value data-ui='progress-value' {...props} />
}

export { Progress, ProgressLabel, ProgressTrack, ProgressIndicator, ProgressValue }
