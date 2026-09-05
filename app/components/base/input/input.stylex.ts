import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/tokens.stylex'
import { duration } from '#/styles/core/tokens.stylex'

export const inputStyles = stylex.create({
  root: {
    backgroundColor: colors.backgroundPage,
    borderColor: {
      default: colors.borderNeutralFaded,
      ':focus-visible': colors.foregroundPrimary,
      '[data-invalid]': colors.borderCritical
    },
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    height: unit.x9,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: `calc(-1 * ${stroke.ring1})`,
    paddingInline: unit.x3,
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: '100%',
    '::placeholder': { color: colors.foregroundNeutralFaded },
    // type="file": render the browser's picker button as quiet inline text,
    // vertically centered inside the fixed-height control.
    '::file-selector-button': {
      backgroundColor: 'transparent',
      borderStyle: 'none',
      color: colors.foregroundNeutral,
      fontFamily: fontFamily.body,
      fontSize: fontSize.body2,
      fontWeight: fontWeight.medium,
      height: '100%',
      marginInlineEnd: unit.x3,
      padding: 0
    }
  }
})
