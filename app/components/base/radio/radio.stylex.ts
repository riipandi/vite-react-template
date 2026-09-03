import * as stylex from '@stylexjs/stylex'
import { stroke } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { duration } from '#/styles/core/motion.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

export const radioStyles = stylex.create({
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2
  },
  item: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: {
      default: colors.input,
      '[data-checked]': colors.primary,
      '[data-invalid]': colors.destructive
    },
    borderRadius: radius.circular,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    flexShrink: 0,
    height: unit.x4,
    justifyContent: 'center',
    opacity: { default: 1, ':disabled': 0.5 },
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    outlineOffset: stroke.focus,
    padding: 0,
    position: 'relative',
    transitionDuration: duration.fast,
    transitionProperty: 'border-color',
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
    backgroundColor: colors.primary,
    borderRadius: radius.circular,
    display: 'block',
    height: unit.x2,
    width: unit.x2
  }
})
