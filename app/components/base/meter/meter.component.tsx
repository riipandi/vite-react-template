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
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { meterStyles as s } from './meter.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export function Meter({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMeter.Root>, 'className' | 'style'> & StyleProp) {
  return (
    <BaseMeter.Root {...props} {...stylex.props(s.root, style)}>
      {children}
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </BaseMeter.Root>
  )
}

export function MeterTrack({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMeter.Track>, 'className' | 'style'> &
  StyleProp) {
  return <BaseMeter.Track {...props} {...stylex.props(s.track, style)} />
}

export function MeterIndicator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMeter.Indicator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseMeter.Indicator {...props} {...stylex.props(s.indicator, style)} />
}

export function MeterLabel({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMeter.Label>, 'className' | 'style'> &
  StyleProp) {
  return <BaseMeter.Label {...props} {...stylex.props(s.label, style)} />
}

export function MeterValue({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMeter.Value>, 'className' | 'style'> &
  StyleProp) {
  return <BaseMeter.Value {...props} {...stylex.props(s.value, style)} />
}
