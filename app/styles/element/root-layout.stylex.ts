import * as stylex from '@stylexjs/stylex'
import { radiusVar, spaceVar, colorVar } from '#/styles/core/tokens.stylex'

export const styles = stylex.create({
  layout: {
    backgroundColor: colorVar.bgPage,
    transitionProperty: 'background-color',
    transitionDuration: '200ms',
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
    paddingLeft: spaceVar[4],
    paddingRight: spaceVar[4],
    backgroundColor: colorVar.bgPage,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colorVar.borderNeutral,
    '@media (max-width: 767px)': {
      display: 'flex'
    }
  },
  mobileHeaderTitle: {
    fontSize: '0.875rem',
    fontWeight: 700,
    color: colorVar.fgNeutral
  },
  hamburger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: radiusVar.md,
    border: 'none',
    backgroundColor: 'transparent',
    color: colorVar.fgNeutralFaded,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: colorVar.bgNeutralFaded
    }
  },
  sidebarWrapper: {
    flexShrink: 0,
    '@media (max-width: 767px)': {
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
    '@media (max-width: 767px)': {
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
