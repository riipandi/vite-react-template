import { Progress as BaseProgress } from '@base-ui/react/progress'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, fontSize, lineHeight, fontWeight, duration, easing } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

interface StyleXStyleProps {
  style?: stylex.StyleXStyles
}

export function Progress({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseProgress.Root>, 'className' | 'style'> &
  StyleXStyleProps) {
  return (
    <BaseProgress.Root {...props} {...stylex.props(styles.root, style)}>
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </BaseProgress.Root>
  )
}

export function ProgressTrack({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseProgress.Track>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseProgress.Track {...props} {...stylex.props(styles.track, style)} />
}

export function ProgressIndicator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseProgress.Indicator>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseProgress.Indicator {...props} {...stylex.props(styles.indicator, style)} />
}

export function ProgressLabel({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseProgress.Label>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseProgress.Label {...props} {...stylex.props(styles.label, style)} />
}

export function ProgressValue({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseProgress.Value>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseProgress.Value {...props} {...stylex.props(styles.value, style)} />
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
