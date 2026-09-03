import * as stylex from '@stylexjs/stylex'
import { space, stroke } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontSize } from '#/styles/core/font.stylex'
import { duration } from '#/styles/core/motion.stylex'
import { radius } from '#/styles/core/size.stylex'

export const numberFieldStyles = stylex.create({
  root: {
    fontFamily: fontFamily.body
  },
  group: {
    alignItems: 'stretch',
    backgroundColor: colors.background,
    borderColor: { default: colors.input, ':focus-within': colors.ring },
    borderRadius: radius.medium,
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
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
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
    borderBottomLeftRadius: `calc(${radius.medium} - ${stroke.border})`,
    borderRightColor: colors.border,
    borderRightStyle: 'solid',
    borderRightWidth: stroke.border,
    borderTopLeftRadius: `calc(${radius.medium} - ${stroke.border})`
  },
  increment: {
    borderBottomRightRadius: `calc(${radius.medium} - ${stroke.border})`,
    borderLeftColor: colors.border,
    borderLeftStyle: 'solid',
    borderLeftWidth: stroke.border,
    borderTopRightRadius: `calc(${radius.medium} - ${stroke.border})`
  }
})
