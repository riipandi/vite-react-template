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

export type SeparatorProps = React.ComponentProps<typeof BaseSeparator> & {
  /** Change component to render vertically */
  vertical?: boolean
  /** Change component to take no space, useful for borders in Tabs */
  blank?: boolean
  /** Color of the divider */
  color?: SeparatorColor
  /** Position for rendering children */
  contentPosition?: SeparatorContentPosition
  /** StyleX styles to apply */
  xstyle?: StyleXStyles
}

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

export function Separator({
  vertical = false,
  blank: isBlank = false,
  color = 'neutral-faded',
  contentPosition: position = 'center',
  className,
  style,
  children,
  xstyle,
  ...props
}: SeparatorProps) {
  const sx = stylex.props(
    s.orientation[vertical ? 'vertical' : 'horizontal'],
    s.colorStyles[color],
    position && s.contentPosition[position],
    isBlank && (vertical ? s.blank.vertical : s.blank.root),
    xstyle
  )

  const mergedClassName = [sx.className, className].filter(Boolean).join(' ') || undefined
  const mergedStyle = { ...sx.style, ...style }

  return (
    <BaseSeparator
      data-slot='separator'
      orientation={vertical ? 'vertical' : 'horizontal'}
      className={mergedClassName}
      style={mergedStyle}
      {...props}
    >
      {children}
    </BaseSeparator>
  )
}

Separator.displayName = 'Separator'
