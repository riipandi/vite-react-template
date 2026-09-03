import * as stylex from '@stylexjs/stylex'
import type * as Lucide from 'lucide-react'
import * as React from 'react'
import { Text, type TextProps } from '#/components/extra/text'
import { loaderTextStyles as styles } from './loader-text.stylex'

export interface LoaderTextProps extends Pick<
  TextProps,
  'children' | 'variant' | 'weight' | 'color'
> {
  /** Leading icon, sized relative to the text. */
  icon?: Lucide.LucideIcon
  /** Text that cross-fades with the children once `completed` becomes true. */
  completedText?: React.ReactNode
  /** Mark the loader as completed, stopping the shimmer. */
  completed?: boolean
  style?: stylex.StyleXStyles
}

export function LoaderText({
  icon: Icon,
  children,
  completedText,
  completed = false,
  variant = 'body-2',
  weight,
  color,
  style
}: LoaderTextProps) {
  const hasCompletedText = completedText != null
  const showCompleted = hasCompletedText && completed

  return (
    <Text variant={variant} weight={weight} color={color} {...stylex.props(styles.root, style)}>
      {Icon ? <Icon size='1em' strokeWidth={1.8} {...stylex.props(styles.icon)} /> : null}
      <span {...stylex.props(styles.container)}>
        <span
          {...stylex.props(
            styles.text,
            !completed && styles.textShimmer,
            showCompleted && styles.textExit
          )}
        >
          {children}
        </span>
        {hasCompletedText ? (
          <span {...stylex.props(styles.completedText, showCompleted && styles.completedTextEnter)}>
            {completedText}
          </span>
        ) : null}
      </span>
    </Text>
  )
}
