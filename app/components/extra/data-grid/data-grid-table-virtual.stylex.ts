import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontLineHeight, stroke, unit } from '#/styles/core/tokens.stylex'

/** Virtual table chrome: placeholder cells, spacers, status rows. */
export const dataGridTableVirtualStyles = stylex.create({
  placeholderCell: {
    padding: 0
  },
  // Mirrors the table's cell border + pinned-cell chrome for placeholders.
  cellBorder: {
    borderInlineEndColor: colors.borderNeutralFaded,
    borderInlineEndStyle: 'solid',
    borderInlineEndWidth: stroke.ring1
  },
  pinnedCell: {
    backgroundColor: colors.backgroundPage,
    isolation: 'isolate'
  },
  pinnedDividerStart: {
    boxShadow: `inset -1px 0 0 0 ${colors.borderNeutralFaded}`
  },
  pinnedDividerEnd: {
    boxShadow: `inset 1px 0 0 0 ${colors.borderNeutralFaded}`
  },
  utilityCenterCell: {
    padding: 0
  },
  statusCell: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    paddingBlock: unit.x4,
    textAlign: 'center'
  },
  statusCellCompact: {
    fontSize: fontSize.caption1,
    paddingBlock: unit.x3
  },
  statusInner: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x2,
    justifyContent: 'center'
  },
  spinner: {
    height: unit.x4,
    opacity: 0.6,
    width: unit.x4
  },
  viewportBlock: {
    display: 'block'
  }
})
