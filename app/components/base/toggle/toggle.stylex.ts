import * as stylex from '@stylexjs/stylex'
import { space, fontSize, fontWeight, lineHeight, duration, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

export const toggleStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': colors.muted,
      '[data-pressed]': colors.muted
    },
    borderRadius: radius.lg,
    borderStyle: 'none',
    color: {
      default: colors.foreground,
      ':hover:not(:disabled)': colors.foreground
    },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    gap: space.s1,
    justifyContent: 'center',
    lineHeight: lineHeight.none,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    outlineOffset: stroke.focus,
    transitionDuration: duration.fast,
    transitionProperty: 'background-color, border-color, color, opacity',
    userSelect: 'none',
    whiteSpace: 'nowrap'
  }
})

export const toggleVariants = stylex.create({
  default: {},
  outline: {
    borderColor: colors.input,
    borderStyle: 'solid',
    borderWidth: stroke.border
  }
})

export const toggleSizes = stylex.create({
  sm: {
    fontSize: fontSize.xs,
    height: space.s7,
    minWidth: space.s7,
    paddingInline: space.s25
  },
  md: {
    height: space.s8,
    minWidth: space.s8,
    paddingInline: space.s25
  },
  lg: {
    height: space.s9,
    minWidth: space.s9,
    paddingInline: space.s25
  }
})
