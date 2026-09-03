import * as stylex from '@stylexjs/stylex'
import { stroke } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize } from '#/styles/core/font.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

export const avatarStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.circular,
    display: 'inline-flex',
    // Fixed-size chrome: never let a flex row squeeze the avatar.
    flexShrink: 0,
    fontFamily: fontFamily.body,
    justifyContent: 'center',
    // No overflow:hidden here — it would clip AvatarBadge at the corner;
    // the image and fallback round themselves instead.
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'middle'
  },
  image: {
    borderRadius: radius.circular,
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  },
  fallback: {
    alignItems: 'center',
    borderRadius: radius.circular,
    color: colors.mutedForeground,
    display: 'flex',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderColor: colors.background,
    borderRadius: radius.circular,
    borderStyle: 'solid',
    borderWidth: stroke.focus,
    color: colors.primaryForeground,
    display: 'flex',
    insetInlineEnd: 0,
    insetBlockEnd: 0,
    justifyContent: 'center',
    minHeight: unit.x4,
    minWidth: unit.x4,
    position: 'absolute'
  },
  group: {
    alignItems: 'center',
    display: 'flex'
  },
  groupItem: {
    borderRadius: radius.circular,
    display: 'inline-flex'
  },
  groupItemOverlap: {
    marginInlineStart: `calc(-1 * ${unit.x2})`
  },
  groupItemStack: (order: number) => ({
    zIndex: order
  }),
  groupCount: {
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: radius.circular,
    color: colors.mutedForeground,
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium,
    justifyContent: 'center'
  }
})

export const avatarSizes = stylex.create({
  sm: { height: unit.x8, width: unit.x8 },
  md: { height: unit.x10, width: unit.x10 },
  lg: { height: unit.x12, width: unit.x12 }
})
