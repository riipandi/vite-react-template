import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  radiusVar,
  spaceVar,
  fontSizeVar,
  fontWeightVar,
  shadowVar
} from '#/styles/tokens.stylex'

export const selectStyles = stylex.create({
  root: {},
  base: {
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
    ':focus': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: colorVar.borderPrimary
    },
    '[data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.7
    }
  },
  icon: {
    color: colorVar.fgNeutralFaded,
    // ans: pointerEvents not supported in StyleX 0.19
    marginLeft: 'auto',
    width: spaceVar[3.5],
    height: spaceVar[3.5],
    flexShrink: 0
  },
  placeholder: {
    color: colorVar.fgNeutralFaded
  },
  chip: {
    marginLeft: spaceVar[1.5]
  },
  valueWrapper: {
    display: 'flex',
    minWidth: 0,
    flex: 1,
    alignItems: 'center',
    gap: spaceVar[2],
    userSelect: 'none'
  },
  valueText: {
    color: colorVar.fgNeutral,
    minWidth: 0,
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    userSelect: 'none'
  },
  valueLabel: {
    color: colorVar.fgNeutral,
    minWidth: 0,
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  backdrop: {},
  positioner: {},
  scrollUpArrow: {
    position: 'absolute',
    top: spaceVar[1],
    right: spaceVar[1],
    left: spaceVar[1],
    zIndex: 10,
    display: 'flex',
    height: spaceVar[5],
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: radiusVar.xs,
    fontSize: fontSizeVar.xs,
    color: colorVar.fgNeutral,
    backgroundColor: colorVar.bgNeutralFaded
  },
  popup: {
    backgroundColor: colorVar.bgElevationOverlay,
    borderRadius: radiusVar.xs,
    padding: spaceVar[1],
    outlineStyle: 'none',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    boxShadow: shadowVar.overlay
    // ans: transformOrigin not supported in StyleX 0.19
  },
  arrow: {},
  scrollDownArrow: {
    position: 'absolute',
    right: spaceVar[1],
    bottom: spaceVar[1],
    left: spaceVar[1],
    zIndex: 10,
    display: 'flex',
    height: spaceVar[5],
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: radiusVar.xs,
    fontSize: fontSizeVar.xs,
    color: colorVar.fgNeutral,
    backgroundColor: colorVar.bgNeutralFaded
  },
  list: {
    position: 'relative',
    // ans: maxHeight not supported in StyleX 0.19
    overflowY: 'auto'
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
      color: colorVar.fgNeutralFaded
    }
  },
  itemText: {
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[2],
    fontSize: fontSizeVar.sm
  },
  itemIndicator: {
    marginLeft: 'auto'
  },
  group: {},
  groupLabel: {
    color: colorVar.fgNeutralFaded,
    paddingInline: spaceVar[2.5],
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

export const selectVariants = stylex.create({
  default: {
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
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    backgroundColor: colorVar.bgElevationBase,
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
    ':hover:not([data-disabled])': {
      backgroundColor: colorVar.bgNeutralFaded
    }
  }
})
