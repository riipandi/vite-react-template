/**
 * Allows users to select a value from a range.
 *
 * @see: https://base-ui.com/react/components/slider
 *
 * BaseUI Anatomy:
 * <Slider.Root>
 *   <Slider.Value />
 *   <Slider.Control>
 *     <Slider.Track>
 *       <Slider.Indicator />
 *       <Slider.Thumb />
 *     </Slider.Track>
 *   </Slider.Control>
 * </Slider.Root>
 */

import { Slider as BaseSlider } from '@base-ui/react/slider'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { sliderStyles, sliderSizes } from './slider.stylex'

export type SliderSize = keyof typeof sliderSizes

export function Slider({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseSlider.Root> & { xstyle?: StyleXStyles }) {
  return (
    <BaseSlider.Root data-slot='slider' {...stylex.props(sliderStyles.root, xstyle)} {...props} />
  )
}

export function SliderControl({
  size,
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseSlider.Control> & { size?: SliderSize; xstyle?: StyleXStyles }) {
  return (
    <BaseSlider.Control
      data-slot='slider-control'
      {...stylex.props(sliderStyles.control, size && sliderSizes[size], xstyle)}
      {...props}
    />
  )
}

export function SliderTrack({
  size,
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseSlider.Track> & { size?: SliderSize; xstyle?: StyleXStyles }) {
  return (
    <BaseSlider.Track
      data-slot='slider-track'
      {...stylex.props(sliderStyles.track, size && sliderSizes[size], xstyle)}
      {...props}
    />
  )
}

export function SliderIndicator({
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseSlider.Indicator> & { xstyle?: StyleXStyles }) {
  return (
    <BaseSlider.Indicator
      data-slot='slider-indicator'
      {...stylex.props(sliderStyles.indicator, xstyle)}
      {...props}
    />
  )
}

export function SliderThumb({
  size,
  xstyle,
  ...props
}: React.ComponentProps<typeof BaseSlider.Thumb> & { size?: SliderSize; xstyle?: StyleXStyles }) {
  return (
    <BaseSlider.Thumb
      data-slot='slider-thumb'
      {...stylex.props(sliderStyles.thumb, size && sliderSizes[size], xstyle)}
      {...props}
    />
  )
}
