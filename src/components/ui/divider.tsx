import * as stylex from '@stylexjs/stylex'
import type { FC } from 'react'
import { colors, fontSize, space } from '#/assets/styles/tokens.stylex'
import { cx } from '#/lib/utils'

interface HorizontalDividerProps {
  label?: string
  className?: string
}

const dividerStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: space[5],
    paddingBottom: space[5],
    color: colors.zinc500,
    transitionProperty: 'color',
    transitionDuration: '200ms'
  },
  withLabel: {
    alignItems: 'center',
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: colors.zinc400
  },
  before: {
    '::before': {
      content: '',
      display: 'block',
      flex: '1 1 0%',
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: colors.zinc200,
      transitionProperty: 'border-color',
      transitionDuration: '200ms'
    }
  },
  after: {
    '::after': {
      content: '',
      display: 'block',
      flex: '1 1 0%',
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: colors.zinc200,
      transitionProperty: 'border-color',
      transitionDuration: '200ms'
    }
  },
  labelBefore: {
    '::before': {
      marginRight: space[6]
    }
  },
  labelAfter: {
    '::after': {
      marginLeft: space[6]
    }
  }
})

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
