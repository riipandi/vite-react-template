import * as stylex from '@stylexjs/stylex'
import type { FC } from 'react'
import { cx } from '#/lib/utils'
import { dividerStyles } from './divider.stylex'

interface HorizontalDividerProps {
  label?: string
  className?: string
}

export const HorizontalDivider: FC<HorizontalDividerProps> = ({ label, className }) => {
  const hasLabel = !!label
  const sx = stylex.props(
    dividerStyles.base,
    dividerStyles.before,
    dividerStyles.after,
    hasLabel && dividerStyles.withLabel,
    hasLabel && dividerStyles.labelBefore,
    hasLabel && dividerStyles.labelAfter
  )
  return (
    <div className={cx(sx.className, className)} style={sx.style}>
      {label}
    </div>
  )
}
