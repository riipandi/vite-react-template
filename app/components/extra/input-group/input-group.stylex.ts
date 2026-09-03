import * as stylex from '@stylexjs/stylex'
import { space, duration, stroke } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'
import { fontFamily, fontSize } from '#/styles/core/font.stylex'

export const inputGroupStyles = stylex.create({
  root: {
    // Block-aligned addons (textarea groups) stack the group vertically.
    alignItems: {
      default: 'center',
      ':has([data-align^="block"])': 'stretch'
    },
    backgroundColor: colors.background,
    borderColor: { default: colors.input, ':focus-within': colors.ring },
    borderRadius: radius.md,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    flexDirection: {
      default: 'row',
      ':has([data-align^="block"])': 'column'
    },
    fontFamily: fontFamily.body,
    minWidth: 0,
    outline: {
      default: 'none',
      ':focus-within': `${stroke.focus} solid ${colors.ring}`
    },
    outlineOffset: `calc(-1 * ${stroke.border})`,
    position: 'relative',
    transitionDuration: duration.fast,
    transitionProperty: 'border-color, outline-color',
    width: '100%'
  },
  addon: {
    alignItems: 'center',
    color: colors.mutedForeground,
    cursor: 'text',
    display: 'flex',
    fontSize: fontSize.body2,
    gap: space.s2,
    justifyContent: 'center',
    paddingBlock: space.s15,
    userSelect: 'none'
  },
  text: {
    alignItems: 'center',
    color: colors.mutedForeground,
    display: 'flex',
    fontSize: fontSize.body2,
    gap: space.s2
  },
  // The group draws the border and focus ring; the control inside goes bare.
  control: {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    flex: 1,
    outline: 'none'
  },
  textarea: {
    paddingBlock: space.s2,
    resize: 'none'
  }
})

export const inputGroupAddonAligns = stylex.create({
  'inline-start': {
    order: -1,
    paddingLeft: space.s2
  },
  'inline-end': {
    order: 9,
    paddingRight: space.s2
  },
  'block-start': {
    justifyContent: 'flex-start',
    order: -1,
    paddingInline: space.s25,
    paddingTop: space.s2,
    width: '100%'
  },
  'block-end': {
    justifyContent: 'flex-start',
    order: 9,
    paddingBottom: space.s2,
    paddingInline: space.s25,
    width: '100%'
  }
})

export const inputGroupButtonSizes = stylex.create({
  xs: {
    borderRadius: radius.sm,
    gap: space.s1,
    height: space.s6,
    paddingInline: space.s15
  },
  iconXs: {
    borderRadius: radius.sm,
    height: space.s6,
    paddingInline: 0,
    width: space.s6
  },
  iconSm: {
    height: space.s8,
    paddingInline: 0,
    width: space.s8
  }
})
