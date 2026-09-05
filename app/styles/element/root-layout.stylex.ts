import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { radius, unit, duration } from '#/styles/core/tokens.stylex'

// Mirrors `breakpoints.small` from `#/styles/core/tokens.stylex` (659px cap).
// @stylexjs/babel-plugin only inlines `defineConsts` media keys declared in
// the SAME file (and bound to a named export), so these cannot be imported
// cross-file — keep values in sync.
export const breakpoints = stylex.defineConsts({
  small: '@media (max-width: 659px)'
})

export const styles = stylex.create({
  layout: {
    backgroundColor: colors.backgroundPage,
    transitionProperty: 'background-color',
    transitionDuration: duration.medium,
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  body: {
    display: 'flex',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden'
  },
  mobileHeader: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '3.5rem',
    paddingLeft: unit.x4,
    paddingRight: unit.x4,
    backgroundColor: colors.backgroundPage,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.borderNeutral,
    [breakpoints.small]: {
      display: 'flex'
    }
  },
  mobileHeaderTitle: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.bold,
    color: colors.foregroundNeutral
  },
  hamburger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: radius.medium,
    border: 'none',
    backgroundColor: 'transparent',
    color: colors.foregroundNeutralFaded,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: colors.backgroundNeutralFaded
    }
  },
  sidebarWrapper: {
    flexShrink: 0,
    [breakpoints.small]: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 40,
      transform: 'translateX(-100%)',
      transitionProperty: 'transform',
      transitionDuration: '200ms'
    }
  },
  sidebarOpen: {
    [breakpoints.small]: {
      transform: 'translateX(0)'
    }
  },
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  contentArea: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowY: 'auto',
    minWidth: 0
  }
})
