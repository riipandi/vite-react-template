import { Meter as BaseMeter } from '@base-ui/react/meter'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, fontSize, lineHeight, fontWeight, duration, easing } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

interface StyleProp {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

export function Meter({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMeter.Root>, 'className' | 'style'> & StyleProp) {
  return (
    <BaseMeter.Root {...props} {...stylex.props(styles.root, style)}>
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
  return <BaseMeter.Track {...props} {...stylex.props(styles.track, style)} />
}

export function MeterIndicator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMeter.Indicator>, 'className' | 'style'> &
  StyleProp) {
  return <BaseMeter.Indicator {...props} {...stylex.props(styles.indicator, style)} />
}

export function MeterLabel({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMeter.Label>, 'className' | 'style'> &
  StyleProp) {
  return <BaseMeter.Label {...props} {...stylex.props(styles.label, style)} />
}

export function MeterValue({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseMeter.Value>, 'className' | 'style'> &
  StyleProp) {
  return <BaseMeter.Value {...props} {...stylex.props(styles.value, style)} />
}

const styles = stylex.create({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: font.sans,
    gap: space.s3,
    width: '100%'
  },
  track: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.full,
    display: 'flex',
    height: space.s1,
    overflowX: 'hidden',
    position: 'relative',
    width: '100%'
  },
  indicator: {
    backgroundColor: colors.primary,
    height: '100%',
    transitionDuration: duration.fast,
    transitionProperty: 'width',
    transitionTimingFunction: easing.out
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.control
  },
  value: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    fontVariantNumeric: 'tabular-nums',
    lineHeight: lineHeight.control,
    marginLeft: 'auto'
  }
})
