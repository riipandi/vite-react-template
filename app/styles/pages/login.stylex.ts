import * as stylex from '@stylexjs/stylex'
import { radiusVar, spaceVar, colorVar } from '#/styles/core/tokens.stylex'
import { fontSizeVar, fontWeightVar } from '#/styles/core/tokens.stylex'

export const socialStyles = stylex.create({
  socialButton: {
    display: 'inline-flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spaceVar[3],
    borderRadius: radiusVar.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    backgroundColor: colorVar.bgPage,
    paddingLeft: spaceVar[4],
    paddingRight: spaceVar[4],
    paddingTop: '0.625rem',
    paddingBottom: '0.625rem',
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium,
    color: colorVar.fgNeutral,
    transitionProperty: 'background-color, border-color, box-shadow, color',
    transitionDuration: '150ms',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: colorVar.bgNeutralFaded,
      borderColor: colorVar.borderNeutralFaded
    },
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: colorVar.fgPrimary,
      outlineOffset: 2
    }
  }
})

export const styles = stylex.create({
  card: {
    borderRadius: radiusVar.xl,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    backgroundColor: colorVar.bgElevationBase,
    overflow: 'hidden',
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: '200ms'
  },
  cardBody: {
    padding: spaceVar[8]
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spaceVar[2],
    marginBottom: spaceVar[6]
  },
  logoWrapper: {
    padding: spaceVar[3],
    borderRadius: '1rem',
    backgroundColor: colorVar.bgPage,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    marginBottom: spaceVar[1]
  },
  logo: {
    height: '2.5rem',
    width: '2.5rem'
  },
  heading: {
    fontSize: fontSizeVar['2xl'],
    fontWeight: fontWeightVar.bold,
    color: colorVar.fgNeutral,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: fontSizeVar.sm,
    color: colorVar.fgNeutralFaded,
    textAlign: 'center'
  },
  socialButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar[3]
  },
  separator: {
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[4],
    marginTop: spaceVar[6],
    marginBottom: spaceVar[6]
  },
  separatorLine: {
    flex: 1,
    height: '1px',
    backgroundColor: colorVar.borderNeutralFaded
  },
  separatorText: {
    fontSize: fontSizeVar.sm,
    color: colorVar.fgNeutralFaded,
    whiteSpace: 'nowrap'
  },
  formGrid: {
    display: 'grid',
    rowGap: spaceVar[4]
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar['1.5']
  },
  label: {
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium,
    color: colorVar.fgNeutral
  },
  input: {
    display: 'flex',
    width: '100%',
    height: '2.5rem',
    borderRadius: radiusVar.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: { default: colorVar.borderNeutral, ':focus': colorVar.borderPrimary },
    backgroundColor: colorVar.bgPage,
    paddingLeft: spaceVar[3],
    paddingRight: spaceVar[3],
    paddingTop: spaceVar[2],
    paddingBottom: spaceVar[2],
    fontSize: fontSizeVar.sm,
    color: colorVar.fgNeutral,
    outline: 'none',
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: '150ms',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    '::placeholder': { color: colorVar.fgNeutralFaded },
    ':focus': { boxShadow: `0 0 0 2px ${colorVar.borderPrimaryFaded}` },
    ':disabled': { opacity: 0.5, cursor: 'not-allowed' }
  },
  inputError: {
    borderColor: colorVar.borderCritical
  },
  fieldError: {
    fontSize: fontSizeVar.xs,
    color: colorVar.fgCritical,
    marginTop: spaceVar['0.5']
  },
  submitWrapper: {
    marginTop: spaceVar[7],
    display: 'grid',
    width: '100%'
  },
  footer: {
    marginTop: spaceVar[6],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spaceVar[1]
  },
  footerText: {
    fontSize: fontSizeVar.sm,
    color: colorVar.fgNeutralFaded
  },
  backLink: {
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium,
    color: colorVar.fgPrimary,
    textDecoration: 'none',
    ':hover': { textDecoration: 'underline' }
  },
  loggedOutMessage: {
    fontWeight: fontWeightVar.semibold
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[2],
    borderRadius: radiusVar.lg,
    paddingLeft: spaceVar[4],
    paddingRight: spaceVar[4],
    paddingTop: spaceVar[3],
    paddingBottom: spaceVar[3],
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium,
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: spaceVar[4]
  },
  alertError: {
    backgroundColor: colorVar.bgCriticalFaded,
    color: colorVar.fgCritical
  },
  alertSuccess: {
    backgroundColor: colorVar.bgPositiveFaded,
    color: colorVar.fgPositive
  }
})
