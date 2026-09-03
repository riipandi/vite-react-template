import * as stylex from '@stylexjs/stylex'
import { stroke } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { duration } from '#/styles/core/motion.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

export const tabsStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: unit.x2
  },
  rootVertical: {
    flexDirection: 'row'
  },
  list: {
    alignItems: { default: 'center', '[data-orientation="vertical"]': 'stretch' },
    backgroundColor: colors.muted,
    borderRadius: radius.medium,
    display: 'inline-flex',
    flexDirection: { default: 'row', '[data-orientation="vertical"]': 'column' },
    gap: unit.x1,
    height: { default: null, '[data-orientation="vertical"]': 'fit-content' },
    padding: unit.x1,
    width: 'fit-content'
  },
  listLine: {
    backgroundColor: 'transparent',
    borderBottomColor: colors.border,
    borderBottomStyle: 'solid',
    borderBottomWidth: stroke.border,
    borderRadius: 0,
    gap: 0,
    padding: 0
  },
  trigger: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      '[data-active]': colors.background
    },
    borderRadius: radius.small,
    borderStyle: 'none',
    color: { default: colors.mutedForeground, '[data-active]': colors.foreground },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    height: unit.x7,
    justifyContent: 'center',
    lineHeight: fontLineHeight.body2,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    outlineOffset: `calc(-1 * ${stroke.focus})`,
    paddingInline: unit.x3,
    transitionDuration: duration.fast,
    transitionProperty: 'background-color, color, border-color',
    userSelect: 'none',
    whiteSpace: 'nowrap'
  },
  // Underline style: the active tab draws a bar over the list's bottom border.
  triggerLine: {
    backgroundColor: 'transparent',
    borderBottomColor: {
      default: 'transparent',
      '[data-active]': colors.primary
    },
    borderBottomStyle: 'solid',
    borderBottomWidth: stroke.focus,
    borderRadius: 0,
    height: unit.x9,
    marginBottom: `calc(-1 * ${stroke.border})`
  },
  content: {
    color: colors.foreground,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    outline: 'none'
  }
})
