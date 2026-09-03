import * as stylex from '@stylexjs/stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontSize } from '#/styles/core/font.stylex'
import { duration } from '#/styles/core/motion.stylex'
import { stroke } from '#/styles/core/size.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

export const inputGroupStyles = stylex.create({
  root: {
    // Block-aligned addons (textarea groups) stack the group vertically.
    alignItems: {
      default: 'center',
      ':has([data-align^="block"])': 'stretch'
    },
    backgroundColor: colors.background,
    borderColor: { default: colors.input, ':focus-within': colors.ring },
    borderRadius: radius.medium,
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
    gap: unit.x2,
    justifyContent: 'center',
    paddingBlock: unit.x1_5,
    userSelect: 'none'
  },
  text: {
    alignItems: 'center',
    color: colors.mutedForeground,
    display: 'flex',
    fontSize: fontSize.body2,
    gap: unit.x2
  },
  // The group draws the border and focus ring; the control inside goes bare.
  control: {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    flex: 1,
    outline: 'none'
  },
  textarea: {
    paddingBlock: unit.x2,
    resize: 'none'
  }
})

export const inputGroupAddonAligns = stylex.create({
  'inline-start': {
    order: -1,
    paddingLeft: unit.x2
  },
  'inline-end': {
    order: 9,
    paddingRight: unit.x2
  },
  'block-start': {
    justifyContent: 'flex-start',
    order: -1,
    paddingInline: unit.x3,
    paddingTop: unit.x2,
    width: '100%'
  },
  'block-end': {
    justifyContent: 'flex-start',
    order: 9,
    paddingBottom: unit.x2,
    paddingInline: unit.x3,
    width: '100%'
  }
})

export const inputGroupButtonSizes = stylex.create({
  xs: {
    borderRadius: radius.small,
    gap: unit.x1,
    height: unit.x6,
    paddingInline: unit.x1_5
  },
  iconXs: {
    borderRadius: radius.small,
    height: unit.x6,
    paddingInline: 0,
    width: unit.x6
  },
  iconSm: {
    height: unit.x8,
    paddingInline: 0,
    width: unit.x8
  }
})
