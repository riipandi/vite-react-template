import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, spaceVar, fontSizeVar, fontWeightVar } from '#/styles/tokens.stylex'

export const drawerStyles = stylex.create({
  root: {},
  trigger: {},
  portal: {
    zIndex: 50
  },
  close: {},
  backdrop: {
    position: 'fixed',
    inset: 0,
    minHeight: '100dvh',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    transitionProperty: 'opacity',
    transitionDuration: '450ms',
    transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
    opacity: 0,
    '[data-state=open]': {
      opacity: 0.5
    }
  },
  viewport: {
    position: 'fixed',
    inset: 0,
    display: 'flex'
  },
  // ans: swipe gesture physics (--drawer-swipe-movement-*) omitted.
  //       Restore from origin when swipe animation fidelity is specified.
  popup: {
    position: 'relative',
    backgroundColor: colorVar.bgElevationOverlay,
    color: colorVar.fgNeutral,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    // ans: touchAction not supported in StyleX 0.19
    overflowY: 'auto'
    // ans: overscrollBehavior not supported in StyleX 0.19
  },
  // ans: nested-drawer group selectors omitted — StyleX lacks parent selector.
  //       Use CSS vars from popup if nested drawer opacity choreography is needed.
  content: {
    transitionProperty: 'opacity',
    transitionDuration: '300ms',
    transitionTimingFunction: 'cubic-bezier(0.45, 1.005, 0, 1.005)'
  },
  title: {
    color: colorVar.fgNeutral,
    fontSize: fontSizeVar.md,
    fontWeight: fontWeightVar.medium
  },
  description: {
    color: colorVar.fgNeutralFaded,
    marginTop: spaceVar['1.5'],
    fontSize: fontSizeVar.sm
  },
  handle: {
    backgroundColor: colorVar.bgNeutralFaded,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: spaceVar[4],
    height: 4,
    width: '3rem',
    borderRadius: radiusVar.full,
    transitionProperty: 'opacity',
    transitionDuration: '200ms'
  }
})

export const drawerSwipeDirections = stylex.create({
  left: {
    display: 'block'
  },
  right: {
    display: 'block'
  },
  up: {
    display: 'block'
  },
  down: {
    display: 'block'
  }
})
