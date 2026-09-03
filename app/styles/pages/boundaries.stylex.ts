import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/color.stylex'
import { fontSize, fontWeight } from '#/styles/core/font.stylex'
import { radius, unit } from '#/styles/core/size.stylex'

export const styles = stylex.create({
  content: {
    paddingLeft: unit.x4,
    paddingRight: unit.x4,
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem',
    textAlign: 'center',
    '@media (min-width: 640px)': {
      paddingLeft: unit.x6,
      paddingRight: unit.x6
    },
    '@media (min-width: 1024px)': {
      paddingLeft: unit.x8,
      paddingRight: unit.x8
    }
  },
  title: {
    display: 'block',
    fontSize: fontSize.headline1,
    fontWeight: fontWeight.bold,
    color: colors.foregroundNeutral,
    '@media (min-width: 640px)': {
      fontSize: fontSize.headline2
    }
  },
  message: {
    marginTop: unit.x6,
    fontSize: fontSize.body1,
    color: colors.foregroundNeutralFaded,
    '@media (min-width: 640px)': {
      marginTop: unit.x8
    }
  },
  errorDetail: {
    fontSize: fontSize.body2
  },
  actionWrapper: {
    marginTop: unit.x8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: unit.x2,
    borderRadius: radius.medium,
    paddingLeft: unit.x3,
    paddingRight: unit.x3,
    paddingTop: unit.x2,
    paddingBottom: unit.x2,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.semibold,
    color: colors.foregroundPrimary,
    textDecoration: 'none',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    ':hover': {
      textDecoration: 'underline'
    },
    ':focus-visible': {
      outlineWidth: 1,
      outlineStyle: 'solid',
      outlineColor: colors.foregroundPrimary,
      outlineOffset: 2
    }
  },
  footer: {
    marginTop: 'auto',
    paddingTop: unit.x5,
    paddingBottom: unit.x5,
    textAlign: 'center'
  },
  footerInner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '80rem',
    paddingLeft: unit.x4,
    paddingRight: unit.x4,
    '@media (min-width: 640px)': {
      paddingLeft: unit.x6,
      paddingRight: unit.x6
    },
    '@media (min-width: 1024px)': {
      paddingLeft: unit.x8,
      paddingRight: unit.x8
    }
  },
  footerText: {
    fontSize: fontSize.body2,
    color: colors.foregroundNeutralFaded
  }
})
