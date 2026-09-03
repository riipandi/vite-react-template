import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { spinnerStyles as s } from './spinner.stylex'

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
      {...stylex.props(s.root, style)}
    >
      <path d={`M8 1.5a6.5 6.5 0 1 1-6.5 6.5`} />
    </svg>
  )
}
