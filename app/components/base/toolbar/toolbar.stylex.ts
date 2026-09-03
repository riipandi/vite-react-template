import * as stylex from '@stylexjs/stylex'
import { space, stroke } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'
import { fontFamily } from '#/styles/core/font.stylex'

export const toolbarStyles = stylex.create({
  root: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    fontFamily: fontFamily.body,
    gap: space.s1,
    padding: space.s1,
    width: 'fit-content'
  },
  group: {
    alignItems: 'center',
    display: 'flex',
    gap: space.s1
  },
  separator: {
    alignSelf: 'stretch',
    backgroundColor: colors.border,
    marginBlock: space.s1,
    marginInline: space.s1,
    width: stroke.border
  }
})
