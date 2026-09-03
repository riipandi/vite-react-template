import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { radius, unit } from '#/styles/core/tokens.stylex'

export const sidebarStyles = stylex.create({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: colors.borderNeutralFaded,
    backgroundColor: colors.backgroundPage,
    transitionProperty: 'background-color, border-color, width',
    transitionDuration: '200ms',
    flexShrink: 0
  },
  containerExpanded: {
    width: '15rem',
    alignItems: 'stretch',
    '@media (max-width: 767px)': {
      width: '18rem'
    }
  },
  containerCollapsed: {
    width: '3.75rem',
    alignItems: 'center',
    paddingTop: unit.x3,
    paddingBottom: unit.x2,
    '@media (max-width: 767px)': {
      width: '18rem',
      alignItems: 'stretch',
      paddingTop: 0,
      paddingBottom: 0
    }
  },

  // Logo
  headerZone: {
    width: '100%',
    position: 'relative'
  },
  headerZoneCollapsed: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: unit.x3
  },
  logoSection: {
    paddingLeft: unit.x4,
    paddingRight: unit.x4,
    paddingTop: unit.x2,
    paddingBottom: unit.x2,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.backgroundNeutralFaded,
    width: '100%'
  },
  logoSectionCollapsed: {
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'center'
  },
  logoLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: unit.x2,
    textDecoration: 'none',
    borderRadius: radius.medium,
    paddingTop: unit.x1,
    paddingBottom: unit.x1,
    outline: 'none',
    transitionProperty: 'opacity',
    transitionDuration: '150ms',
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: colors.foregroundPrimary,
      outlineOffset: 2
    }
  },
  logoLinkCollapsed: {
    width: '2rem',
    height: '2rem',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0
  },
  logoIconWrap: {
    width: '1.85rem',
    height: '1.85rem',
    borderRadius: radius.large,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.backgroundPrimary,
    flexShrink: 0
  },
  logoSvg: {
    height: '1.65rem',
    width: '1.65rem',
    fill: colors.onBrand,
    color: colors.onBrand
  },
  logoText: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.bold,
    color: colors.foregroundNeutral,
    letterSpacing: '-0.01em'
  },
  logoVersion: {
    fontSize: fontSize.caption1,
    color: colors.foregroundNeutralFaded
  },

  // Nav content
  navContent: {
    flex: 1,
    paddingTop: unit.x2,
    paddingBottom: unit.x2,
    paddingLeft: unit.x3,
    paddingRight: unit.x3,
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1,
    overflowY: 'auto',
    width: '100%'
  },
  navContentCollapsed: {
    paddingTop: unit.x2,
    paddingBottom: unit.x2,
    alignItems: 'center',
    gap: unit.x1,
    flex: '0 0 auto'
  },
  sectionLabel: {
    paddingLeft: unit.x2,
    paddingTop: unit.x4,
    paddingBottom: unit.x1,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.semibold,
    color: colors.foregroundNeutralFaded,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    userSelect: 'none'
  },
  divider: {
    width: '1.75rem',
    height: '1px',
    backgroundColor: colors.backgroundNeutralFaded,
    marginTop: unit.x1_5,
    marginBottom: unit.x1,
    flexShrink: 0
  },

  // Nav item
  navItem: {
    display: 'flex',
    height: '2.25rem',
    width: '100%',
    alignItems: 'center',
    gap: unit.x2,
    borderRadius: radius.large,
    paddingLeft: unit.x3,
    paddingRight: unit.x3,
    textDecoration: 'none',
    color: {
      default: colors.foregroundNeutralFaded,
      ':hover': colors.foregroundNeutral
    },
    position: 'relative',
    transitionProperty: 'background-color, color',
    transitionDuration: '150ms',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.backgroundNeutralFaded
    },
    outline: 'none',
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: colors.foregroundPrimary,
      outlineOffset: 2
    }
  },
  navItemCollapsed: {
    height: '2.25rem',
    width: '2.25rem',
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 0
  },
  navItemActive: {
    backgroundColor: {
      default: colors.backgroundPrimaryFaded,
      ':hover': colors.backgroundPrimaryFaded
    },
    boxShadow: {
      default: `inset 3px 0 0 ${colors.backgroundPrimary}`
    },
    color: {
      default: colors.foregroundPrimary,
      ':hover': colors.foregroundPrimary
    }
  },
  navIcon: {
    height: '1rem',
    width: '1rem',
    stroke: 'currentColor',
    flexShrink: 0
  },
  navLabel: {
    flex: 1,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    whiteSpace: 'nowrap'
  },
  badge: {
    width: '0.375rem',
    height: '0.375rem',
    borderRadius: '9999px',
    backgroundColor: colors.backgroundCritical,
    flexShrink: 0
  },
  badgeCollapsed: {
    position: 'absolute',
    top: '0.375rem',
    right: '0.375rem',
    height: '0.35rem',
    width: '0.35rem',
    borderRadius: '9999px',
    backgroundColor: colors.backgroundCritical
  },

  // Bottom: sign out + theme switcher
  bottomSection: {
    paddingLeft: unit.x3,
    paddingRight: unit.x2,
    paddingTop: unit.x2,
    paddingBottom: unit.x2,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colors.borderNeutralFaded,
    width: '100%'
  },
  switcherBox: {
    height: '2.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: unit.x1,
    paddingRight: unit.x1,
    borderRadius: radius.large
  },

  // Collapse/expand trigger (desktop only)
  collapseTrigger: {
    position: 'absolute',
    top: '50%',
    right: '0.75rem',
    transform: 'translateY(-50%)',
    zIndex: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: radius.medium,
    borderWidth: 0,
    color: colors.foregroundNeutralFaded,
    cursor: 'pointer',
    opacity: 0,
    pointerEvents: 'none',
    transitionProperty: 'background-color, color, opacity',
    transitionDuration: '150ms',
    ':hover': {
      color: colors.foregroundNeutral,
      backgroundColor: colors.backgroundNeutralFaded
    },
    ':focus-visible': {
      opacity: 1,
      pointerEvents: 'auto'
    },
    '@media (max-width: 767px)': {
      display: 'none'
    }
  },
  collapseTriggerVisible: {
    opacity: 1,
    pointerEvents: 'auto'
  },
  collapseTriggerCollapsed: {
    top: 0,
    transform: 'none',
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: radius.large
  },
  logoFade: {
    opacity: 0
  },
  bottomSectionCollapsed: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: unit.x2,
    paddingTop: unit.x3,
    paddingBottom: unit.x0_5
  },
  bottomRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: unit.x2
  },
  bottomRowCollapsed: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: unit.x1
  },
  switcherBoxCollapsed: {
    height: '2.5rem'
  },
  signOutButton: {
    gap: unit.x2,
    borderWidth: 0,
    cursor: 'pointer',
    fontFamily: 'inherit',
    flexShrink: 0,
    color: {
      default: colors.foregroundNeutralFaded,
      ':hover': colors.foregroundCritical
    },
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.backgroundCriticalFaded
    },
    boxShadow: {
      ':hover': `inset 0 0 0 1px ${colors.borderCriticalFaded}`
    }
  },
  signOutButtonExpanded: {
    flex: 1
  }
})
