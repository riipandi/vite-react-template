import { Switch as BaseSwitch } from '@base-ui/react/switch'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, duration, easing, stroke } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'

export type SwitchSize = 'sm' | 'md'

export interface SwitchProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
  'className' | 'style'
> {
  size?: SwitchSize
  style?: stylex.StyleXStyles
}

export function Switch({ size = 'md', style, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root {...props} {...stylex.props(styles.root, rootSizes[size], style)}>
      <BaseSwitch.Thumb {...stylex.props(styles.thumb, thumbSizes[size])} />
    </BaseSwitch.Root>
  )
}

const styles = stylex.create({
  root: {
    backgroundColor: {
      default: colors.input,
      '[data-checked]': colors.primary,
      '[data-invalid]': colors.destructive
    },
    borderRadius: radius.full,
    borderStyle: 'none',
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    flexShrink: 0,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    outlineOffset: stroke.focus,
    padding: space.s05,
    position: 'relative',
    transitionDuration: duration.fast,
    transitionProperty: 'background-color',
    // Invisible expanded hit area (larger touch target).
    '::after': {
      content: '""',
      insetBlock: `calc(-1 * ${space.s2})`,
      insetInline: `calc(-1 * ${space.s3})`,
      position: 'absolute'
    }
  },
  thumb: {
    backgroundColor: colors.background,
    borderRadius: radius.full,
    transitionDuration: duration.fast,
    transitionProperty: {
      default: 'transform',
      '@media (prefers-reduced-motion: reduce)': 'none'
    },
    transitionTimingFunction: easing.inOut
  }
})

const rootSizes = stylex.create({
  md: {
    height: space.s5,
    width: space.s9
  },
  sm: {
    height: space.s4,
    width: space.s7
  }
})

const thumbSizes = stylex.create({
  md: {
    height: space.s4,
    transform: {
      default: 'translateX(0)',
      '[data-checked]': `translateX(${space.s4})`
    },
    width: space.s4
  },
  sm: {
    height: space.s3,
    transform: {
      default: 'translateX(0)',
      '[data-checked]': `translateX(${space.s3})`
    },
    width: space.s3
  }
})
