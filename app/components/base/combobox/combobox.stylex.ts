import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke, container } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { duration } from '#/styles/core/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'

export const comboboxStyles = stylex.create({
  inputWrap: {
    position: 'relative',
    width: container.small
  },
  input: {
    backgroundColor: colors.backgroundPage,
    borderColor: { default: colors.borderNeutralFaded, ':focus-visible': colors.foregroundPrimary },
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
    paddingLeft: unit.x3,
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: '100%',
    '::placeholder': { color: colors.foregroundNeutralFaded }
  },
  // Right padding reserves room for the trigger/clear buttons overlaid on
  // the input — one button width each, none when both are hidden.
  inputPaddingNone: { paddingRight: unit.x3 },
  inputPaddingButtons1: { paddingRight: unit.x8 },
  inputPaddingButtons2: { paddingRight: unit.x16 },
  // Shared box for the absolutely-positioned icon buttons overlaid on the
  // input (trigger, clear).
  iconButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: colors.foregroundNeutralFaded,
    cursor: 'pointer',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    padding: 0,
    position: 'absolute',
    top: 0,
    width: unit.x8
  },
  inputTrigger: {
    right: 0
  },
  inputClearAlone: {
    right: 0
  },
  inputClearWithTrigger: {
    right: unit.x8
  },
  trigger: {
    alignItems: 'center',
    backgroundColor: colors.backgroundPage,
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    color: colors.foregroundNeutral,
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    gap: unit.x2,
    height: unit.x9,
    justifyContent: 'space-between',
    lineHeight: fontLineHeight.body2,
    minWidth: container.xxsmall,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: `calc(-1 * ${stroke.ring1})`,
    paddingInline: unit.x3,
    userSelect: 'none',
    whiteSpace: 'nowrap'
  },
  triggerIcon: {
    color: colors.foregroundNeutralFaded,
    display: 'flex'
  },
  chips: {
    alignItems: 'center',
    backgroundColor: colors.backgroundPage,
    borderColor: { default: colors.borderNeutralFaded, ':focus-within': colors.foregroundPrimary },
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    display: 'flex',
    flexWrap: 'wrap',
    gap: unit.x1,
    minHeight: unit.x9,
    outline: {
      default: 'none',
      ':focus-within': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: `calc(-1 * ${stroke.ring1})`,
    paddingBlock: unit.x1,
    paddingInline: unit.x2,
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: container.small
  },
  chip: {
    alignItems: 'center',
    backgroundColor: colors.backgroundNeutral,
    borderRadius: radius.small,
    color: colors.foregroundNeutral,
    display: 'inline-flex',
    fontSize: fontSize.caption1,
    gap: unit.x1,
    lineHeight: fontLineHeight.caption1,
    opacity: { default: 1, '[data-disabled]': 0.5 },
    paddingBlock: unit.x1,
    paddingLeft: unit.x2,
    paddingRight: unit.x1
  },
  chipRemove: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: radius.small,
    borderStyle: 'none',
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    height: unit.x4,
    justifyContent: 'center',
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    padding: 0,
    width: unit.x4
  },
  chipsInput: {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: colors.foregroundNeutral,
    flexBasis: 0,
    flexGrow: 1,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    minWidth: unit.x16,
    outline: 'none',
    padding: 0,
    '::placeholder': { color: colors.foregroundNeutralFaded }
  },
  // Closed pose (Base UI's [data-starting-style]/[data-ending-style] frames):
  // faded, slightly shrunk, nudged toward the anchor. [data-side] sets the
  // nudge direction; the transition animates entry and exit through it.
  // Shared frames live in `popupFx` (positioner/shift/fade/pose).
  popup: {
    backgroundColor: colors.backgroundElevationOverlay,
    borderRadius: radius.medium,
    color: colors.foregroundNeutral,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    maxHeight: `min(${container.small}, var(--available-height))`,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    outline: 'none',
    overflow: 'hidden',
    width: 'var(--anchor-width)'
  },
  list: {
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    paddingBlock: unit.x1
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
    marginInline: unit.x1,
    outline: 'none',
    opacity: { default: 1, '[data-disabled]': 0.5 },
    paddingBlock: unit.x1_5,
    paddingLeft: unit.x2,
    paddingRight: unit.x8,
    position: 'relative',
    userSelect: 'none'
  },
  indicator: {
    alignItems: 'center',
    display: 'flex',
    height: unit.x4,
    justifyContent: 'center',
    pointerEvents: 'none',
    position: 'absolute',
    right: unit.x2,
    width: unit.x4
  },
  label: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium,
    paddingBlock: unit.x1_5,
    paddingInline: unit.x3
  },
  empty: {
    color: colors.foregroundNeutralFaded,
    // Base UI renders the element with no children while results exist —
    // hide it then so its padding doesn't reserve space.
    display: { default: 'block', ':empty': 'none' },
    fontSize: fontSize.body2,
    paddingBlock: unit.x2,
    textAlign: 'center'
  },
  separator: {
    backgroundColor: colors.borderNeutralFaded,
    height: stroke.ring1,
    marginBlock: unit.x1
  }
})
