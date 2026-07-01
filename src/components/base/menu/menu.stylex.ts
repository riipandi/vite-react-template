import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  radiusVar,
  spaceVar,
  fontSizeVar,
  fontWeightVar,
  shadowVar
} from '#/styles/tokens.stylex'

export const menuStyles = stylex.create({
  popup: {
    backgroundColor: colorVar.bgElevationOverlay,
    borderRadius: radiusVar.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    boxShadow: shadowVar.overlay,
    padding: spaceVar[1.5],
    minWidth: spaceVar[32],
    outlineStyle: 'none',
    // ans: transformOrigin not supported in StyleX 0.19
    transitionProperty: 'transform, scale, opacity',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    '[data-starting-style]': {
      transform: 'scale(0.9)',
      opacity: 0
    },
    '[data-ending-style]': {
      transform: 'scale(0.9)',
      opacity: 0
    }
  },
  item: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    gap: spaceVar[2],
    paddingInline: spaceVar[3],
    paddingTop: spaceVar[2],
    paddingBottom: spaceVar[2],
    borderRadius: radiusVar.xs,
    fontSize: fontSizeVar.sm,
    color: colorVar.fgNeutral,
    userSelect: 'none',
    ':hover:not([data-disabled])': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    '[data-highlighted]:not([data-disabled])': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    '[data-selected]:not([data-disabled])': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    '[data-popup-open]': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    ':focus-visible': {
      outlineStyle: 'none'
    },
    '[data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  separator: {
    height: 1,
    backgroundColor: colorVar.borderNeutralFaded,
    marginTop: spaceVar[1.5],
    marginBottom: spaceVar[1.5]
  },
  submenuTrigger: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    gap: spaceVar[2],
    paddingInline: spaceVar[3],
    paddingTop: spaceVar[2],
    paddingBottom: spaceVar[2],
    borderRadius: radiusVar.xs,
    fontSize: fontSizeVar.sm,
    color: colorVar.fgNeutral,
    userSelect: 'none',
    ':hover:not([data-disabled])': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    '[data-highlighted]:not([data-disabled])': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    '[data-selected]:not([data-disabled])': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    '[data-popup-open]': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    ':focus-visible': {
      outlineStyle: 'none'
    },
    '[data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  groupLabel: {
    color: colorVar.fgNeutralFaded,
    paddingInline: spaceVar[2.5],
    paddingTop: spaceVar[1],
    paddingBottom: spaceVar[1],
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium
  },
  radioItem: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    gap: spaceVar[2],
    paddingInline: spaceVar[3],
    paddingTop: spaceVar[2],
    paddingBottom: spaceVar[2],
    borderRadius: radiusVar.xs,
    fontSize: fontSizeVar.sm,
    color: colorVar.fgNeutral,
    userSelect: 'none',
    ':hover:not([data-disabled])': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    '[data-highlighted]:not([data-disabled])': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    '[data-selected]:not([data-disabled])': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    '[data-popup-open]': {
      backgroundColor: colorVar.bgNeutralFaded
    },
    ':focus-visible': {
      outlineStyle: 'none'
    },
    '[data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  radioItemIndicator: {
    display: 'flex',
    width: spaceVar[3],
    height: spaceVar[3],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px'
  }
})

export const menuSizes = stylex.create({
  compact: {
    borderRadius: radiusVar.sm,
    padding: spaceVar[1]
  }
})
