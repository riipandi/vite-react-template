import * as stylex from '@stylexjs/stylex'
import { colors } from '#/lib/tokens.stylex'
import { stroke } from '#/styles/core/tokens.stylex'
import { unit } from '#/styles/core/tokens.stylex'
import { fontFamily, fontWeight, fontSize, fontLineHeight } from '#/styles/core/tokens.stylex'
import { duration } from '#/styles/core/tokens.stylex'

export const tableStyles = stylex.create({
  container: {
    overflowX: 'auto',
    position: 'relative',
    width: '100%'
  },
  table: {
    borderCollapse: 'collapse',
    captionSide: 'bottom',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    width: '100%'
  },
  row: {
    backgroundColor: {
      default: 'transparent',
      ':hover': `color-mix(in srgb, ${colors.muted} 50%, transparent)`
    },
    // The header row keeps its bottom border; the last body row's border is
    // dropped on the last row.
    borderBottomColor: colors.border,
    borderBottomStyle: { default: 'solid', ':last-child': 'none' },
    borderBottomWidth: { default: stroke.border, ':last-child': 0 },
    transitionDuration: duration.fast,
    transitionProperty: 'background-color'
  },
  head: {
    // The header row is the :last-child of its <thead>, so the row-level
    // border removal would strip it — draw the header border on the cells
    // instead (border-collapse merges them into one line).
    borderBottomColor: colors.border,
    borderBottomStyle: 'solid',
    borderBottomWidth: stroke.border,
    color: colors.foreground,
    fontWeight: fontWeight.medium,
    height: unit.x10,
    paddingInline: unit.x2,
    textAlign: 'left',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
  },
  cell: {
    padding: unit.x2,
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
  },
  footer: {
    backgroundColor: `color-mix(in srgb, ${colors.muted} 50%, transparent)`,
    borderTopColor: colors.border,
    borderTopStyle: 'solid',
    borderTopWidth: stroke.border,
    fontWeight: fontWeight.medium
  },
  caption: {
    color: colors.mutedForeground,
    fontSize: fontSize.body2,
    marginTop: unit.x4
  }
})
