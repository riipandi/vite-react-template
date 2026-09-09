import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { container } from '#/styles/core/tokens.stylex'
import { unit, radius } from '#/styles/core/tokens.stylex'
import { fontFamily, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'

export const tooltipStyles = stylex.create({
  popup: {
    backgroundColor: colors.foregroundNeutral,
    borderRadius: radius.small,
    color: colors.backgroundPage,
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1,
    maxWidth: container.small,
    opacity: {
      default: 1,
      '[data-starting-style]': 0,
      '[data-ending-style]': 0
    },
    paddingBlock: unit.x1_5,
    paddingInline: unit.x3
  },
  arrow: {
    backgroundColor: colors.foregroundNeutral,
    bottom: { default: null, '[data-side="top"]': `calc(-1 * ${unit.x2} / 2)` },
    height: unit.x2,
    left: {
      default: null,
      '[data-side="right"]': `calc(-1 * ${unit.x2} / 2)`,
      '[data-side="inline-end"]': `calc(-1 * ${unit.x2} / 2)`
    },
    position: 'absolute',
    right: {
      default: null,
      '[data-side="left"]': `calc(-1 * ${unit.x2} / 2)`,
      '[data-side="inline-start"]': `calc(-1 * ${unit.x2} / 2)`
    },
    top: { default: null, '[data-side="bottom"]': `calc(-1 * ${unit.x2} / 2)` },
    transform: 'rotate(45deg)',
    width: unit.x2
  }
})
