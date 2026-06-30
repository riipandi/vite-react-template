/**
 * A decorative container for icons with optional background and styling.
 *
 * Anatomy:
 * <IconBox />
 */

import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { iconBoxCircles, iconBoxSizes, iconBoxStyles, iconBoxVariants } from './icon-box.stylex'

export type IconBoxVariant = keyof typeof iconBoxVariants
export type IconBoxSize = keyof typeof iconBoxSizes

export type IconBoxProps = React.ComponentProps<'div'> & {
  variant?: IconBoxVariant
  size?: IconBoxSize
  circle?: boolean
  xstyle?: StyleXStyles
}

export function IconBox({
  variant = 'primary',
  size = 'md',
  circle,
  children,
  xstyle,
  ...props
}: IconBoxProps) {
  return (
    <div
      data-slot='iconbox'
      {...stylex.props(
        iconBoxStyles.base,
        iconBoxVariants[variant],
        iconBoxSizes[size],
        circle && iconBoxCircles.true,
        xstyle
      )}
      {...props}
    >
      {children}
    </div>
  )
}
