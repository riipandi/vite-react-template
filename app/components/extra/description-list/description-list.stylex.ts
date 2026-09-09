import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { container } from '#/styles/core/tokens.stylex'
import { fontFamily, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { stroke, unit } from '#/styles/core/tokens.stylex'

/**
 * Key-value rows with hairline separators.
 *
 * Mobile: single column; the term carries the row's top border (skipped on
 * the first row). From 660px: two columns — terms capped at
 * `min(50%, container.medium)`, details auto-sizing — and the separator
 * moves to the details so the line spans both columns; the second child (the
 * first details) skips it to keep the first row clean. The last row closes
 * with a bottom border so the list also reads well standalone.
 *
 * Border widths and styles stay constant (only colors flip between the
 * hairline color and transparent): separators can never shift the layout,
 * and there is deliberately no column gap so the term and details borders
 * meet into one continuous line per row.
 */
export const descriptionListStyles = stylex.create({
  root: {
    display: 'grid',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body1,
    gridTemplateColumns: '1fr',
    lineHeight: fontLineHeight.body1,
    '@media (min-width: 660px)': {
      fontSize: fontSize.body2,
      gridTemplateColumns: `min(50%, ${container.medium}) auto`,
      lineHeight: fontLineHeight.body2
    }
  },
  term: {
    borderBottomColor: 'transparent',
    borderBottomStyle: 'solid',
    borderBottomWidth: stroke.ring1,
    borderTopColor: {
      default: colors.borderNeutralFaded,
      ':first-child': 'transparent'
    },
    borderTopStyle: 'solid',
    borderTopWidth: stroke.ring1,
    color: colors.foregroundNeutralFaded,
    gridColumnStart: 1,
    paddingBlockEnd: {
      default: 0,
      '@media (min-width: 660px)': unit.x3
    },
    paddingBlockStart: unit.x3,
    ':last-of-type': {
      '@media (min-width: 660px)': {
        borderBottomColor: colors.borderNeutralFaded
      }
    }
  },
  details: {
    borderBottomColor: {
      default: 'transparent',
      ':last-child': colors.borderNeutralFaded
    },
    borderBottomStyle: 'solid',
    borderBottomWidth: stroke.ring1,
    borderTopColor: {
      default: 'transparent',
      '@media (min-width: 660px)': colors.borderNeutralFaded
    },
    borderTopStyle: 'solid',
    borderTopWidth: stroke.ring1,
    color: colors.foregroundNeutral,
    paddingBlockEnd: unit.x3,
    paddingBlockStart: {
      default: unit.x1,
      '@media (min-width: 660px)': unit.x3
    },
    ':nth-child(2)': {
      '@media (min-width: 660px)': {
        borderTopColor: 'transparent'
      }
    }
  }
})
