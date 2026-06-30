import './style.css'
import { Slider as SliderPrimitive } from '@base-ui/react/slider'

function Slider({ children, ...props }: SliderPrimitive.Root.Props) {
  const isRange = Array.isArray(props.value) || Array.isArray(props.defaultValue)
  return (
    <SliderPrimitive.Root data-ui='slider' {...props}>
      {children}
      <SliderPrimitive.Control data-ui='slider-control'>
        <SliderPrimitive.Track data-ui='slider-track'>
          <SliderPrimitive.Indicator data-ui='slider-indicator' />
          <SliderPrimitive.Thumb index={0} data-ui='slider-thumb' tabIndex={0} />
          {isRange && <SliderPrimitive.Thumb index={1} data-ui='slider-thumb' />}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

function SliderValue({ ...props }: SliderPrimitive.Value.Props) {
  return <SliderPrimitive.Value data-ui='slider-value' {...props} />
}
export { Slider, SliderValue }
