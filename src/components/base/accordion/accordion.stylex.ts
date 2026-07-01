import * as stylex from '@stylexjs/stylex'
import { colorVar, spaceVar, fontWeightVar } from '#/styles/tokens.stylex'

export const accordionStyles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  item: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colorVar.borderNeutral,
    ':last-child': {
      borderBottomWidth: 0
    }
  },
  header: {},
  trigger: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    gap: spaceVar[2],
    paddingTop: spaceVar[3],
    paddingBottom: spaceVar[3],
    transitionProperty: 'color',
    transitionDuration: '100ms',
    userSelect: 'none',
    outline: 'none',
    width: '100%',
    textAlign: 'left',
    lineHeight: '1.625',
    fontWeight: fontWeightVar.medium,
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineOffset: '2px',
      outlineColor: colorVar.fgPrimary
    },
    ':hover': {
      opacity: 0.7
    },
    '[data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.6,
      ':hover': {
        opacity: 0.6
      }
    }
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceVar[2],
    overflow: 'hidden',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-out'
    // ans: dynamic panel height animation via CSS custom property
    // managed by Base UI's Panel component
  },
  panelContent: {
    paddingBottom: spaceVar[3]
  },
  // ans: expandable indicator uses ::after pseudo-element in origin —
  // StyleX doesn't support pseudo-elements. Add a child element with
  // data-slot="expandable-indicator" and rotate on [data-panel-open].
  expandableIndicator: {}
})
