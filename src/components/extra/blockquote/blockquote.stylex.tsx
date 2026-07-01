import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar, fontSizeVar, fontWeightVar } from '#/styles/tokens.stylex'

export const blockquoteStyles = stylex.create({
  base: {
    position: 'relative',
    borderRadius: radiusVar.lg,
    borderWidth: '4px',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    paddingTop: spaceVar[4],
    paddingBottom: spaceVar[4],
    paddingRight: spaceVar[4],
    color: colorVar.fgNeutral,
    fontSize: fontSizeVar.sm,
    lineHeight: 1.75
    // ans: `fontStyle: 'italic'` not supported in StyleX 0.19 — browser default italicizes blockquote
    // ans: `paddingBlock` not supported — using paddingTop+Bottomas
    // ans: `borderLeftWidth/Style/Color` not supported — using borderWidth (4px)+ side overrides (1px) instead
    // ans: ::before pseudo-element with quote mark content not supported in StyleX
  },
  author: {
    color: colorVar.fgNeutralFaded,
    marginTop: spaceVar[3],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium
    // ans: `fontStyle: 'normal'` not supported in StyleX 0.19 — browser default normal for cite
    // ans: ::before pseudo-element with horizontal line not supported in StyleX
  }
})

export const blockquoteVariants = stylex.create({
  default: {
    borderColor: colorVar.borderPrimary,
    backgroundColor: colorVar.bgPrimaryFaded
  },
  muted: {
    borderColor: colorVar.fgNeutralFaded,
    backgroundColor: colorVar.bgNeutralFaded,
    opacity: 0.5
  },
  primary: {
    borderColor: colorVar.borderPrimary,
    backgroundColor: colorVar.bgPrimaryFaded,
    opacity: 0.3
  },
  danger: {
    borderColor: colorVar.borderCritical,
    backgroundColor: colorVar.bgCriticalFaded,
    opacity: 0.3
  },
  success: {
    borderColor: colorVar.borderPositive,
    backgroundColor: colorVar.bgPositiveFaded,
    opacity: 0.3
  },
  warning: {
    borderColor: colorVar.borderWarning,
    backgroundColor: colorVar.bgWarningFaded,
    opacity: 0.3
  }
})

export const blockquoteSizes = stylex.create({
  sm: {
    paddingTop: spaceVar['2.5'],
    paddingBottom: spaceVar['2.5'],
    paddingLeft: spaceVar[4],
    fontSize: fontSizeVar.xs
  },
  md: {
    paddingTop: spaceVar[4],
    paddingBottom: spaceVar[4],
    paddingLeft: spaceVar[5],
    fontSize: fontSizeVar.sm
  },
  lg: {
    paddingTop: spaceVar[5],
    paddingBottom: spaceVar[5],
    paddingLeft: spaceVar[6],
    fontSize: fontSizeVar.md
  }
})
