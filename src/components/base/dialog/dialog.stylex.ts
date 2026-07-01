import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  radiusVar,
  spaceVar,
  fontSizeVar,
  fontWeightVar,
  shadowVar
} from '#/styles/tokens.stylex'

export const dialogStyles = stylex.create({
  root: {},
  trigger: {},
  backdrop: {
    position: 'fixed',
    inset: 0,
    minHeight: '100dvh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    // ans: backdropFilter not supported in StyleX 0.19
    transitionProperty: 'opacity',
    transitionDuration: '200ms',
    opacity: 0,
    '[data-state=open]': {
      opacity: 1
    }
  },
  popup: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    backgroundColor: colorVar.bgElevationOverlay,
    color: colorVar.fgNeutral,
    // ans: backdropFilter not supported in StyleX 0.19
    boxShadow: shadowVar.overlay,
    borderRadius: radiusVar.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    width: '28rem',
    maxWidth: 'calc(100% - 2rem)',
    transitionProperty: 'all',
    transitionDuration: '200ms',
    outline: 'none',
    transitionTimingFunction: 'ease',
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.9)',
    '[data-state=open]': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[2],
    paddingInline: spaceVar[5],
    paddingTop: spaceVar[4]
  },
  title: {
    fontSize: fontSizeVar.lg,
    fontWeight: fontWeightVar.semibold
  },
  body: {
    paddingInline: spaceVar[5],
    paddingTop: spaceVar[4],
    paddingBottom: spaceVar[4]
    // ans: paddingBlock replaced with paddingTop + paddingBottom
  },
  description: {
    color: colorVar.fgNeutralFaded,
    fontSize: fontSizeVar.sm,
    lineHeight: 1.625
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spaceVar[2],
    backgroundColor: colorVar.bgElevationRaised,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: colorVar.borderNeutral,
    // ans: borderBottomLeftRadius not supported in StyleX 0.19
    // ans: borderBottomRightRadius not supported in StyleX 0.19
    paddingInline: spaceVar[4],
    paddingTop: spaceVar[3],
    paddingBottom: spaceVar[3]
    // ans: paddingBlock replaced with paddingTop + paddingBottom
  }
})
