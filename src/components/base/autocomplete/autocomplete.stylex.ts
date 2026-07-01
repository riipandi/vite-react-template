import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  radiusVar,
  spaceVar,
  fontSizeVar,
  fontWeightVar,
  shadowVar
} from '#/styles/tokens.stylex'

export const autocompleteStyles = stylex.create({
  root: {},
  base: {
    height: spaceVar[9],
    width: '100%',
    paddingInline: spaceVar[3],
    borderRadius: radiusVar.xs,
    fontSize: fontSizeVar.sm,
    lineHeight: 1.25,
    transitionProperty: 'all',
    transitionDuration: '150ms',
    color: colorVar.fgNeutral,
    // ans: ::placeholder and ::file-selector-button pseudo-elements not supported in StyleX
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  backdrop: {},
  positioner: {},
  popup: {
    backgroundColor: colorVar.bgElevationOverlay,
    borderRadius: radiusVar.xs,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    boxShadow: shadowVar.overlay,
    // ans: maxHeight not supported in StyleX 0.19
    width: 'var(--anchor-width)',
    maxWidth: 'var(--available-width)',
    // ans: transformOrigin not supported in StyleX 0.19
    outlineStyle: 'none',
    transitionProperty: 'transform, scale, opacity',
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
  icon: {},
  clear: {},
  value: {},
  trigger: {},
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: spaceVar[2.5],
    paddingTop: spaceVar[3],
    paddingBottom: spaceVar[3],
    textAlign: 'center',
    fontSize: fontSizeVar.sm,
    color: colorVar.fgNeutralFaded,
    ':empty': {
      display: 'none',
      height: 0,
      padding: 0
    }
  },
  list: {
    // ans: maxHeight not supported in StyleX 0.19
    overflowY: 'auto',
    padding: spaceVar[1],
    outlineStyle: 'none',
    ':empty': {
      display: 'none',
      height: 0,
      padding: 0
    }
  },
  group: {
    paddingBottom: spaceVar[2],
    ':last-child': {
      paddingBottom: 0
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
  collection: {},
  row: {},
  item: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    gap: spaceVar[2],
    paddingInline: spaceVar[2.5],
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
    ':focus-visible': {
      outlineStyle: 'none'
    },
    '[data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.5
    }
  },
  separator: {
    height: 1,
    marginTop: spaceVar[1],
    marginBottom: spaceVar[1],
    backgroundColor: colorVar.borderNeutralFaded
  }
})

export const autocompleteVariants = stylex.create({
  default: {
    backgroundColor: colorVar.bgElevationBase,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    boxShadow: shadowVar.raised,
    ':hover:not([data-disabled])': {
      borderColor: colorVar.borderPrimary
    },
    ':focus-within': {
      borderColor: colorVar.borderPrimary
    }
  },
  subtle: {
    backgroundColor: colorVar.bgElevationBase,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    boxShadow: shadowVar.raised,
    ':hover:not([data-disabled])': {
      borderColor: colorVar.borderPrimary
    },
    ':focus-within': {
      borderColor: colorVar.borderPrimary
    }
  },
  ghost: {
    backgroundColor: 'transparent',
    ':focus': {
      outlineStyle: 'none'
    }
  }
})
