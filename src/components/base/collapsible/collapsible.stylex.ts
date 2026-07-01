import * as stylex from '@stylexjs/stylex'
import { colorVar, spaceVar, fontSizeVar, fontWeightVar } from '#/styles/tokens.stylex'

export const collapsibleStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column'
  },
  trigger: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    gap: spaceVar[2],
    userSelect: 'none',
    color: colorVar.fgNeutral,
    paddingTop: spaceVar['1.5'],
    paddingBottom: spaceVar['1.5'],
    fontSize: fontSizeVar.sm,
    transitionProperty: 'color',
    transitionDuration: '100ms',
    width: '100%',
    textAlign: 'left',
    lineHeight: '1.625',
    fontWeight: fontWeightVar.medium,
    outline: 'none',
    ':focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineOffset: '2px',
      outlineColor: colorVar.fgPrimary
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.7
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
  panelContent: {}
})

// ans: expandable indicator uses ::after pseudo-element in origin —
// StyleX doesn't support pseudo-elements. Add a child element with
// data-slot="expandable-indicator" and rotate on [data-panel-open].
export const collapsibleExpandable = stylex.create({
  true: {}
})
