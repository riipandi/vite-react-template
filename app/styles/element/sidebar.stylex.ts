import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar } from '#/styles/core/tokens.stylex'
import { fontSizeVar, fontWeightVar } from '#/styles/core/tokens.stylex'

export const sidebarStyles = stylex.create({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: colorVar.borderNeutralFaded,
    backgroundColor: colorVar.bgPage,
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
    paddingTop: spaceVar[3],
    paddingBottom: spaceVar[2],
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
    paddingBottom: spaceVar[3]
  },
  logoSection: {
    paddingLeft: spaceVar[4],
    paddingRight: spaceVar[4],
    paddingTop: spaceVar[2],
    paddingBottom: spaceVar[2],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colorVar.bgNeutralFaded,
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
    gap: spaceVar[2],
    textDecoration: 'none',
    borderRadius: radiusVar.md,
    paddingTop: spaceVar[1],
    paddingBottom: spaceVar[1],
    outline: 'none',
    transitionProperty: 'opacity',
    transitionDuration: '150ms',
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: colorVar.fgPrimary,
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
    borderRadius: radiusVar.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colorVar.bgBrand,
    flexShrink: 0
  },
  logoSvg: {
    height: '1.65rem',
    width: '1.65rem',
    fill: colorVar.onBrand,
    color: colorVar.onBrand
  },
  logoText: {
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.bold,
    color: colorVar.fgNeutral,
    letterSpacing: '-0.01em'
  },
  logoVersion: {
    fontSize: fontSizeVar.xs,
    color: colorVar.fgNeutralFaded
  },

  // Nav content
  navContent: {
    flex: 1,
    paddingTop: spaceVar[2],
    paddingBottom: spaceVar[2],
    paddingLeft: spaceVar[3],
    paddingRight: spaceVar[3],
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar[1],
    overflowY: 'auto',
    width: '100%'
  },
  navContentCollapsed: {
    paddingTop: spaceVar[2],
    paddingBottom: spaceVar[2],
    alignItems: 'center',
    gap: spaceVar[1],
    flex: '0 0 auto'
  },
  sectionLabel: {
    paddingLeft: spaceVar[2],
    paddingTop: spaceVar[4],
    paddingBottom: spaceVar[1],
    fontSize: fontSizeVar.xs,
    fontWeight: fontWeightVar.semibold,
    color: colorVar.fgNeutralFaded,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    userSelect: 'none'
  },
  divider: {
    width: '1.75rem',
    height: '1px',
    backgroundColor: colorVar.bgNeutralFaded,
    marginTop: spaceVar['0.5'],
    marginBottom: spaceVar[1],
    flexShrink: 0
  },

  // Nav item
  navItem: {
    display: 'flex',
    height: '2.25rem',
    width: '100%',
    alignItems: 'center',
    gap: spaceVar[2],
    borderRadius: radiusVar.lg,
    paddingLeft: spaceVar[3],
    paddingRight: spaceVar[3],
    textDecoration: 'none',
    color: {
      default: colorVar.fgNeutralFaded,
      ':hover': colorVar.fgNeutral
    },
    position: 'relative',
    transitionProperty: 'background-color, color',
    transitionDuration: '150ms',
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium,
    backgroundColor: {
      default: 'transparent',
      ':hover': colorVar.bgNeutralFaded
    },
    outline: 'none',
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: colorVar.fgPrimary,
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
      default: colorVar.bgPrimaryFaded,
      ':hover': colorVar.bgPrimaryFaded
    },
    boxShadow: {
      default: `inset 3px 0 0 ${colorVar.bgPrimary}`
    },
    color: {
      default: colorVar.fgPrimary,
      ':hover': colorVar.fgPrimary
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
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium,
    whiteSpace: 'nowrap'
  },
  badge: {
    width: '0.375rem',
    height: '0.375rem',
    borderRadius: '9999px',
    backgroundColor: colorVar.bgCritical,
    flexShrink: 0
  },
  badgeCollapsed: {
    position: 'absolute',
    top: '0.375rem',
    right: '0.375rem',
    height: '0.35rem',
    width: '0.35rem',
    borderRadius: '9999px',
    backgroundColor: colorVar.bgCritical
  },

  // Bottom: sign out + theme switcher
  bottomSection: {
    paddingLeft: spaceVar[3],
    paddingRight: spaceVar[2],
    paddingTop: spaceVar[2],
    paddingBottom: spaceVar[2],
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colorVar.borderNeutralFaded,
    width: '100%'
  },
  switcherBox: {
    height: '2.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: spaceVar[1],
    paddingRight: spaceVar[1],
    borderRadius: radiusVar.lg
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
    borderRadius: radiusVar.md,
    borderWidth: 0,
    color: colorVar.fgNeutralFaded,
    cursor: 'pointer',
    opacity: 0,
    pointerEvents: 'none',
    transitionProperty: 'background-color, color, opacity',
    transitionDuration: '150ms',
    ':hover': {
      color: colorVar.fgNeutral,
      backgroundColor: colorVar.bgNeutralFaded
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
    borderRadius: radiusVar.lg
  },
  logoFade: {
    opacity: 0
  },
  bottomSectionCollapsed: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spaceVar[2],
    paddingTop: spaceVar[3],
    paddingBottom: spaceVar[0]
  },
  bottomRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spaceVar[2]
  },
  bottomRowCollapsed: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: spaceVar[1]
  },
  switcherBoxCollapsed: {
    height: '2.5rem'
  },
  signOutButton: {
    gap: spaceVar[2],
    borderWidth: 0,
    cursor: 'pointer',
    fontFamily: 'inherit',
    flexShrink: 0,
    color: {
      default: colorVar.fgNeutralFaded,
      ':hover': colorVar.fgCritical
    },
    backgroundColor: {
      default: 'transparent',
      ':hover': colorVar.bgCriticalFaded
    },
    boxShadow: {
      ':hover': `inset 0 0 0 1px ${colorVar.borderCriticalFaded}`
    }
  },
  signOutButtonExpanded: {
    flex: 1
  }
})
