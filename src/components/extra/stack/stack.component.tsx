/**
 * A flexible container for arranging child elements with configurable spacing and direction.
 *
 * Anatomy:
 * <Stack>
 *   {children}
 * </Stack>
 */

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { stackDirections, stackSpacings, stackStyles } from './stack.stylex'

export type StackDirection = keyof typeof stackDirections
export type StackSpacing = keyof typeof stackSpacings

export type StackProps = React.ComponentProps<'div'> & {
  direction?: StackDirection
  spacing?: StackSpacing
  xstyle?: StyleXStyles
}

export function Stack({
  direction = 'column',
  spacing = 'md',
  children,
  xstyle,
  ...props
}: StackProps) {
  return (
    <div
      data-slot='stack'
      {...stylex.props(
        stackStyles.base,
        stackDirections[direction],
        stackSpacings[spacing],
        xstyle
      )}
      {...props}
    >
      {children}
    </div>
  )
}
