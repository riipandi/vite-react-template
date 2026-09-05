import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { radius, unit } from '#/styles/core/tokens.stylex'

// Mirrors the token viewports (660/900) from `#/styles/core/tokens.stylex` as
// mobile-first `min-width` queries. @stylexjs/babel-plugin only inlines
// `defineConsts` media keys declared in the SAME file (and bound to a named
// export), so these cannot be imported cross-file — keep values in sync.
export const breakpoints = stylex.defineConsts({
  medium: '@media (min-width: 660px)',
  large: '@media (min-width: 900px)'
})

export const styles = stylex.create({
  content: {
    paddingLeft: unit.x4,
    paddingRight: unit.x4,
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem',
    textAlign: 'center',
    [breakpoints.medium]: {
      paddingLeft: unit.x6,
      paddingRight: unit.x6
    },
    [breakpoints.large]: {
      paddingLeft: unit.x8,
      paddingRight: unit.x8
    }
  },
  title: {
    display: 'block',
    fontSize: fontSize.headline1,
    fontWeight: fontWeight.bold,
    color: colors.foregroundNeutral,
    [breakpoints.medium]: {
      fontSize: fontSize.headline2
    }
  },
  message: {
    marginTop: unit.x6,
    fontSize: fontSize.body1,
    color: colors.foregroundNeutralFaded,
    [breakpoints.medium]: {
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
    [breakpoints.medium]: {
      paddingLeft: unit.x6,
      paddingRight: unit.x6
    },
    [breakpoints.large]: {
      paddingLeft: unit.x8,
      paddingRight: unit.x8
    }
  },
  footerText: {
    fontSize: fontSize.body2,
    color: colors.foregroundNeutralFaded
  }
})
