import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { fontFamily, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { duration } from '#/styles/core/tokens.stylex'

export const textareaStyles = stylex.create({
  root: {
    backgroundColor: colors.backgroundPage,
    borderColor: {
      default: colors.borderNeutralFaded,
      ':focus-visible': colors.foregroundPrimary,
      '[data-invalid]': colors.borderCritical
    },
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    minHeight: unit.x16,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: `calc(-1 * ${stroke.border})`,
    paddingBlock: unit.x2,
    paddingInline: unit.x3,
    resize: 'vertical',
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: '100%',
    '::placeholder': { color: colors.foregroundNeutralFaded }
  }
})
