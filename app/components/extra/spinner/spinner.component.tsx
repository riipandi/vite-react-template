import * as stylex from '@stylexjs/stylex'
import * as React from 'react'

export interface SpinnerProps extends Omit<
  React.ComponentPropsWithoutRef<'svg'>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function Spinner({ style, ...props }: SpinnerProps) {
  return (
    <svg
      role='status'
      aria-label='Loading'
      width='16'
      height='16'
      viewBox={`0 0 16 16`}
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      {...props}
      {...stylex.props(styles.root, style)}
    >
      <path d={`M8 1.5a6.5 6.5 0 1 1-6.5 6.5`} />
    </svg>
  )
}

const spin = stylex.keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
})

const styles = stylex.create({
  root: {
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationName: spin,
    animationTimingFunction: 'linear',
    flexShrink: 0
  }
})
