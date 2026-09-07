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
  // The digits sit right of the country selector inside the group. Neutralize
  // inner borders, outline, and corner radius so the outer container owns them.
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
  // Country trigger shown inside the group, left of the digits. Sized to
  // content, no border/radius of its own, with caret hidden.
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
    // Visually separate the selector from the digits with a divider.
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
    height: unit.x4,
    justifyContent: 'center',
    overflow: 'hidden',
    width: unit.x5
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
  // Popup width follows the container token (not the anchor trigger, which is
  // only as wide as the flag).
  popup: {
    width: container.xsmall
  },
  // Popup search input — full width of the popup, sits above the list.
  countrySearch: {
    paddingBlock: unit.x1_5,
    width: '100%'
  }
})
