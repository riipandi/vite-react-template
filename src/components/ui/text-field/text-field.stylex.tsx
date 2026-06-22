import * as stylex from '@stylexjs/stylex'
import { colors, fontSize, radius, space } from '#/styles/token.stylex'

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
    borderColor: colors.zinc300,
    paddingLeft: space[3],
    paddingRight: space[3],
    paddingTop: space[2],
    paddingBottom: space[2],
    fontSize: fontSize.sm,
    backgroundColor: colors.surface,
    color: colors.zinc800,
    '::placeholder': {
      color: colors.zinc400
    },
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionDuration: '150ms'
  },
  inputFocused: {
    borderColor: colors.primary500,
    boxShadow: '0 0 0 2px rgb(99 102 241 / 0.2)'
  },
  inputInvalid: {
    borderColor: colors.destructive500
  },
  inputDisabled: {
    borderColor: colors.zinc200,
    backgroundColor: colors.zinc50,
    color: colors.zinc300
  }
})
