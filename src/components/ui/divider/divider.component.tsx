import * as stylex from '@stylexjs/stylex'
import type { FC } from 'react'
import { dividerStyles } from './divider.stylex'

interface HorizontalDividerProps {
  label?: string
  style?: stylex.StyleXStyles
}

export const HorizontalDivider: FC<HorizontalDividerProps> = ({ label, style }) => {
  const hasLabel = !!label

  return (
    <div
      {...stylex.props(
        dividerStyles.base,
        dividerStyles.before,
        dividerStyles.after,
        hasLabel && dividerStyles.withLabel,
        hasLabel && dividerStyles.labelBefore,
        hasLabel && dividerStyles.labelAfter,
        style
      )}
    >
      {label}
    </div>
  )
}
