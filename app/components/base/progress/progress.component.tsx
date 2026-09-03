/**
 * Displays the status of a task that takes a long time.
 *
 * @see: https://base-ui.com/react/components/progress
 *
 * BaseUI Anatomy:
 * <Progress.Root>
 *   <Progress.Label />
 *   <Progress.Track>
 *     <Progress.Indicator />
 *   </Progress.Track>
 *   <Progress.Value />
 * </Progress.Root>
 */

import { Progress as BaseProgress } from '@base-ui/react/progress'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { progressStyles as s } from './progress.stylex'

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
    <BaseProgress.Root {...props} {...stylex.props(s.root, style)}>
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
  return <BaseProgress.Track {...props} {...stylex.props(s.track, style)} />
}

export function ProgressIndicator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseProgress.Indicator>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseProgress.Indicator {...props} {...stylex.props(s.indicator, style)} />
}

export function ProgressLabel({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseProgress.Label>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseProgress.Label {...props} {...stylex.props(s.label, style)} />
}

export function ProgressValue({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseProgress.Value>, 'className' | 'style'> &
  StyleXStyleProps) {
  return <BaseProgress.Value {...props} {...stylex.props(s.value, style)} />
}
