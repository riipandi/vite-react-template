/**
 * A compact interactive element for displaying and filtering content.
 *
 * Anatomy:
 * <Chip>
 *   <ChipButton />
 * </Chip>
 */

import { useRender } from '@base-ui/react/use-render'
import type { StyleXStyles } from '@stylexjs/stylex'
import * as stylex from '@stylexjs/stylex'
import { chipPills, chipSizes, chipStyles, chipVariants } from './chip.stylex'

export type ChipVariant = keyof typeof chipVariants
export type ChipSize = keyof typeof chipSizes

export type ChipProps = useRender.ComponentProps<'div'> & {
  variant?: ChipVariant
  size?: ChipSize
  pill?: boolean
  xstyle?: StyleXStyles
}
export type ChipButtonProps = useRender.ComponentProps<'button'> & {
  xstyle?: StyleXStyles
}

// ans: Chip uses useRender — stylex.props passed directly to props
export function Chip({
  render,
  variant = 'default',
  size = 'md',
  pill,
  xstyle,
  ...props
}: ChipProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: {
      'data-slot': 'chip',
      ...stylex.props(
        chipStyles.base,
        chipVariants[variant],
        chipSizes[size],
        pill && chipPills.true,
        xstyle
      ),
      ...props
    }
  })
}

export function ChipButton({ xstyle, ...props }: ChipButtonProps) {
  return <button data-slot='chip-button' {...stylex.props(chipStyles.button, xstyle)} {...props} />
}
