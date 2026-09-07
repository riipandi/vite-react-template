import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { container, duration, radius, stroke, unit } from '#/styles/core/tokens.stylex'
import { fontFamily, fontLineHeight, fontSize } from '#/styles/core/tokens.stylex'

export const inputPhoneStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.backgroundPage,
    borderColor: {
      default: colors.borderNeutralFaded,
      ':focus-within': colors.foregroundPrimary,
      '[data-invalid]': colors.borderCritical
    },
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: fontFamily.body,
    height: unit.x9,
    minWidth: 0,
    opacity: { default: 1, ':has(:disabled)': 0.5 },
    outline: {
      default: 'none',
      ':focus-within': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: `calc(-1 * ${stroke.ring1})`,
    position: 'relative',
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: '100%'
  },
  control: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: radius.none,
    borderStyle: 'none',
    borderWidth: 0,
    boxSizing: 'border-box',
    color: colors.foregroundNeutral,
    flex: 1,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    height: '100%',
    lineHeight: fontLineHeight.body2,
    margin: 0,
    minWidth: 0,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: {
      default: 'none',
      ':focus': 'none',
      ':focus-visible': 'none'
    },
    outlineOffset: 0,
    paddingBlock: 0,
    paddingInline: unit.x3,
    transitionDuration: duration.fast,
    transitionProperty: 'color',
    width: '100%',
    '::placeholder': { color: colors.foregroundNeutralFaded }
  },
  countryTrigger: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: radius.none,
    borderStyle: 'none',
    borderWidth: 0,
    boxSizing: 'border-box',
    caretColor: 'transparent',
    color: colors.foregroundNeutral,
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'flex',
    flexShrink: 0,
    fontFamily: 'inherit',
    fontSize: fontSize.body2,
    gap: unit.x1,
    height: '100%',
    justifyContent: 'center',
    lineHeight: fontLineHeight.body2,
    margin: 0,
    minWidth: 0,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: {
      default: 'none',
      ':focus': 'none',
      ':focus-visible': 'none'
    },
    outlineOffset: 0,
    paddingBlock: 0,
    paddingInline: unit.x3,
    position: 'relative',
    userSelect: 'none',
    '::after': {
      backgroundColor: colors.borderNeutralFaded,
      content: '""',
      height: unit.x5,
      position: 'absolute',
      right: 0,
      width: stroke.ring1
    }
  },
  flag: {
    alignItems: 'center',
    borderRadius: radius.small,
    display: 'flex',
    height: unit.x5,
    justifyContent: 'center',
    overflow: 'hidden',
    width: unit.x6
  },
  flagFallback: {
    height: unit.x4,
    opacity: 0.6,
    width: unit.x4
  },
  countryLabel: {
    flex: 1
  },
  countryCode: {
    color: colors.foregroundNeutralFaded
  },
  popup: {
    minWidth: container.xxsmall,
    width: 'var(--anchor-width)'
  },
  searchWrap: {
    alignItems: 'center',
    borderBottomColor: colors.borderNeutralFaded,
    borderBottomStyle: 'solid',
    borderBottomWidth: stroke.ring1,
    boxSizing: 'border-box',
    display: 'flex',
    gap: unit.x2,
    paddingBlock: unit.x1_5,
    paddingInline: unit.x3,
    position: 'relative',
    width: '100%'
  },
  searchIcon: {
    color: colors.foregroundNeutralFaded,
    flexShrink: 0,
    height: unit.x4,
    width: unit.x4
  },
  countrySearchWrap: {
    flex: 1,
    minWidth: 0,
    width: '100%'
  },
  countrySearchInput: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: radius.none,
    borderStyle: 'none',
    borderWidth: 0,
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    height: unit.x8,
    opacity: 1,
    outline: {
      default: 'none',
      ':focus': 'none',
      ':focus-visible': 'none'
    },
    outlineOffset: 0,
    paddingInline: 0,
    width: '100%',
    '::placeholder': { color: colors.foregroundNeutralFaded }
  }
})
