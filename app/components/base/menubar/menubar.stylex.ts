import * as stylex from '@stylexjs/stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/tokens.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'

export const menubarStyles = stylex.create({
  root: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.large,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    fontFamily: fontFamily.body,
    gap: unit.x0_5,
    height: unit.x8,
    paddingInline: unit.x0_5
  },
  trigger: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.muted,
      '[data-popup-open]': colors.muted
    },
    borderRadius: radius.small,
    borderStyle: 'none',
    color: colors.foreground,
    cursor: 'default',
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    outline: 'none',
    paddingBlock: unit.x0_5,
    paddingInline: unit.x1_5,
    userSelect: 'none'
  },
  // Menubar popups size to their content, not the trigger.
  content: {
    width: 'max-content'
  }
})
