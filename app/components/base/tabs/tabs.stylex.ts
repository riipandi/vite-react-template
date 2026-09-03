import * as stylex from '@stylexjs/stylex'
import { space, fontSize, lineHeight, duration, stroke } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight } from '#/styles/core/font.stylex'

export const tabsStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: space.s2
  },
  rootVertical: {
    flexDirection: 'row'
  },
  list: {
    alignItems: { default: 'center', '[data-orientation="vertical"]': 'stretch' },
    backgroundColor: colors.muted,
    borderRadius: radius.md,
    display: 'inline-flex',
    flexDirection: { default: 'row', '[data-orientation="vertical"]': 'column' },
    gap: space.s1,
    height: { default: null, '[data-orientation="vertical"]': 'fit-content' },
    padding: space.s1,
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
    borderRadius: radius.sm,
    borderStyle: 'none',
    color: { default: colors.mutedForeground, '[data-active]': colors.foreground },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    height: space.s7,
    justifyContent: 'center',
    lineHeight: lineHeight.none,
    opacity: { default: 1, ':disabled': 0.5 },
    outline: { default: 'none', ':focus-visible': `${stroke.focus} solid ${colors.ring}` },
    outlineOffset: `calc(-1 * ${stroke.focus})`,
    paddingInline: space.s3,
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
    height: space.s9,
    marginBottom: `calc(-1 * ${stroke.border})`
  },
  content: {
    color: colors.foreground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.normal,
    outline: 'none'
  }
})
