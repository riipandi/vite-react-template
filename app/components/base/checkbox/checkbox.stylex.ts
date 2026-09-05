import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { duration } from '#/styles/core/tokens.stylex'
import { fontFamily } from '#/styles/core/tokens.stylex'

export const checkboxStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: {
      default: colors.backgroundPage,
      '[data-checked]': colors.backgroundPrimary,
      '[data-indeterminate]': colors.backgroundPrimary
    },
    borderColor: {
      default: colors.borderNeutralFaded,
      '[data-checked]': colors.backgroundPrimary,
      '[data-indeterminate]': colors.backgroundPrimary,
      '[data-invalid]': colors.borderCritical
    },
    borderRadius: radius.small,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    flexShrink: 0,
    height: unit.x4,
    justifyContent: 'center',
    opacity: { default: 1, ':disabled': 0.5 },
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: stroke.ring2,
    padding: 0,
    position: 'relative',
    transitionDuration: duration.fast,
    transitionProperty: 'background-color, border-color',
    width: unit.x4,
    // Invisible expanded hit area (larger touch target).
    '::after': {
      content: '""',
      insetBlock: `calc(-1 * ${unit.x2})`,
      insetInline: `calc(-1 * ${unit.x3})`,
      position: 'absolute'
    }
  },
  indicator: {
    alignItems: 'center',
    color: colors.onBrand,
    display: 'flex',
    justifyContent: 'center'
  }
})

export const checkboxGroupStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: unit.x2
  }
})
