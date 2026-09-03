import * as stylex from '@stylexjs/stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { duration } from '#/styles/core/motion.stylex'
import { stroke } from '#/styles/core/size.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

export const textareaStyles = stylex.create({
  root: {
    backgroundColor: colors.background,
    borderColor: {
      default: colors.input,
      ':focus-visible': colors.ring,
      '[data-invalid]': colors.destructive
    },
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    color: colors.foreground,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    minHeight: unit.x16,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    outlineOffset: `calc(-1 * ${stroke.border})`,
    paddingBlock: unit.x2,
    paddingInline: unit.x3,
    resize: 'vertical',
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: '100%',
    '::placeholder': { color: colors.mutedForeground }
  }
})
