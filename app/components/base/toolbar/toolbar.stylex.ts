import * as stylex from '@stylexjs/stylex'
import { stroke } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily } from '#/styles/core/font.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

export const toolbarStyles = stylex.create({
  root: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.large,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    fontFamily: fontFamily.body,
    gap: unit.x1,
    padding: unit.x1,
    width: 'fit-content'
  },
  group: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x1
  },
  separator: {
    alignSelf: 'stretch',
    backgroundColor: colors.border,
    marginBlock: unit.x1,
    marginInline: unit.x1,
    width: stroke.border
  }
})
