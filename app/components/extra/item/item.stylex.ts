import * as stylex from '@stylexjs/stylex'
import { stroke } from '#/lib/constants.stylex'
import { colors } from '#/lib/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/font.stylex'
import { duration } from '#/styles/core/motion.stylex'
import { unit, radius } from '#/styles/core/size.stylex'

export const itemStyles = stylex.create({
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x4,
    width: '100%'
  },
  root: {
    alignItems: 'center',
    borderRadius: radius.large,
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
    gap: unit.x2,
    justifyContent: 'center'
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: unit.x1
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: unit.x2,
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
    gap: unit.x2
  },
  headerFooter: {
    alignItems: 'center',
    display: 'flex',
    flexBasis: '100%',
    gap: unit.x2,
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
    gap: unit.x2,
    paddingBlock: unit.x2,
    paddingInline: unit.x3
  },
  sm: {
    gap: unit.x3,
    paddingBlock: unit.x3,
    paddingInline: unit.x3
  },
  md: {
    gap: unit.x3,
    paddingBlock: unit.x3,
    paddingInline: unit.x3
  }
})

export const itemMediaVariants = stylex.create({
  default: {},
  icon: {
    color: colors.foreground
  },
  image: {
    borderRadius: radius.small,
    height: unit.x10,
    overflow: 'hidden',
    width: unit.x10
  }
})
