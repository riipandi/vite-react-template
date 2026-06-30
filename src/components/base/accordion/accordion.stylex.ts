import * as stylex from '@stylexjs/stylex'
import { color, radius, space, fontSize } from '#/styles/tokens.stylex'

const EASE_SPATIAL = 'cubic-bezier(0.27, 1.06, 0.18, 1)'

export const accordionStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100%',
    padding: space['1'],
    borderRadius: radius.lg
  },
  item: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.borderNeutral,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRadius: 0,
    fontSize: fontSize.md,
    transitionProperty: 'background-color, border-color, margin',
    transitionDuration: '500ms',
    transitionTimingFunction: EASE_SPATIAL,
    ':first-child': {
      borderTopColor: color.borderNeutral,
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    ':last-child': {
      borderBottomColor: color.borderNeutral,
      borderBottomLeftRadius: radius.lg,
      borderBottomRightRadius: radius.lg,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    '[data-open]': {
      marginBlock: space['2'],
      backgroundColor: color.bgNeutralFaded,
      borderColor: color.borderNeutral,
      borderRadius: radius.lg,
      borderTopColor: color.borderNeutral,
      borderBottomColor: color.borderNeutral
    },
    ':hover': {
      backgroundColor: color.bgNeutralFaded
    },
    ':focus-within': {
      backgroundColor: color.bgNeutralFaded
    }
  },
  trigger: {
    width: '100%',
    paddingInline: space['3'],
    paddingBlock: space['2.5'],
    textAlign: 'start',
    userSelect: 'none',
    color: color.fgNeutral,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    outline: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    ':focus-visible': {
      outlineWidth: 2,
      outlineStyle: 'solid',
      outlineColor: color.fgPrimary,
      outlineOffset: 2
    }
  },
  chevron: {
    width: space['4'],
    height: space['4'],
    color: color.fgNeutralFaded,
    flexShrink: 0,
    transitionProperty: 'transform',
    transitionDuration: '500ms',
    transitionTimingFunction: 'cubic-bezier(0.38, 1.21, 0.22, 1)',
    transform: {
      default: 'rotate(0deg)',
      [stylex.when.ancestor('[data-panel-open]')]: 'rotate(180deg)'
    }
  },
  content: {
    paddingInline: space['3'],
    paddingBottom: space['3'],
    color: color.fgNeutralFaded,
    overflow: 'hidden',
    height: 'var(--accordion-panel-height)',
    transitionProperty: 'height',
    transitionDuration: '500ms',
    transitionTimingFunction: EASE_SPATIAL,
    '[data-starting-style]': {
      height: 0
    },
    '[data-ending-style]': {
      height: 0,
      paddingBlock: 0,
      opacity: 0
    }
  }
})
