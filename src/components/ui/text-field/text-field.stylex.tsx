import * as stylex from '@stylexjs/stylex'
import { fontSize, radius, space, color } from '#/styles/tokens.stylex'

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
    borderColor: color.borderNeutral,
    paddingLeft: space[3],
    paddingRight: space[3],
    paddingTop: space[2],
    paddingBottom: space[2],
    fontSize: fontSize.sm,
    backgroundColor: color.bgPage,
    color: color.fgNeutral,
    '::placeholder': {
      color: color.fgNeutralFaded
    },
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: '150ms'
  },
  inputFocused: {
    borderColor: color.fgPrimary,
    boxShadow: '0 0 0 2px rgb(99 102 241 / 0.2)'
  },
  inputInvalid: {
    borderColor: color.fgCritical
  },
  inputDisabled: {
    borderColor: color.borderNeutral,
    backgroundColor: color.bgPage,
    color: color.fgDisabled
  }
})
