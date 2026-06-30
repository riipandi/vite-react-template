/**
 * A graphical display of a numeric value within a range.
 *
 * @see: https://base-ui.com/react/components/meter
 *
 * BaseUI Anatomy:
 * <Meter.Root>
 *   <Meter.Label />
 *   <Meter.Track>
 *     <Meter.Indicator />
 *   </Meter.Track>
 *   <Meter.Value />
 * </Meter.Root>
 */

import { Meter as BaseMeter } from '@base-ui/react/meter'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { cx } from 'css-variants'
import { meterColors, meterSizes, meterStyles } from './meter.stylex'

export type MeterSize = keyof typeof meterSizes
export type MeterColor = keyof typeof meterColors

export function Meter({
  className,
  size,
  color,
  xstyle,
  ...props
}: BaseMeter.Root.Props & { size?: MeterSize; color?: MeterColor; xstyle?: StyleXStyles }) {
  return (
    <BaseMeter.Root
      data-slot='meter'
      className={(state) => cx(typeof className === 'function' ? className(state) : className)}
      {...stylex.props(
        meterStyles.root,
        size && meterSizes[size],
        color && meterColors[color],
        xstyle
      )}
      {...props}
    />
  )
}

export function MeterLabel({
  className,
  size,
  xstyle,
  ...props
}: BaseMeter.Label.Props & { size?: MeterSize; xstyle?: StyleXStyles }) {
  return (
    <BaseMeter.Label
      data-slot='meter-label'
      className={(state) => cx(typeof className === 'function' ? className(state) : className)}
      {...stylex.props(meterStyles.label, size && meterSizes[size], xstyle)}
      {...props}
    />
  )
}

export function MeterValue({
  className,
  size,
  xstyle,
  ...props
}: BaseMeter.Value.Props & { size?: MeterSize; xstyle?: StyleXStyles }) {
  return (
    <BaseMeter.Value
      data-slot='meter-value'
      className={(state) => cx(typeof className === 'function' ? className(state) : className)}
      {...stylex.props(meterStyles.value, size && meterSizes[size], xstyle)}
      {...props}
    />
  )
}

export function MeterTrack({
  className,
  size,
  xstyle,
  ...props
}: BaseMeter.Track.Props & { size?: MeterSize; xstyle?: StyleXStyles }) {
  return (
    <BaseMeter.Track
      data-slot='meter-track'
      className={(state) => cx(typeof className === 'function' ? className(state) : className)}
      {...stylex.props(meterStyles.track, size && meterSizes[size], xstyle)}
      {...props}
    />
  )
}

export function MeterIndicator({
  className,
  color,
  xstyle,
  ...props
}: BaseMeter.Indicator.Props & { color?: MeterColor; xstyle?: StyleXStyles }) {
  return (
    <BaseMeter.Indicator
      data-slot='meter-indicator'
      className={(state) => cx(typeof className === 'function' ? className(state) : className)}
      {...stylex.props(meterStyles.indicator, color && meterColors[color], xstyle)}
      {...props}
    />
  )
}
