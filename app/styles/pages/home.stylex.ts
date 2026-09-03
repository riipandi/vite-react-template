import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize } from '#/styles/core/tokens.stylex'
import { unit } from '#/styles/core/tokens.stylex'

export const homeStyles = stylex.create({
  header: {
    marginBottom: 'auto',
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    padding: unit.x4
  },
  content: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x8,
    paddingLeft: {
      default: unit.x4,
      '@media (min-width: 640px)': unit.x6,
      '@media (min-width: 1024px)': unit.x8
    },
    paddingRight: {
      default: unit.x4,
      '@media (min-width: 640px)': unit.x6,
      '@media (min-width: 1024px)': unit.x8
    },
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem'
  },
  tagline: {
    textAlign: 'center',
    fontSize: fontSize.body1,
    color: colors.foregroundNeutralFaded,
    maxWidth: '36rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: {
      default: 0,
      '@media (min-width: 640px)': unit.x8
    }
  },
  actions: {
    marginTop: unit.x4,
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 640px)': 'row'
    },
    alignItems: 'center',
    justifyContent: 'center',
    gap: {
      default: unit.x2,
      '@media (min-width: 640px)': unit.x3
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
    paddingLeft: {
      default: unit.x4,
      '@media (min-width: 640px)': unit.x6,
      '@media (min-width: 1024px)': unit.x8
    },
    paddingRight: {
      default: unit.x4,
      '@media (min-width: 640px)': unit.x6,
      '@media (min-width: 1024px)': unit.x8
    }
  },
  footerText: {
    fontSize: fontSize.body2,
    letterSpacing: '0.025em',
    color: colors.foregroundNeutralFaded
  },
  footerSubText: {
    marginTop: unit.x2,
    fontSize: fontSize.body2,
    letterSpacing: '0.025em',
    color: colors.foregroundNeutralFaded
  },
  alert: {
    fontSize: fontSize.body2,
    padding: unit.x3,
    borderRadius: '0.55rem',
    width: '100%',
    textAlign: 'center',
    boxSizing: 'border-box'
  },
  alertLogin: {
    backgroundColor: colors.backgroundPrimaryFaded,
    color: colors.foregroundPrimary
  },
  alertLogout: {
    backgroundColor: colors.backgroundWarningFaded,
    color: colors.foregroundWarning
  }
})
