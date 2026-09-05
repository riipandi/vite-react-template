import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'

export const badgeStyles = stylex.create({
  root: {
    alignItems: 'center',
    borderRadius: radius.full,
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium,
    gap: unit.x1,
    lineHeight: fontLineHeight.caption1,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: stroke.ring2,
    paddingBlock: unit.x1,
    paddingInline: unit.x3,
    whiteSpace: 'nowrap'
  }
})

export const badgeVariants = stylex.create({
  primary: {
    backgroundColor: colors.backgroundPrimary,
    color: colors.onBrand
  },
  secondary: {
    backgroundColor: colors.backgroundNeutral,
    color: colors.foregroundNeutral
  },
  outline: {
    borderColor: colors.borderNeutralFaded,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    color: colors.foregroundNeutral
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.foregroundNeutral
  },
  destructive: {
    backgroundColor: colors.backgroundCritical,
    color: colors.onBackgroundCritical
  }
})
