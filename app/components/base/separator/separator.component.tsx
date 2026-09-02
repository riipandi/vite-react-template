/**
 * Separator component with Reshaped-inspired API.
 *
 * @see: https://base-ui.com/react/components/separator
 *
 * Anatomy:
 *   <Separator />
 *   <Separator vertical />
 *   <Separator>Label</Separator>
 *   <Separator blank />
 */

import { Separator as BaseSeparator } from '@base-ui/react/separator'
import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { separatorStyles as s } from './separator.stylex'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SeparatorColor = keyof typeof s.colorStyles
type SeparatorContentPosition = keyof typeof s.contentPosition

type SeparatorInset = keyof typeof s.inset

export type SeparatorProps = Omit<React.ComponentProps<typeof BaseSeparator>, 'style'> & {
  /** Change component to render vertically */
  vertical?: boolean
  /** Change component to take no space, useful for borders in Tabs */
  blank?: boolean
  /** Color of the divider */
  color?: SeparatorColor
  /** Position for rendering children */
  contentPosition?: SeparatorContentPosition
  /** Inset the divider from the container bounds */
  inset?: SeparatorInset
  /** StyleX styles to apply */
  style?: StyleXStyles
}

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

export function Separator({
  vertical = false,
  blank: isBlank = false,
  color = 'neutral-faded',
  contentPosition: position = 'center',
  inset,
  className,
  children,
  style,
  ...props
}: SeparatorProps) {
  const sx = stylex.props(
    s.orientation[vertical ? 'vertical' : 'horizontal'],
    s.colorStyles[color],
    position && s.contentPosition[position],
    isBlank && (vertical ? s.blank.vertical : s.blank.root),
    inset && (vertical ? s.insetVertical[inset] : s.inset[inset]),
    style
  )

  const mergedClassName = [sx.className, className].filter(Boolean).join(' ') || undefined

  return (
    <BaseSeparator
      data-slot='separator'
      orientation={vertical ? 'vertical' : 'horizontal'}
      className={mergedClassName}
      style={sx.style}
      {...props}
    >
      {children}
    </BaseSeparator>
  )
}

Separator.displayName = 'Separator'
