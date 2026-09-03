import { Radio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, duration, stroke } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'

interface StyleProp {
  style?: stylex.StyleXStyles
}

export function RadioGroup({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseRadioGroup>, 'className' | 'style'> & StyleProp) {
  return <BaseRadioGroup {...props} {...stylex.props(styles.group, style)} />
}

export function RadioGroupItem({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Radio.Root>, 'className' | 'style'> & StyleProp) {
  return (
    <Radio.Root {...props} {...stylex.props(styles.item, style)}>
      <Radio.Indicator {...stylex.props(styles.indicator)} />
    </Radio.Root>
  )
}

const styles = stylex.create({
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.s2
  },
  item: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: {
      default: colors.input,
      '[data-checked]': colors.primary,
      '[data-invalid]': colors.destructive
    },
    borderRadius: radius.full,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    flexShrink: 0,
    height: space.s4,
    justifyContent: 'center',
    opacity: { default: 1, ':disabled': 0.5 },
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    outlineOffset: stroke.focus,
    padding: 0,
    position: 'relative',
    transitionDuration: duration.fast,
    transitionProperty: 'border-color',
    width: space.s4,
    // Invisible expanded hit area (larger touch target).
    '::after': {
      content: '""',
      insetBlock: `calc(-1 * ${space.s2})`,
      insetInline: `calc(-1 * ${space.s3})`,
      position: 'absolute'
    }
  },
  indicator: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    display: 'block',
    height: space.s2,
    width: space.s2
  }
})
