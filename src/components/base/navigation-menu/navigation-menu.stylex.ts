import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  radiusVar,
  spaceVar,
  fontSizeVar,
  fontWeightVar,
  shadowVar
} from '#/styles/tokens.stylex'

export const navigationMenuStyles = stylex.create({
  root: {
    minWidth: 'max-content'
  },
  list: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[2],
    padding: spaceVar[1.5],
    borderRadius: radiusVar.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral
  },
  trigger: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spaceVar[2],
    height: spaceVar[9],
    paddingInline: spaceVar[3],
    borderRadius: radiusVar.xs,
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium,
    lineHeight: 1,
    textDecoration: 'none',
    color: colorVar.fgNeutral,
    userSelect: 'none',
    flexShrink: 0,
    transitionProperty: 'color, background-color',
    transitionDuration: '150ms',
    ':hover': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    ':active': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    '[data-popup-open]': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: colorVar.borderPrimary,
      outlineOffset: 2
    },
    '[data-disabled]': {
      // ans: pointerEvents not supported in StyleX 0.19
      opacity: 0.5
    }
  },
  icon: {
    transitionProperty: 'transform',
    transitionDuration: '200ms',
    '[data-popup-open]': {
      transform: 'rotate(180deg)'
    }
  },
  content: {
    width: '100%',
    padding: spaceVar[2],
    transitionProperty: 'opacity, transform, translate',
    transitionDuration: '150ms',
    '[data-starting-style]': {
      opacity: 0
    },
    '[data-ending-style]': {
      opacity: 0
    },
    '[data-starting-style][data-activation-direction=left]': {
      transform: 'translateX(-50%)'
    },
    '[data-ending-style][data-activation-direction=left]': {
      transform: 'translateX(50%)'
    },
    '[data-starting-style][data-activation-direction=right]': {
      transform: 'translateX(50%)'
    },
    '[data-ending-style][data-activation-direction=right]': {
      transform: 'translateX(-50%)'
    }
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar[2],
    paddingInline: spaceVar[3],
    paddingTop: spaceVar[1.5],
    paddingBottom: spaceVar[1.5],
    borderRadius: radiusVar.xs,
    cursor: 'pointer',
    fontSize: fontSizeVar.sm,
    textDecoration: 'none',
    color: colorVar.fgNeutral,
    userSelect: 'none',
    transitionProperty: 'color, background-color',
    transitionDuration: '150ms',
    ':hover': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    '[data-hover]': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    ':focus-visible': {
      outlineStyle: 'none'
    }
  },
  positioner: {
    height: 'var(--positioner-height)',
    width: 'var(--positioner-width)',
    maxWidth: 'var(--available-width)',
    // ans: transformOrigin not supported in StyleX 0.19
    transitionDuration: '200ms'
  },
  popup: {
    backgroundColor: colorVar.bgElevationOverlay,
    borderRadius: radiusVar.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    boxShadow: shadowVar.overlay,
    color: colorVar.fgNeutral,
    // ans: transformOrigin not supported in StyleX 0.19
    overflow: 'hidden',
    outlineStyle: 'none',
    transitionProperty: 'opacity, transform, width, height, scale, translate',
    transitionDuration: '150ms',
    '[data-starting-style]': {
      transform: 'scale(0.9)',
      opacity: 0
    },
    '[data-ending-style]': {
      transform: 'scale(0.9)',
      opacity: 0
    }
  },
  arrow: {
    position: 'relative',
    display: 'flex',
    transitionProperty: 'left',
    transitionDuration: '150ms',
    '[data-side=bottom]': {
      top: -spaceVar[2]
    },
    '[data-side=top]': {
      bottom: -spaceVar[2],
      transform: 'rotate(180deg)'
    },
    '[data-side=left]': {
      right: '-0.8125rem',
      transform: 'rotate(90deg)'
    },
    '[data-side=right]': {
      left: '-0.8125rem',
      transform: 'rotate(-90deg)'
    }
  },
  viewport: {
    position: 'relative',
    height: '100%',
    width: '100%',
    overflow: 'hidden'
  }
})

export const navigationMenuSizes = stylex.create({
  default: {},
  compact: {}
})
