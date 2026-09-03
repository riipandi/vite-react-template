import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { fontFamily, fontSize } from '#/styles/core/tokens.stylex'
import { duration } from '#/styles/core/tokens.stylex'

export const numberFieldStyles = stylex.create({
  root: {
    fontFamily: fontFamily.body
  },
  group: {
    alignItems: 'stretch',
    backgroundColor: colors.backgroundPage,
    borderColor: { default: colors.borderNeutralFaded, ':focus-within': colors.foregroundPrimary },
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    height: unit.x9,
    outline: {
      default: 'none',
      ':focus-within': `${stroke.focus} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: `calc(-1 * ${stroke.border})`,
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: 'fit-content'
  },
  input: {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontVariantNumeric: 'tabular-nums',
    outline: 'none',
    padding: 0,
    textAlign: 'center',
    width: unit.x16
  },
  button: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover:not(:disabled)': colors.backgroundNeutral
    },
    borderStyle: 'none',
    color: {
      default: colors.foregroundNeutralFaded,
      ':hover:not(:disabled)': colors.foregroundNeutral
    },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'flex',
    justifyContent: 'center',
    opacity: { default: 1, ':disabled': 0.5 },
    outline: 'none',
    padding: 0,
    transitionDuration: duration.fast,
    transitionProperty: 'background-color, color',
    width: unit.x9
  },
  decrement: {
    borderBottomLeftRadius: `calc(${radius.medium} - ${stroke.border})`,
    borderRightColor: colors.borderNeutralFaded,
    borderRightStyle: 'solid',
    borderRightWidth: stroke.border,
    borderTopLeftRadius: `calc(${radius.medium} - ${stroke.border})`
  },
  increment: {
    borderBottomRightRadius: `calc(${radius.medium} - ${stroke.border})`,
    borderLeftColor: colors.borderNeutralFaded,
    borderLeftStyle: 'solid',
    borderLeftWidth: stroke.border,
    borderTopRightRadius: `calc(${radius.medium} - ${stroke.border})`
  },
  // Stacked controls: a narrow column pinned to the end edge with two
  // half-height buttons on top of each other (chevron up / chevron down).
  // It is a normal flex item (not absolute) so it reserves space next to
  // the input instead of covering it.
  controls: {
    alignItems: 'stretch',
    borderBottomRightRadius: `calc(${radius.medium} - ${stroke.border})`,
    borderLeftColor: colors.borderNeutralFaded,
    borderLeftStyle: 'solid',
    borderLeftWidth: stroke.border,
    borderTopRightRadius: `calc(${radius.medium} - ${stroke.border})`,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    overflow: 'hidden'
  },
  controlStacked: {
    width: unit.x6
  },
  controlStackedFirst: {
    borderTopRightRadius: `calc(${radius.medium} - ${stroke.border})`
  },
  controlStackedLast: {
    borderBottomRightRadius: `calc(${radius.medium} - ${stroke.border})`,
    borderTopColor: colors.borderNeutralFaded,
    borderTopStyle: 'solid',
    borderTopWidth: stroke.border
  }
})
