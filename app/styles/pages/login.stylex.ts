import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { duration, easing, radius, stroke, unit } from '#/styles/core/tokens.stylex'

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
    color: {
      default: colors.foregroundPrimary,
      ':hover': `color-mix(in srgb, ${colors.foregroundPrimary} 76%, ${colors.foregroundNeutral})`
    },
    fontSize: fontSize.body2,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: stroke.ring2,
    transitionDuration: duration.fast,
    transitionProperty: 'color',
    transitionTimingFunction: easing.standard
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
    color: {
      default: colors.foregroundPrimary,
      ':hover': `color-mix(in srgb, ${colors.foregroundPrimary} 76%, ${colors.foregroundNeutral})`
    },
    fontWeight: fontWeight.medium,
    outline: {
      default: 'none',
      ':focus-visible': `${stroke.ring2} solid ${colors.foregroundPrimary}`
    },
    outlineOffset: stroke.ring2,
    transitionDuration: duration.fast,
    transitionProperty: 'color',
    transitionTimingFunction: easing.standard
  }
})

export const socialStyles = stylex.create({
  socialButton: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    width: '100%'
  }
})
