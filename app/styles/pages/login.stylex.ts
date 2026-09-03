import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'

/**
 * Kept minimal on purpose: the layout is composed from shared components
 * (Card, Field, Input, Button, Checkbox, Alert, Item, …), so only bits they
 * do not provide live here.
 */
export const styles = stylex.create({
  // CardHeader is a 1fr/auto grid for left-aligned cards; the login header is
  // centered instead, so flatten it back to a flex column.
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2,
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
    marginTop: -14,
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
  rememberField: {
    marginTop: unit.x4,
    alignItems: 'center',
    flexDirection: 'row',
    gap: unit.x2
  },
  submitWrapper: {
    display: 'grid',
    marginTop: unit.x6
  },
  submit: {
    width: '100%'
  },
  demoItem: {
    marginTop: unit.x6
  },
  alerts: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x3,
    marginBottom: unit.x5
  },
  hintIcon: {
    color: colors.foregroundNeutralFaded,
    cursor: 'help'
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
