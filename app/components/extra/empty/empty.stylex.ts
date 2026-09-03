import * as stylex from '@stylexjs/stylex'
import { space, fontSize, lineHeight, fontWeight, stroke, container } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

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
    fontFamily: font.sans,
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
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    letterSpacing: '-0.01em'
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.normal
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: fontSize.sm,
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
