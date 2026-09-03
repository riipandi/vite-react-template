import * as stylex from '@stylexjs/stylex'
import { stroke } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/font.stylex'
import { duration } from '#/styles/core/motion.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

export const inputStyles = stylex.create({
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
    height: unit.x9,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    outlineOffset: `calc(-1 * ${stroke.border})`,
    paddingInline: unit.x3,
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: '100%',
    '::placeholder': { color: colors.mutedForeground },
    // type="file": render the browser's picker button as quiet inline text,
    // vertically centered inside the fixed-height control.
    '::file-selector-button': {
      backgroundColor: 'transparent',
      borderStyle: 'none',
      color: colors.foreground,
      fontFamily: fontFamily.body,
      fontSize: fontSize.body2,
      fontWeight: fontWeight.medium,
      height: '100%',
      marginInlineEnd: unit.x3,
      padding: 0
    }
  }
})
