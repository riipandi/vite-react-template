import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  radiusVar,
  shadowVar,
  spaceVar,
  fontSizeVar,
  fontWeightVar
} from '#/styles/tokens.stylex'

// ans: this file is not currently imported by toast.component.tsx — component uses data-ui
//     attribute hooks instead. Styles here are reference from origin for when stylex is adopted.
export const toastStyles = stylex.create({
  viewport: {
    position: 'fixed',
    zIndex: 50,
    display: 'flex'
  },
  root: {
    backgroundColor: colorVar.bgPage,
    borderColor: colorVar.borderNeutral,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: radiusVar.md,
    boxShadow: shadowVar.raised,
    padding: spaceVar[1],
    userSelect: 'none'
  },
  content: {
    display: 'flex',
    gap: spaceVar[2],
    padding: spaceVar['2.5']
  },
  body: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: spaceVar[3],
    minWidth: 0
  },
  textContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: spaceVar['0.5'],
    minWidth: 0
  },
  title: {
    color: colorVar.fgNeutral,
    fontSize: fontSizeVar.sm,
    fontWeight: fontWeightVar.medium
  },
  description: {
    color: colorVar.fgNeutralFaded,
    fontSize: fontSizeVar.sm
  },
  closeButton: {
    color: colorVar.fgNeutralFaded,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: radiusVar.xs
  },
  arrow: {},
  anchoredRoot: {
    backgroundColor: colorVar.bgPage,
    borderColor: colorVar.borderNeutral,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: radiusVar.xs,
    boxShadow: shadowVar.raised
  },
  anchoredContent: {
    display: 'flex',
    gap: spaceVar[2],
    padding: spaceVar[2]
  }
})
