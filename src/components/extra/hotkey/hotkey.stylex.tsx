import * as stylex from '@stylexjs/stylex'
import {
  colorVar,
  radiusVar,
  spaceVar,
  fontSizeVar,
  fontWeightVar,
  shadowVar
} from '#/styles/tokens.stylex'

export const hotkeyStyles = stylex.create({
  base: {
    color: colorVar.fgNeutralFaded,
    // ans: `pointerEvents: 'none'` not supported in StyleX 0.19
    display: 'inline-flex',
    height: '1.25rem',
    width: 'fit-content',
    minWidth: '1.25rem',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spaceVar[1],
    borderRadius: radiusVar.xs,
    paddingInline: spaceVar[1],
    fontSize: fontSizeVar.xs,
    fontWeight: fontWeightVar.medium,
    userSelect: 'none'
    // ans: parent selector `in-data-[slot=tooltip-content]:*` not supported in StyleX
    // ans: child selector `[&_svg:not([class*="size-"])]:size-3` not supported
  },
  group: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spaceVar[1]
  }
})

export const hotkeyVariants = stylex.create({
  default: {
    backgroundColor: colorVar.bgNeutral,
    boxShadow: shadowVar.xs
  },
  outline: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorVar.borderNeutral
  },
  ghost: {}
})
