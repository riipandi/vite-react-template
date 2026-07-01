import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, shadowVar, spaceVar } from '#/styles/tokens.stylex'

export const toggleGroupStyles = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: spaceVar[1],
    padding: spaceVar[1],
    borderRadius: radiusVar.xs
  }
})

export const toggleGroupVariants = stylex.create({
  default: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral,
    boxShadow: shadowVar.sm
  },
  outline: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral
  },
  ghost: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent'
  }
})

// ans: child-size overrides from origin skipped — no compound-variant mechanism in stylex
export const toggleGroupSizes = stylex.create({
  sm: {},
  md: {},
  lg: {}
})

// ans: compound icon+size child overrides skipped for same reason
export const toggleGroupModes = stylex.create({
  icon: {}
})

export const toggleGroupOrientations = stylex.create({
  horizontal: {
    flexDirection: 'row'
  },
  vertical: {
    flexDirection: 'column'
  }
})
