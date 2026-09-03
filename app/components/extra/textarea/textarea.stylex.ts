import * as stylex from '@stylexjs/stylex'
import { space, fontSize, lineHeight, duration, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

export const textareaStyles = stylex.create({
  root: {
    backgroundColor: colors.background,
    borderColor: {
      default: colors.input,
      ':focus-visible': colors.ring,
      '[data-invalid]': colors.destructive
    },
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    color: colors.foreground,
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.normal,
    minHeight: space.s16,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    outlineOffset: `calc(-1 * ${stroke.border})`,
    paddingBlock: space.s2,
    paddingInline: space.s3,
    resize: 'vertical',
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: '100%',
    '::placeholder': { color: colors.mutedForeground }
  }
})
