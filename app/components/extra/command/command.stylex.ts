import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { stroke, container, duration } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'

export const commandStyles = stylex.create({
  root: {
    backgroundColor: colors.backgroundElevationOverlay,
    borderRadius: radius.xlarge,
    color: colors.foregroundNeutral,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    height: '100%',
    overflow: 'hidden',
    padding: unit.x1,
    width: '100%'
  },
  dialogContent: {
    borderRadius: radius.xlarge,
    gap: 0,
    overflow: 'hidden',
    padding: 0,
    top: '33%',
    transform: 'translate(-50%, 0)'
  },
  srOnly: {
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: `calc(-1 * ${stroke.border})`,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
  },
  inputWrap: {
    alignItems: 'center',
    backgroundColor: `color-mix(in srgb, ${colors.borderNeutralFaded} 30%, transparent)`,
    borderColor: {
      default: `color-mix(in srgb, ${colors.borderNeutralFaded} 30%, transparent)`,
      ':focus-within': colors.foregroundPrimary
    },
    borderRadius: radius.large,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    gap: unit.x2,
    height: unit.x8,
    margin: unit.x1,
    marginBottom: 0,
    paddingInline: unit.x2,
    transitionDuration: duration.fast,
    transitionProperty: 'border-color'
  },
  inputIcon: {
    flexShrink: 0,
    opacity: 0.5
  },
  input: {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    height: '100%',
    outline: 'none',
    padding: 0,
    width: '100%',
    '::placeholder': { color: colors.foregroundNeutralFaded }
  },
  list: {
    maxHeight: container.sm,
    outline: 'none',
    overflowY: 'auto',
    padding: unit.x1,
    scrollPaddingBlock: unit.x1
  },
  empty: {
    // Base UI renders the element with no children while results exist —
    // hide it then so its padding doesn't reserve space.
    display: { default: 'block', ':empty': 'none' },
    fontSize: fontSize.body2,
    paddingBlock: unit.x6,
    textAlign: 'center'
  },
  groupLabel: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium,
    paddingBlock: unit.x1_5,
    paddingInline: unit.x2
  },
  item: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      '[data-highlighted]': colors.backgroundNeutralFaded
    },
    borderRadius: radius.small,
    color: {
      default: null,
      '[data-highlighted]': colors.foregroundNeutral,
      '[data-disabled]': colors.foregroundNeutralFaded
    },
    cursor: 'default',
    display: 'flex',
    fontSize: fontSize.body2,
    gap: unit.x2,
    lineHeight: fontLineHeight.body2,
    outline: 'none',
    opacity: { default: 1, '[data-disabled]': 0.5 },
    paddingBlock: unit.x1_5,
    paddingInline: unit.x2,
    position: 'relative',
    userSelect: 'none'
  },
  separator: {
    backgroundColor: colors.borderNeutralFaded,
    height: stroke.border,
    marginBlock: unit.x1,
    marginInline: `calc(-1 * ${unit.x1})`
  },
  shortcut: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1,
    letterSpacing: '0.1em',
    marginLeft: 'auto'
  }
})
