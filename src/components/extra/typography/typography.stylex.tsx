import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  fontSizeVar,
  fontWeightVar,
  spaceVar,
  fontFamilyVar
} from '#/styles/tokens.stylex'

export const headingStyles = stylex.create({
  base: {
    color: colorVar.fgNeutral,
    letterSpacing: 'normal',
    fontWeight: fontWeightVar.semibold
  }
})

export const headingSizes = stylex.create({
  xs: {
    fontSize: fontSizeVar.lg
  },
  sm: {
    fontSize: fontSizeVar.xl
  },
  md: {
    fontSize: fontSizeVar['2xl']
  },
  lg: {
    fontSize: fontSizeVar['3xl'],
    letterSpacing: '-0.025em'
  },
  xl: {
    fontSize: fontSizeVar['4xl'],
    fontWeight: fontWeightVar.extrabold
    // ans: textWrap not supported in StyleX 0.19
  }
})

export const textStyles = stylex.create({
  base: {
    color: colorVar.fgNeutral,
    fontSize: fontSizeVar.sm,
    lineHeight: 1.75,
    letterSpacing: 'normal'
  }
})

export const leadStyles = stylex.create({
  base: {
    color: colorVar.fgNeutralFaded,
    fontSize: fontSizeVar.lg,
    lineHeight: 1.75
  }
})

export const textLinkStyles = stylex.create({
  base: {
    color: colorVar.fgNeutral,
    alignItems: 'flex-end',
    fontSize: fontSizeVar.sm,
    textDecoration: 'underline',
    // ans: textUnderlineOffset not supported in StyleX 0.19
    display: 'inline-flex',
    gap: spaceVar[2],
    transitionProperty: 'all',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease',
    ':hover': {
      color: colorVar.fgPrimary
    }
  }
})

export const strongStyles = stylex.create({
  base: {
    color: colorVar.fgNeutral,
    fontWeight: fontWeightVar.semibold
  }
})

export const codeStyles = stylex.create({
  base: {
    backgroundColor: colorVar.bgNeutralFaded,
    borderRadius: '0.125rem',
    paddingInline: spaceVar[2],
    paddingTop: spaceVar[1],
    paddingBottom: spaceVar[1],
    fontWeight: fontWeightVar.semibold,
    color: colorVar.fgNeutral,
    fontFamily: fontFamilyVar.mono,
    fontSize: fontSizeVar.xs,
    letterSpacing: '-0.025em'
  }
})
