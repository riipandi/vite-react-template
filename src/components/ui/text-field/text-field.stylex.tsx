import * as stylex from '@stylexjs/stylex'
import { ui, fontSize, radius, space } from '#/styles/token.stylex'

export const fieldStyles = stylex.create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: space[1]
  },
  input: {
    minWidth: 0,
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: ui.border,
    paddingLeft: space[3],
    paddingRight: space[3],
    paddingTop: space[2],
    paddingBottom: space[2],
    fontSize: fontSize.sm,
    backgroundColor: ui.bg,
    color: ui.fg,
    '::placeholder': {
      color: ui.fgFaded
    },
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: '150ms'
  },
  inputFocused: {
    borderColor: ui.fgPrimary,
    boxShadow: '0 0 0 2px rgb(99 102 241 / 0.2)'
  },
  inputInvalid: {
    borderColor: ui.fgCritical
  },
  inputDisabled: {
    borderColor: ui.border,
    backgroundColor: ui.bg,
    color: ui.fgDisabled
  }
})
