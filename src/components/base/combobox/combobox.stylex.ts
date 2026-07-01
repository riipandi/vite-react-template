import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  radiusVar,
  spaceVar,
  fontSizeVar,
  fontWeightVar,
  shadowVar
} from '#/styles/tokens.stylex'

export const comboboxStyles = stylex.create({
  root: {},
  trigger: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    gap: spaceVar[2],
    height: spaceVar[9],
    width: '100%',
    paddingInline: spaceVar[3],
    borderRadius: radiusVar.xs,
    fontSize: fontSizeVar.sm,
    transitionProperty: 'all',
    transitionDuration: '150ms',
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
    },
    '[data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  positioner: {},
  renderValueWrapper: {
    display: 'flex',
    minWidth: 0,
    flex: 1,
    alignItems: 'center',
    gap: spaceVar[2]
  },
  renderValueLabel: {
    color: colorVar.fgNeutral,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  renderValuePlaceholder: {
    color: colorVar.fgNeutralFaded
  },
  searchInput: {
    height: spaceVar[9],
    width: '100%',
    paddingInline: spaceVar[2],
    fontSize: fontSizeVar.sm,
    outlineStyle: 'none',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colorVar.borderNeutral,
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
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
  empty: {
    color: colorVar.fgNeutralFaded,
    paddingInline: spaceVar[2.5],
    paddingTop: spaceVar[2],
    paddingBottom: spaceVar[3],
    textAlign: 'center',
    fontSize: fontSizeVar.sm
  },
  list: {
    // ans: maxHeight not supported in StyleX 0.19
    overflowY: 'auto',
    padding: spaceVar[1],
    outlineStyle: 'none'
  },
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
      opacity: 0.7
    }
  },
  group: {},
  groupLabel: {
    color: colorVar.fgNeutralFaded,
    paddingInline: spaceVar[2],
    paddingTop: spaceVar[1],
    paddingBottom: spaceVar[1],
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium
  },
  separator: {
    height: 1,
    marginTop: spaceVar[1],
    marginBottom: spaceVar[1],
    backgroundColor: colorVar.borderNeutralFaded
  }
})

export const comboboxVariants = stylex.create({
  default: {},
  subtle: {
    backgroundColor: colorVar.bgElevationBase
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderStyle: 'none',
    boxShadow: 'none',
    ':hover:not([data-disabled])': {
      backgroundColor: colorVar.bgNeutralFaded
    }
  }
})
