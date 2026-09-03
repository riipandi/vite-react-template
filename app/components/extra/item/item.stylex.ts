import * as stylex from '@stylexjs/stylex'
import { space, duration, stroke } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'

export const itemStyles = stylex.create({
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.s4,
    width: '100%'
  },
  root: {
    alignItems: 'center',
    borderRadius: radius.lg,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.focus} solid ${colors.ring}`
    },
    textDecoration: 'none',
    transitionDuration: duration.fast,
    transitionProperty: 'background-color, border-color',
    width: '100%'
  },
  media: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    gap: space.s2,
    justifyContent: 'center'
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: space.s1
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: space.s2,
    lineHeight: fontLineHeight.body2,
    width: 'fit-content'
  },
  description: {
    color: colors.mutedForeground,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    margin: 0,
    textAlign: 'left'
  },
  actions: {
    alignItems: 'center',
    display: 'flex',
    gap: space.s2
  },
  headerFooter: {
    alignItems: 'center',
    display: 'flex',
    flexBasis: '100%',
    gap: space.s2,
    justifyContent: 'space-between'
  }
})

export const itemVariants = stylex.create({
  default: {
    borderColor: 'transparent'
  },
  outline: {
    borderColor: colors.border
  },
  muted: {
    backgroundColor: `color-mix(in srgb, ${colors.muted} 50%, transparent)`,
    borderColor: 'transparent'
  }
})

export const itemSizes = stylex.create({
  xs: {
    gap: space.s2,
    paddingBlock: space.s2,
    paddingInline: space.s25
  },
  sm: {
    gap: space.s25,
    paddingBlock: space.s25,
    paddingInline: space.s3
  },
  md: {
    gap: space.s25,
    paddingBlock: space.s25,
    paddingInline: space.s3
  }
})

export const itemMediaVariants = stylex.create({
  default: {},
  icon: {
    color: colors.foreground
  },
  image: {
    borderRadius: radius.sm,
    height: space.s10,
    overflow: 'hidden',
    width: space.s10
  }
})
