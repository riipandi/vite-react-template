import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, duration, stroke } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'

export interface CheckboxProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>,
  'className' | 'style'
> {
  style?: stylex.StyleXStyles
}

export function Checkbox({ style, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root {...props} {...stylex.props(styles.root, style)}>
      <BaseCheckbox.Indicator
        render={(indicatorProps, state) => (
          <span {...indicatorProps} {...stylex.props(styles.indicator)}>
            <svg
              width='12'
              height='12'
              viewBox={`0 0 12 12`}
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden
            >
              {state.indeterminate ? <path d={`M2.5 6h7`} /> : <path d={`M2 6.5 4.5 9 10 3`} />}
            </svg>
          </span>
        )}
      />
    </BaseCheckbox.Root>
  )
}

const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: {
      default: colors.background,
      '[data-checked]': colors.primary,
      '[data-indeterminate]': colors.primary
    },
    borderColor: {
      default: colors.input,
      '[data-checked]': colors.primary,
      '[data-indeterminate]': colors.primary,
      '[data-invalid]': colors.destructive
    },
    borderRadius: radius.sm,
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
    transitionProperty: 'background-color, border-color',
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
    alignItems: 'center',
    color: colors.primaryForeground,
    display: 'flex',
    justifyContent: 'center'
  }
})
