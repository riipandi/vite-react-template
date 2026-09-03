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
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { sliderStyles as s } from './slider.stylex'
import { sliderRootOrientations as rootOrientations } from './slider.stylex'
import { sliderControlOrientations as controlOrientations } from './slider.stylex'
import { sliderTrackOrientations as trackOrientations } from './slider.stylex'
import { sliderRangeOrientations as rangeOrientations } from './slider.stylex'

export interface SliderProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSlider.Root>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function Slider({
  style,
  defaultValue,
  value,
  min = 0,
  max = 100,
  orientation = 'horizontal',
  ...props
}: SliderProps) {
  const values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <BaseSlider.Root
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      orientation={orientation}
      thumbAlignment='edge'
      {...props}
      {...stylex.props(rootOrientations[orientation], style)}
    >
      <BaseSlider.Control {...stylex.props(s.control, controlOrientations[orientation])}>
        <BaseSlider.Track {...stylex.props(s.track, trackOrientations[orientation])}>
          <BaseSlider.Indicator {...stylex.props(s.range, rangeOrientations[orientation])} />
        </BaseSlider.Track>
        {Array.from({ length: values.length }, (_, index) => (
          <BaseSlider.Thumb key={index} {...stylex.props(s.thumb)} />
        ))}
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}
