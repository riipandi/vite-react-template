import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, fontSize, duration, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

interface StyleProp {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

export const NumberFieldScrubArea = BaseNumberField.ScrubArea
export const NumberFieldScrubAreaCursor = BaseNumberField.ScrubAreaCursor

export function NumberField({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Root>, 'className' | 'style'> &
  StyleProp) {
  return <BaseNumberField.Root {...props} {...stylex.props(styles.root, style)} />
}

export function NumberFieldGroup({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Group>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseNumberField.Group {...props} {...stylex.props(styles.group, style)}>
      {children ?? (
        <>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </>
      )}
    </BaseNumberField.Group>
  )
}

export function NumberFieldInput({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Input>, 'className' | 'style'> &
  StyleProp) {
  return <BaseNumberField.Input {...props} {...stylex.props(styles.input, style)} />
}

export function NumberFieldDecrement({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Decrement>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseNumberField.Decrement {...props} {...stylex.props(styles.button, styles.decrement, style)}>
      {children ?? (
        <svg
          width='16'
          height='16'
          viewBox={`0 0 16 16`}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          aria-hidden
        >
          <path d={`M4 8h8`} />
        </svg>
      )}
    </BaseNumberField.Decrement>
  )
}

export function NumberFieldIncrement({
  style,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseNumberField.Increment>, 'className' | 'style'> &
  StyleProp) {
  return (
    <BaseNumberField.Increment {...props} {...stylex.props(styles.button, styles.increment, style)}>
      {children ?? (
        <svg
          width='16'
          height='16'
          viewBox={`0 0 16 16`}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          aria-hidden
        >
          <path d={`M8 4v8M4 8h8`} />
        </svg>
      )}
    </BaseNumberField.Increment>
  )
}

const styles = stylex.create({
  root: {
    fontFamily: font.sans
  },
  group: {
    alignItems: 'stretch',
    backgroundColor: colors.background,
    borderColor: { default: colors.input, ':focus-within': colors.ring },
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    height: space.s9,
    outline: {
      default: 'none',
      ':focus-within': `${stroke.focus} solid ${colors.ring}`
    },
    outlineOffset: `calc(-1 * ${stroke.border})`,
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: 'fit-content'
  },
  input: {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: colors.foreground,
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    fontVariantNumeric: 'tabular-nums',
    outline: 'none',
    padding: 0,
    textAlign: 'center',
    width: space.s16
  },
  button: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': colors.muted
    },
    borderStyle: 'none',
    color: {
      default: colors.mutedForeground,
      ':hover:not(:disabled)': colors.foreground
    },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'flex',
    justifyContent: 'center',
    opacity: { default: 1, ':disabled': 0.5 },
    outline: 'none',
    padding: 0,
    transitionDuration: duration.fast,
    transitionProperty: 'background-color, color',
    width: space.s9
  },
  decrement: {
    borderBottomLeftRadius: `calc(${radius.md} - ${stroke.border})`,
    borderRightColor: colors.border,
    borderRightStyle: 'solid',
    borderRightWidth: stroke.border,
    borderTopLeftRadius: `calc(${radius.md} - ${stroke.border})`
  },
  increment: {
    borderBottomRightRadius: `calc(${radius.md} - ${stroke.border})`,
    borderLeftColor: colors.border,
    borderLeftStyle: 'solid',
    borderLeftWidth: stroke.border,
    borderTopRightRadius: `calc(${radius.md} - ${stroke.border})`
  }
})
