import * as stylex from '@stylexjs/stylex'
import { stroke } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { duration } from '#/styles/core/motion.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

export const toggleStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': colors.muted,
      '[data-pressed]': colors.muted
    },
    borderRadius: radius.large,
    borderStyle: 'none',
    color: {
      default: colors.foreground,
      ':hover:not(:disabled)': colors.foreground
    },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: unit.x1,
    justifyContent: 'center',
    lineHeight: fontLineHeight.body2,
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
    fontSize: fontSize.caption1,
    height: unit.x7,
    minWidth: unit.x7,
    paddingInline: unit.x2
  },
  md: {
    height: unit.x8,
    minWidth: unit.x8,
    paddingInline: unit.x2
  },
  lg: {
    height: unit.x9,
    minWidth: unit.x9,
    paddingInline: unit.x2
  }
})
