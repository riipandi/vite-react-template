import * as stylex from '@stylexjs/stylex'
import { colors, shadow } from '#/styles/core/colors.stylex'
import { fontFamily, fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { unit, radius, duration, easing } from '#/styles/core/tokens.stylex'

// Mirror of `breakpoints` from `#/styles/core/tokens.stylex` (medium/large/
// xlarge). @stylexjs/babel-plugin 0.19 only inlines `defineConsts` media keys
// declared in the SAME file, so these cannot be imported cross-file yet —
// keep the values in sync.
export const breakpoints = stylex.defineConsts({
  medium: '@media (min-width: 660px) and (max-width: 899px)',
  large: '@media (min-width: 900px) and (max-width: 1279px)',
  xlarge: '@media (min-width: 1280px)'
})

const entrance = stylex.keyframes({
  from: { opacity: 0, transform: 'translateY(12px)' },
  to: { opacity: 1, transform: 'translateY(0)' }
})

export const homeStyles = stylex.create({
  header: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    padding: unit.x4
  },
  content: {
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '64rem',
    paddingBottom: '2.5rem',
    paddingLeft: unit.x4,
    paddingRight: unit.x4,
    width: '100%'
  },
  contentPadMedium: { [breakpoints.medium]: { paddingLeft: unit.x6, paddingRight: unit.x6 } },
  contentPadLarge: { [breakpoints.large]: { paddingLeft: unit.x6, paddingRight: unit.x6 } },
  contentPadXLarge: { [breakpoints.xlarge]: { paddingLeft: unit.x8, paddingRight: unit.x8 } },

  // Hero — elevation card with two blurred brand blobs behind the copy.
  hero: {
    backgroundColor: colors.backgroundElevationBase,
    borderColor: colors.borderNeutral,
    borderRadius: radius.xlarge,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: unit.x8,
    overflow: 'hidden',
    paddingLeft: unit.x6,
    paddingRight: unit.x6,
    paddingBottom: unit.x10,
    paddingTop: unit.x10,
    position: 'relative',
    animationDuration: '500ms',
    animationFillMode: 'both',
    animationName: entrance,
    animationTimingFunction: 'ease'
  },
  heroPadMedium: {
    [breakpoints.medium]: {
      paddingBottom: unit.x14,
      paddingTop: unit.x14,
      paddingLeft: unit.x10,
      paddingRight: unit.x10
    }
  },
  heroPadLarge: {
    [breakpoints.large]: {
      paddingBottom: unit.x14,
      paddingTop: unit.x14,
      paddingLeft: unit.x10,
      paddingRight: unit.x10
    }
  },
  heroPadXLarge: {
    [breakpoints.xlarge]: {
      paddingBottom: unit.x14,
      paddingTop: unit.x14,
      paddingLeft: unit.x10,
      paddingRight: unit.x10
    }
  },
  heroBlobA: {
    backgroundColor: colors.backgroundPrimary,
    borderRadius: radius.full,
    filter: 'blur(64px)',
    height: 224,
    left: -80,
    opacity: 0.2,
    pointerEvents: 'none',
    position: 'absolute',
    top: -96,
    width: 224
  },
  heroBlobB: {
    backgroundColor: colors.backgroundPrimaryFaded,
    borderRadius: radius.full,
    bottom: -80,
    filter: 'blur(64px)',
    height: 224,
    opacity: 0.15,
    pointerEvents: 'none',
    position: 'absolute',
    right: -80,
    width: 224
  },
  kicker: {
    letterSpacing: '0.1em',
    marginBottom: unit.x3,
    textTransform: 'uppercase'
  },
  heroTitle: {
    letterSpacing: '-0.025em',
    marginBottom: unit.x5,
    maxWidth: '48rem'
  },
  heroDescription: {
    marginBottom: unit.x8,
    maxWidth: '42rem'
  },
  heroActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: unit.x3
  },
  pill: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: radius.full,
    borderStyle: 'solid',
    borderWidth: 1,
    color: colors.foregroundNeutral,
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.semibold,
    justifyContent: 'center',
    paddingBlock: 10,
    paddingInline: unit.x5,
    textDecoration: 'none',
    transitionDuration: duration.fast,
    transitionProperty: 'background-color, border-color, transform',
    transitionTimingFunction: easing.standard,
    ':hover': {
      transform: 'translateY(-2px)'
    }
  },
  pillPrimary: {
    backgroundColor: colors.backgroundPrimaryFaded,
    borderColor: colors.borderPrimary,
    color: colors.foregroundPrimary,
    ':hover': {
      backgroundColor: `color-mix(in srgb, ${colors.backgroundPrimaryFaded} 60%, transparent)`,
      transform: 'translateY(-2px)'
    }
  },
  pillNeutral: {
    backgroundColor: `color-mix(in srgb, ${colors.backgroundElevationBase} 50%, transparent)`,
    borderColor: colors.borderNeutral,
    color: colors.foregroundNeutral,
    ':hover': {
      borderColor: colors.foregroundNeutralFaded,
      transform: 'translateY(-2px)'
    }
  },

  // Feature cards.
  features: {
    display: 'grid',
    gap: unit.x4,
    gridTemplateColumns: '1fr',
    marginBottom: unit.x8
  },
  featuresColsMedium: {
    [breakpoints.medium]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }
  },
  featuresColsLarge: { [breakpoints.large]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' } },
  featuresColsXLarge: {
    [breakpoints.xlarge]: { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }
  },
  featureCard: {
    animationDelay: '80ms',
    animationDuration: '500ms',
    animationFillMode: 'both',
    animationName: entrance,
    animationTimingFunction: 'ease',
    backgroundColor: colors.backgroundElevationBase,
    borderColor: colors.borderNeutral,
    borderRadius: radius.xlarge,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: unit.x5,
    transitionDuration: duration.fast,
    transitionProperty: 'box-shadow, transform',
    transitionTimingFunction: easing.standard,
    ':hover': {
      boxShadow: shadow.raised,
      transform: 'translateY(-2px)'
    }
  },
  featureTitle: {
    marginBottom: unit.x2
  },

  // Quick start card.
  quickStart: {
    backgroundColor: colors.backgroundElevationBase,
    borderColor: colors.borderNeutral,
    borderRadius: radius.xlarge,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: unit.x6
  },
  quickStartList: {
    color: colors.foregroundNeutralFaded,
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2,
    listStyleType: 'disc',
    margin: 0,
    paddingLeft: unit.x5
  },
  code: {
    backgroundColor: colors.backgroundNeutralFaded,
    borderRadius: radius.small,
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.monospace,
    padding: '2px 6px'
  },

  footer: {
    paddingTop: unit.x5,
    paddingBottom: unit.x5,
    textAlign: 'center'
  },
  footerInner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '80rem',
    paddingLeft: unit.x4,
    paddingRight: unit.x4
  },
  footerText: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.body2,
    letterSpacing: '0.025em'
  },
  footerSubText: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.body2,
    letterSpacing: '0.025em',
    marginTop: unit.x2
  }
})
