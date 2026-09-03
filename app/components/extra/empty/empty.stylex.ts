import * as stylex from '@stylexjs/stylex'
import { space, stroke, container } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'

export const emptyStyles = stylex.create({
  root: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderStyle: 'dashed',
    borderWidth: stroke.border,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: space.s4,
    justifyContent: 'center',
    minWidth: 0,
    padding: space.s6,
    textAlign: 'center',
    textWrap: 'balance',
    width: '100%'
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: space.s2,
    maxWidth: container.lg
  },
  media: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    marginBottom: space.s2
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
    gap: space.s25,
    maxWidth: container.lg,
    minWidth: 0,
    width: '100%'
  }
})

export const emptyMediaVariants = stylex.create({
  default: {},
  icon: {
    backgroundColor: colors.muted,
    borderRadius: radius.lg,
    color: colors.foreground,
    height: space.s8,
    width: space.s8
  }
})
