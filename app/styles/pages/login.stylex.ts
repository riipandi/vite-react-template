import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'

export const styles = stylex.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x4,
    width: '100%'
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x5,
    textAlign: 'center'
  },
  cardRoot: {
    position: 'relative'
  },
  logo: {
    alignItems: 'center',
    backgroundColor: colors.backgroundPage,
    borderColor: colors.borderNeutral,
    borderRadius: radius.xlarge,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    height: '3.5rem',
    justifyContent: 'center',
    marginBottom: unit.x2,
    width: '3.5rem'
  },
  socialGroup: {
    marginBottom: unit.x4,
    width: '100%'
  },
  divider: {
    fontSize: fontSize.body2,
    marginBlock: unit.x5
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x5
  },
  labelRow: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  forgotLink: {
    color: colors.foregroundPrimary,
    fontSize: fontSize.body2,
    textDecoration: 'none',
    ':hover': { textDecoration: 'underline' }
  },
  rememberField: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: unit.x2,
    marginTop: unit.x5
  },
  submitWrapper: {
    display: 'grid',
    marginTop: unit.x6
  },
  submit: {
    width: '100%'
  },
  alerts: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x3
  },
  backLink: {
    color: colors.foregroundPrimary,
    fontWeight: fontWeight.medium,
    textDecoration: 'none',
    ':hover': { textDecoration: 'underline' }
  }
})

export const socialStyles = stylex.create({
  socialButton: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    width: '100%'
  }
})
