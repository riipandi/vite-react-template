import * as stylex from '@stylexjs/stylex'
import { space, fontSize, fontWeight, stroke } from '#/lib/constants.stylex'
import { colors, font, radius } from '#/lib/tokens.stylex'

export const avatarStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.full,
    display: 'inline-flex',
    // Fixed-size chrome: never let a flex row squeeze the avatar.
    flexShrink: 0,
    fontFamily: font.sans,
    justifyContent: 'center',
    // No overflow:hidden here — it would clip AvatarBadge at the corner;
    // the image and fallback round themselves instead.
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'middle'
  },
  image: {
    borderRadius: radius.full,
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  },
  fallback: {
    alignItems: 'center',
    borderRadius: radius.full,
    color: colors.mutedForeground,
    display: 'flex',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderColor: colors.background,
    borderRadius: radius.full,
    borderStyle: 'solid',
    borderWidth: stroke.focus,
    color: colors.primaryForeground,
    display: 'flex',
    insetInlineEnd: 0,
    insetBlockEnd: 0,
    justifyContent: 'center',
    minHeight: space.s4,
    minWidth: space.s4,
    position: 'absolute'
  },
  group: {
    alignItems: 'center',
    display: 'flex'
  },
  groupItem: {
    borderRadius: radius.full,
    display: 'inline-flex'
  },
  groupItemOverlap: {
    marginInlineStart: `calc(-1 * ${space.s2})`
  },
  groupItemStack: (order: number) => ({
    zIndex: order
  }),
  groupCount: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.full,
    color: colors.mutedForeground,
    display: 'flex',
    fontFamily: font.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    justifyContent: 'center'
  }
})

export const avatarSizes = stylex.create({
  sm: { height: space.s8, width: space.s8 },
  md: { height: space.s10, width: space.s10 },
  lg: { height: space.s12, width: space.s12 }
})
