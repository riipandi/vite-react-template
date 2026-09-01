import * as stylex from '@stylexjs/stylex'
import {
  fontSizeVar,
  fontWeightVar,
  radiusVar,
  spaceVar,
  colorVar,
} from '#/styles/core/tokens.stylex'

export const styles = stylex.create({
  content: {
    paddingLeft: spaceVar[4],
    paddingRight: spaceVar[4],
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem',
    textAlign: 'center',
    '@media (min-width: 640px)': {
      paddingLeft: spaceVar[6],
      paddingRight: spaceVar[6]
    },
    '@media (min-width: 1024px)': {
      paddingLeft: spaceVar[8],
      paddingRight: spaceVar[8]
    }
  },
  title: {
    display: 'block',
    fontSize: fontSizeVar['7xl'],
    fontWeight: fontWeightVar.bold,
    color: colorVar.fgNeutral,
    '@media (min-width: 640px)': {
      fontSize: fontSizeVar['8xl']
    }
  },
  message: {
    marginTop: spaceVar[6],
    fontSize: fontSizeVar.lg,
    color: colorVar.fgNeutralFaded,
    '@media (min-width: 640px)': {
      marginTop: spaceVar[8]
    }
  },
  errorDetail: {
    fontSize: fontSizeVar.sm
  },
  actionWrapper: {
    marginTop: spaceVar[8],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spaceVar[2],
    borderRadius: radiusVar.md,
    paddingLeft: spaceVar[3],
    paddingRight: spaceVar[3],
    paddingTop: spaceVar[2],
    paddingBottom: spaceVar[2],
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.semibold,
    color: colorVar.fgPrimary,
    textDecoration: 'none',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    ':hover': {
      textDecoration: 'underline'
    },
    ':focus-visible': {
      outlineWidth: 1,
      outlineStyle: 'solid',
      outlineColor: colorVar.fgPrimary,
      outlineOffset: 2
    }
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spaceVar[5],
    paddingBottom: spaceVar[5],
    textAlign: 'center'
  },
  footerInner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '80rem',
    paddingLeft: spaceVar[4],
    paddingRight: spaceVar[4],
    '@media (min-width: 640px)': {
      paddingLeft: spaceVar[6],
      paddingRight: spaceVar[6]
    },
    '@media (min-width: 1024px)': {
      paddingLeft: spaceVar[8],
      paddingRight: spaceVar[8]
    }
  },
  footerText: {
    fontSize: fontSizeVar.sm,
    color: colorVar.fgNeutralFaded
  }
})
