import * as stylex from '@stylexjs/stylex'
import { stroke, container } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

export const emptyStyles = stylex.create({
  root: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.xlarge,
    borderStyle: 'dashed',
    borderWidth: stroke.border,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: unit.x4,
    justifyContent: 'center',
    minWidth: 0,
    padding: unit.x6,
    textAlign: 'center',
    textWrap: 'balance',
    width: '100%'
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2,
    maxWidth: container.lg
  },
  media: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    marginBottom: unit.x2
  },
  title: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    letterSpacing: '-0.01em'
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: fontSize.body2,
    gap: unit.x2,
    maxWidth: container.lg,
    minWidth: 0,
    width: '100%'
  }
})

export const emptyMediaVariants = stylex.create({
  default: {},
  icon: {
    backgroundColor: colors.muted,
    borderRadius: radius.large,
    color: colors.foreground,
    height: unit.x8,
    width: unit.x8
  }
})
