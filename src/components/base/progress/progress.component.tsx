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
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { cx } from 'css-variants'
import * as React from 'react'
import { progressColors, progressSizes, progressStyles } from './progress.stylex'

export type ProgressSize = keyof typeof progressSizes
export type ProgressColor = keyof typeof progressColors

const ProgressContext = React.createContext<{ color?: ProgressColor; size?: ProgressSize }>({})

export function Progress({
  className,
  size,
  color,
  xstyle,
  ...props
}: BaseProgress.Root.Props & {
  size?: ProgressSize
  color?: ProgressColor
  xstyle?: StyleXStyles
}) {
  return (
    <ProgressContext.Provider value={{ size, color }}>
      <BaseProgress.Root
        data-slot='progress'
        className={(state) => cx(typeof className === 'function' ? className(state) : className)}
        {...stylex.props(
          progressStyles.root,
          size && progressSizes[size],
          color && progressColors[color],
          xstyle
        )}
        {...props}
      />
    </ProgressContext.Provider>
  )
}

export function ProgressLabel({
  className,
  xstyle,
  ...props
}: BaseProgress.Label.Props & { xstyle?: StyleXStyles }) {
  const context = React.useContext(ProgressContext)
  return (
    <BaseProgress.Label
      data-slot='progress-label'
      className={(state) => cx(typeof className === 'function' ? className(state) : className)}
      {...stylex.props(progressStyles.label, context.size && progressSizes[context.size], xstyle)}
      {...props}
    />
  )
}

export function ProgressValue({
  className,
  xstyle,
  ...props
}: BaseProgress.Value.Props & { xstyle?: StyleXStyles }) {
  const context = React.useContext(ProgressContext)
  return (
    <BaseProgress.Value
      data-slot='progress-value'
      className={(state) => cx(typeof className === 'function' ? className(state) : className)}
      {...stylex.props(progressStyles.value, context.size && progressSizes[context.size], xstyle)}
      {...props}
    />
  )
}

export function ProgressTrack({
  className,
  xstyle,
  ...props
}: BaseProgress.Track.Props & { xstyle?: StyleXStyles }) {
  const context = React.useContext(ProgressContext)
  return (
    <BaseProgress.Track
      data-slot='progress-track'
      className={(state) => cx(typeof className === 'function' ? className(state) : className)}
      {...stylex.props(progressStyles.track, context.size && progressSizes[context.size], xstyle)}
      {...props}
    />
  )
}

export function ProgressIndicator({
  className,
  xstyle,
  ...props
}: BaseProgress.Indicator.Props & { xstyle?: StyleXStyles }) {
  const context = React.useContext(ProgressContext)
  return (
    <BaseProgress.Indicator
      data-slot='progress-indicator'
      className={(state) => cx(typeof className === 'function' ? className(state) : className)}
      {...stylex.props(
        progressStyles.indicator,
        context.color && progressColors[context.color],
        xstyle
      )}
      {...props}
    />
  )
}
