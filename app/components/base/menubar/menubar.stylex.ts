import * as stylex from '@stylexjs/stylex'
import { space, fontSize, fontWeight, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

export const menubarStyles = stylex.create({
  root: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    fontFamily: font.sans,
    gap: space.s05,
    height: space.s8,
    paddingInline: space.s05
  },
  trigger: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.muted,
      '[data-popup-open]': colors.muted
    },
    borderRadius: radius.sm,
    borderStyle: 'none',
    color: colors.foreground,
    cursor: 'default',
    display: 'flex',
    fontFamily: font.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    outline: 'none',
    paddingBlock: space.s05,
    paddingInline: space.s15,
    userSelect: 'none'
  },
  // Menubar popups size to their content, not the trigger.
  content: {
    width: 'max-content'
  }
})
