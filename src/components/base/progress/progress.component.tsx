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

const progressStyles = tv({
  slots: {
    root: 'grid w-full gap-y-2',
    label: 'text-foreground-neutral text-sm font-medium',
    value: 'text-foreground-neutral-faded text-right text-sm',
    track: 'bg-border-neutral-faded col-span-full overflow-hidden rounded-full',
    indicator: 'bg-foreground-neutral block h-full transition-all duration-300 ease-out'
  },
  variants: {
    size: {
      xs: { root: 'grid-cols-2', label: 'text-xs', value: 'text-xs', track: 'h-1' },
      sm: { root: 'grid-cols-2', label: 'text-sm', value: 'text-sm', track: 'h-1.5' },
      md: { root: 'grid-cols-2', label: 'text-sm', value: 'text-sm', track: 'h-2' },
      lg: { root: 'grid-cols-2', label: 'text-base', value: 'text-base', track: 'h-2.5' },
      xl: { root: 'grid-cols-2', label: 'text-base', value: 'text-base', track: 'h-3' }
    },
    color: {
      primary: { indicator: 'bg-background-primary' },
      neutral: { indicator: 'bg-foreground-neutral' },
      positive: { indicator: 'bg-background-positive' },
      warning: { indicator: 'bg-background-warning' },
      critical: { indicator: 'bg-background-critical' }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
})

export type ProgressStyles = VariantProps<typeof progressStyles>

const ProgressContext = React.createContext<ProgressStyles>({
  color: 'primary',
  size: 'md'
})

export function Progress({
  className,
  size,
  color,
  ...props
}: BaseProgress.Root.Props & ProgressStyles) {
  const styles = progressStyles({ size, color })
  return (
    <ProgressContext.Provider value={{ size, color }}>
      <BaseProgress.Root
        className={(state) =>
          cx(styles.root(), typeof className === 'function' ? className(state) : className)
        }
        {...props}
      />
    </ProgressContext.Provider>
  )
}

export function ProgressLabel({ className, ...props }: BaseProgress.Label.Props & ProgressStyles) {
  const context = React.useContext(ProgressContext)
  const styles = progressStyles({ size: context.size })
  return (
    <BaseProgress.Label
      className={(state) =>
        cx(styles.label(), typeof className === 'function' ? className(state) : className)
      }
      {...props}
    />
  )
}

export function ProgressValue({ className, ...props }: BaseProgress.Value.Props & ProgressStyles) {
  const context = React.useContext(ProgressContext)
  const styles = progressStyles({ size: context.size })
  return (
    <BaseProgress.Value
      className={(state) =>
        cx(styles.value(), typeof className === 'function' ? className(state) : className)
      }
      {...props}
    />
  )
}

export function ProgressTrack({ className, ...props }: BaseProgress.Track.Props & ProgressStyles) {
  const context = React.useContext(ProgressContext)
  const styles = progressStyles({ size: context.size })
  return (
    <BaseProgress.Track
      className={(state) =>
        cx(styles.track(), typeof className === 'function' ? className(state) : className)
      }
      {...props}
    />
  )
}

export function ProgressIndicator({
  className,
  ...props
}: BaseProgress.Indicator.Props & ProgressStyles) {
  const context = React.useContext(ProgressContext)
  const styles = progressStyles({ color: context.color })
  return (
    <BaseProgress.Indicator
      className={(state) =>
        cx(styles.indicator(), typeof className === 'function' ? className(state) : className)
      }
      {...props}
    />
  )
}
