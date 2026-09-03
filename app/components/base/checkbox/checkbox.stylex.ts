import * as stylex from '@stylexjs/stylex'
import { space, duration, stroke } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'
import { font } from '#/lib/tokens.stylex'

export const checkboxStyles = stylex.create({
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

export const checkboxGroupStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: font.sans,
    gap: space.s2
  }
})
