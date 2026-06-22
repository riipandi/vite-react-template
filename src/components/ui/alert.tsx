import * as stylex from '@stylexjs/stylex'
import type { FC, ReactNode } from 'react'
import { cx } from '#/lib/utils'
import { colors, radius, space, fontSize } from '#/styles/tokens.stylex'

interface AlertProps {
  variant?: 'info' | 'success' | 'destructive' | 'warning' | 'subtle'
  children: ReactNode
  className?: string
}

const alertStyles = stylex.create({
  base: {
    width: '100%',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderLeftWidth: 4,
    paddingTop: space[3],
    paddingBottom: space[3],
    paddingLeft: space[4],
    paddingRight: space[4],
    fontSize: fontSize.sm,
    lineHeight: '1.5',
    transitionProperty: 'background-color, border-color, color',
    transitionDuration: '200ms'
  },
  info: {
    borderColor: colors.primary200,
    borderLeftColor: colors.primary500,
    backgroundColor: colors.primary50,
    color: colors.primary700
  },
  success: {
    borderColor: colors.green200,
    borderLeftColor: colors.green700,
    backgroundColor: colors.green50,
    color: colors.green700
  },
  destructive: {
    borderColor: colors.destructive200,
    borderLeftColor: colors.destructive500,
    backgroundColor: colors.destructive50,
    color: colors.destructive700
  },
  warning: {
    borderColor: colors.orange200,
    borderLeftColor: colors.orange700,
    backgroundColor: colors.orange50,
    color: colors.orange700
  },
  subtle: {
    borderColor: colors.zinc200,
    borderLeftColor: colors.zinc400,
    backgroundColor: colors.zinc50,
    color: colors.zinc600
  }
})

const variantMap = {
  info: alertStyles.info,
  success: alertStyles.success,
  destructive: alertStyles.destructive,
  warning: alertStyles.warning,
  subtle: alertStyles.subtle
} as const

export const Alert: FC<AlertProps> = ({ children, variant = 'info', className }) => {
  const sx = stylex.props(alertStyles.base, variantMap[variant])
  return (
    <div className={cx(sx.className, className)} style={sx.style} role='alert'>
      {children}
    </div>
  )
}
