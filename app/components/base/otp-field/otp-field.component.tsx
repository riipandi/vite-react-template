import { OTPField as BaseOTPField } from '@base-ui/react/otp-field'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, fontSize, lineHeight, duration, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

interface StyleProp {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

export function OTPField({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseOTPField.Root>, 'className' | 'style'> &
  StyleProp) {
  return <BaseOTPField.Root {...props} {...stylex.props(styles.root, style)} />
}

export function OTPFieldGroup({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return <div {...props} {...stylex.props(styles.group, style)} />
}

export function OTPFieldSlot({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof BaseOTPField.Input>, 'className' | 'style'> &
  StyleProp) {
  return <BaseOTPField.Input {...props} {...stylex.props(styles.slot, style)} />
}

export function OTPFieldSeparator({
  style,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> & StyleProp) {
  return (
    <div role='separator' {...props} {...stylex.props(styles.separator, style)}>
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
    </div>
  )
}

const styles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: font.sans,
    gap: space.s2
  },
  group: {
    alignItems: 'center',
    display: 'flex'
  },
  // Slots fuse into one field: shared vertical borders, a leading border only
  // on the first slot, and end radii — joined-slot look. The
  // focused slot draws a full ring above its neighbors.
  slot: {
    backgroundColor: colors.background,
    borderBottomLeftRadius: { default: 0, ':first-child': radius.lg },
    borderBottomRightRadius: { default: 0, ':last-child': radius.lg },
    borderColor: { default: colors.input, ':focus': colors.ring },
    borderStyle: 'solid',
    borderTopLeftRadius: { default: 0, ':first-child': radius.lg },
    borderTopRightRadius: { default: 0, ':last-child': radius.lg },
    borderWidth: stroke.border,
    boxShadow: {
      default: 'none',
      ':focus': `0 0 0 ${stroke.halo} color-mix(in srgb, ${colors.ring} 50%, transparent)`
    },
    color: colors.foreground,
    fontSize: fontSize.sm,
    height: space.s8,
    lineHeight: lineHeight.control,
    marginLeft: { default: `calc(-1 * ${stroke.border})`, ':first-child': 0 },
    opacity: { default: 1, ':disabled': 0.5 },
    outline: 'none',
    padding: 0,
    position: 'relative',
    textAlign: 'center',
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, box-shadow',
    width: space.s8,
    zIndex: { default: 0, ':focus': 1 }
  },
  separator: {
    alignItems: 'center',
    color: colors.mutedForeground,
    display: 'flex'
  }
})
