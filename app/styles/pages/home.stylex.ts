import * as stylex from '@stylexjs/stylex'
import { fontSizeVar, spaceVar, colorVar } from '#/styles/core/tokens.stylex'

export const homeStyles = stylex.create({
  header: {
    marginBottom: 'auto',
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    padding: spaceVar[4]
  },
  content: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar[8],
    paddingLeft: {
      default: spaceVar[4],
      '@media (min-width: 640px)': spaceVar[6],
      '@media (min-width: 1024px)': spaceVar[8]
    },
    paddingRight: {
      default: spaceVar[4],
      '@media (min-width: 640px)': spaceVar[6],
      '@media (min-width: 1024px)': spaceVar[8]
    },
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem'
  },
  tagline: {
    textAlign: 'center',
    fontSize: fontSizeVar.lg,
    color: colorVar.fgNeutralFaded,
    maxWidth: '36rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: {
      default: 0,
      '@media (min-width: 640px)': spaceVar[8]
    }
  },
  actions: {
    marginTop: spaceVar[4],
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 640px)': 'row'
    },
    alignItems: 'center',
    justifyContent: 'center',
    gap: {
      default: spaceVar[2],
      '@media (min-width: 640px)': spaceVar[3]
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
    paddingLeft: {
      default: spaceVar[4],
      '@media (min-width: 640px)': spaceVar[6],
      '@media (min-width: 1024px)': spaceVar[8]
    },
    paddingRight: {
      default: spaceVar[4],
      '@media (min-width: 640px)': spaceVar[6],
      '@media (min-width: 1024px)': spaceVar[8]
    }
  },
  footerText: {
    fontSize: fontSizeVar.sm,
    letterSpacing: '0.025em',
    color: colorVar.fgNeutralFaded
  },
  footerSubText: {
    marginTop: spaceVar[2],
    fontSize: fontSizeVar.sm,
    letterSpacing: '0.025em',
    color: colorVar.fgNeutralFaded
  },
  alert: {
    fontSize: fontSizeVar.sm,
    padding: spaceVar[3],
    borderRadius: '0.55rem',
    width: '100%',
    boxSizing: 'border-box'
  },
  alertLogin: {
    backgroundColor: colorVar.bgPrimaryFaded,
    color: colorVar.fgPrimary
  },
  alertLogout: {
    backgroundColor: colorVar.bgWarningFaded,
    color: colorVar.fgWarning
  }
})
