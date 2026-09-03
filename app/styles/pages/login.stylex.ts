import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { radius, unit } from '#/styles/core/tokens.stylex'

export const socialStyles = stylex.create({
  socialButton: {
    display: 'inline-flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: unit.x3,
    borderRadius: radius.large,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.borderNeutral,
    backgroundColor: colors.backgroundPage,
    paddingLeft: unit.x4,
    paddingRight: unit.x4,
    paddingTop: '0.625rem',
    paddingBottom: '0.625rem',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    color: colors.foregroundNeutral,
    transitionProperty: 'background-color, border-color, box-shadow, color',
    transitionDuration: '150ms',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: colors.backgroundNeutralFaded,
      borderColor: colors.borderNeutralFaded
    },
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: colors.foregroundPrimary,
      outlineOffset: 2
    }
  }
})

export const styles = stylex.create({
  card: {
    borderRadius: '16px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.borderNeutral,
    backgroundColor: colors.backgroundElevationBase,
    overflow: 'hidden',
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: '200ms'
  },
  cardBody: {
    padding: unit.x8
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: unit.x2,
    marginBottom: unit.x6
  },
  logoWrapper: {
    padding: unit.x3,
    borderRadius: '1rem',
    backgroundColor: colors.backgroundPage,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.borderNeutral,
    marginBottom: unit.x1
  },
  logo: {
    height: '2.5rem',
    width: '2.5rem'
  },
  heading: {
    fontSize: fontSize.featured4,
    fontWeight: fontWeight.bold,
    color: colors.foregroundNeutral,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: fontSize.body2,
    color: colors.foregroundNeutralFaded,
    textAlign: 'center'
  },
  socialButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x3
  },
  separator: {
    display: 'flex',
    alignItems: 'center',
    gap: unit.x4,
    marginTop: unit.x6,
    marginBottom: unit.x6
  },
  separatorLine: {
    flex: 1,
    height: '1px',
    backgroundColor: colors.borderNeutralFaded
  },
  separatorText: {
    fontSize: fontSize.body2,
    color: colors.foregroundNeutralFaded,
    whiteSpace: 'nowrap'
  },
  formGrid: {
    display: 'grid',
    rowGap: unit.x4
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1_5
  },
  label: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    color: colors.foregroundNeutral
  },
  input: {
    display: 'flex',
    width: '100%',
    height: '2.5rem',
    borderRadius: radius.large,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: { default: colors.borderNeutral, ':focus': colors.borderPrimary },
    backgroundColor: colors.backgroundPage,
    paddingLeft: unit.x3,
    paddingRight: unit.x3,
    paddingTop: unit.x2,
    paddingBottom: unit.x2,
    fontSize: fontSize.body2,
    color: colors.foregroundNeutral,
    outline: 'none',
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: '150ms',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    '::placeholder': { color: colors.foregroundNeutralFaded },
    ':focus': { boxShadow: `0 0 0 2px ${colors.borderPrimaryFaded}` },
    ':disabled': { opacity: 0.5, cursor: 'not-allowed' }
  },
  inputError: {
    borderColor: colors.borderCritical
  },
  fieldError: {
    fontSize: fontSize.caption1,
    color: colors.foregroundCritical,
    marginTop: unit.x0_5
  },
  submitWrapper: {
    marginTop: unit.x7,
    display: 'grid',
    width: '100%'
  },
  footer: {
    marginTop: unit.x6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: unit.x1
  },
  footerText: {
    fontSize: fontSize.body2,
    color: colors.foregroundNeutralFaded
  },
  backLink: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    color: colors.foregroundPrimary,
    textDecoration: 'none',
    ':hover': { textDecoration: 'underline' }
  },
  loggedOutMessage: {
    fontWeight: fontWeight.semibold
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    gap: unit.x2,
    borderRadius: radius.large,
    paddingLeft: unit.x4,
    paddingRight: unit.x4,
    paddingTop: unit.x3,
    paddingBottom: unit.x3,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: unit.x4
  },
  alertError: {
    backgroundColor: colors.backgroundCriticalFaded,
    color: colors.foregroundCritical
  },
  alertSuccess: {
    backgroundColor: colors.backgroundPositiveFaded,
    color: colors.foregroundPositive
  }
})
