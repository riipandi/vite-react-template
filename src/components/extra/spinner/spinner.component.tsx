/**
 * A rotating loading indicator for displaying pending states.
 *
 * Anatomy:
 * <Spinner />
 */

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { spinnerSizes, spinnerStyles } from './spinner.stylex'

export type SpinnerSize = keyof typeof spinnerSizes

export type SpinnerProps = React.ComponentProps<'svg'> & {
  size?: SpinnerSize
  xstyle?: StyleXStyles
}

export function Spinner({ size, xstyle, ...props }: SpinnerProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      data-slot='spinner'
      {...stylex.props(spinnerStyles.base, size && spinnerSizes[size], xstyle)}
      {...props}
    >
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  )
}
