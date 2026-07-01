import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  radiusVar,
  spaceVar,
  fontSizeVar,
  fontWeightVar,
  shadowVar
} from '#/styles/tokens.stylex'

export const tabsStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar[4]
  },
  list: {
    position: 'relative',
    zIndex: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaceVar[1],
    paddingInline: spaceVar[1],
    paddingTop: spaceVar['1.5'],
    paddingBottom: spaceVar['1.5'],
    borderRadius: radiusVar.lg,
    fontSize: fontSizeVar.sm,
    backgroundColor: colorVar.bgNeutralFaded
  },
  indicator: {
    position: 'absolute',
    zIndex: -1,
    borderRadius: radiusVar.sm,
    backgroundColor: colorVar.bgPage,
    top: '50%',
    left: 0,
    height: spaceVar[8],
    width: 'var(--active-tab-width)',
    transform: 'translateX(var(--active-tab-left)) translateY(-50%)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutralFaded,
    boxShadow: shadowVar.raised
  },
  tab: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spaceVar[2],
    height: spaceVar[7],
    flex: 1,
    paddingInline: spaceVar[2.5],
    paddingTop: spaceVar[1],
    paddingBottom: spaceVar[1],
    borderRadius: radiusVar.sm,
    fontWeight: fontWeightVar.medium,
    fontSize: fontSizeVar.sm,
    transitionProperty: 'color',
    transitionDuration: '150ms',
    color: colorVar.onBgNeutral,
    ':hover:not([data-disabled])': {
      color: colorVar.fgNeutral
    },
    '[data-active]': {
      color: colorVar.fgNeutral
    },
    ':focus-visible': {
      outlineColor: colorVar.borderNeutral,
      outlineWidth: 2,
      outlineOffset: 2,
      outlineStyle: 'solid'
    },
    '[data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.5
    }
  },
  panel: {
    paddingInline: spaceVar[1],
    outlineStyle: 'none'
  }
})

export const tabsOrientations = stylex.create({
  horizontal: {
    flexDirection: 'column'
  },
  vertical: {
    flexDirection: 'row'
  }
})
