import * as stylex from '@stylexjs/stylex'
import { colors, shadow } from '#/styles/core/colors.stylex'
import {
  fontFamily,
  fontSize,
  fontLineHeight,
  fontWeight,
  radius,
  stroke,
  unit
} from '#/styles/core/tokens.stylex'

/**
 * The data-grid table renderer chrome. State-driven styles are applied as
 * conditional stylex.props arguments computed in React; dynamic geometry
 * (column widths, pin offsets, tree indent) stays on inline styles / CSS
 * custom properties exactly like the source, because the browser applies
 * those without React re-renders.
 *
 * Row separators are painted on the tds (border-separate). Whether a row
 * paints a bottom border depends on the ROW's position, so the row sets the
 * `--dg-row-border-b` custom property and the tds consume it.
 */
export const dataGridTableStyles = stylex.create({
  table: {
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.regular,
    lineHeight: fontLineHeight.body2,
    textAlign: 'start',
    verticalAlign: 'middle'
  },
  // Draggable columns need collapse for the dnd transform model; the
  // default is border-separate with zero spacing (row borders paint on tds).
  tableSeparate: {
    borderCollapse: 'separate',
    borderSpacing: 0
  },
  tableSized: {
    minWidth: 0
  },
  tableFull: {
    width: '100%',
    minWidth: '100%'
  },
  tableFixed: {
    tableLayout: 'fixed'
  },
  tableAuto: {
    tableLayout: 'auto'
  },
  // ReUI headerSticky default slot: sticky top-0 z-40 bg-background/90
  // backdrop-blur-xs. z-40 keeps it above pinned body cells (zIndex 30).
  headerSticky: {
    backdropFilter: 'blur(2px)',
    backgroundColor: `color-mix(in srgb, ${colors.backgroundPage} 90%, transparent)`,
    position: 'sticky',
    top: 0,
    zIndex: 40
  },
  // Header cell.
  th: {
    color: colors.foregroundNeutral,
    fontWeight: fontWeight.medium,
    height: unit.x10,
    paddingInline: {
      default: unit.x3,
      '[data-dense]': unit.x2
    },
    position: 'relative',
    textAlign: 'start',
    verticalAlign: 'middle'
  },
  thHeaderBackground: {
    backgroundColor: colors.backgroundNeutral
  },
  // headerBorder: the bottom border lives on the th (border-separate).
  thHeaderBorder: {
    borderBottomColor: colors.borderNeutralFaded,
    borderBottomStyle: 'solid',
    borderBottomWidth: stroke.ring1
  },
  // cellBorder: end separators on every cell except the row's last child
  // (the resize filler strip or the true last cell) — `*:last:border-e-0`.
  cellBorder: {
    borderInlineEndColor: colors.borderNeutralFaded,
    borderInlineEndStyle: 'solid',
    borderInlineEndWidth: {
      default: stroke.ring1,
      ':last-child': 0
    }
  },
  // Cell-border suppression on the last CENTER cell when the resize filler
  // follows it (that cell is not :last-child there, so the conditional above
  // cannot apply).
  cellBorderLast: {
    borderInlineEndWidth: 0
  },
  thPinned: {
    backgroundColor: colors.backgroundNeutral,
    isolation: 'isolate'
  },
  thResizable: {
    overflow: {
      default: 'visible',
      '[data-pinned]': 'hidden'
    }
  },
  thResizableLast: {
    paddingInlineEnd: unit.x8
  },
  // Pinned-cell boundary shadows (inset divider toward the scrollable side).
  thPinnedDividerStart: {
    boxShadow: `inset -1px 0 0 0 ${colors.borderNeutralFaded}`
  },
  thPinnedDividerEnd: {
    boxShadow: `inset 1px 0 0 0 ${colors.borderNeutralFaded}`
  },
  // Body cell.
  td: {
    paddingBlock: {
      default: unit.x2,
      '[data-dense]': unit.x1_5
    },
    paddingInline: {
      default: unit.x3,
      '[data-dense]': unit.x2
    },
    textAlign: 'start',
    verticalAlign: 'middle',
    // Row separator, driven by the row's own --dg-row-border-b var. Every
    // cell of a bordered row carries it (the row-level logic decides which
    // ROWS border, matching ReUI's `[&:not(:last-child)>td]:border-b` —
    // the :last-child there is a ROW, not a cell).
    borderBottomColor: colors.borderNeutralFaded,
    borderBottomStyle: 'solid',
    borderBottomWidth: 'var(--dg-row-border-b, 0px)'
  },
  tdPinned: {
    backgroundColor: colors.backgroundPage,
    isolation: 'isolate'
  },
  tdPinnedDividerStart: {
    boxShadow: `inset -1px 0 0 0 ${colors.borderNeutralFaded}`
  },
  tdPinnedDividerEnd: {
    boxShadow: `inset 1px 0 0 0 ${colors.borderNeutralFaded}`
  },
  // Truncation when a column is resizable (td must not clip the selection
  // chrome, so with cell selection the truncation moves to the wrapper).
  tdTruncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  // The truncation wrapper used when cell selection is on: it consumes the
  // td padding with negative margins and restores it as its own, so its
  // overflow clips at exactly the boundary the td's truncate used to clip
  // at - including custom cells that pull into the padding the same way.
  truncateWrap: {
    marginBlockEnd: {
      default: `calc(-1 * ${unit.x2})`,
      '[data-dense]': `calc(-1 * ${unit.x1_5})`
    },
    marginBlockStart: {
      default: `calc(-1 * ${unit.x2})`,
      '[data-dense]': `calc(-1 * ${unit.x1_5})`
    },
    marginInlineEnd: {
      default: `calc(-1 * ${unit.x3})`,
      '[data-dense]': `calc(-1 * ${unit.x2})`
    },
    marginInlineStart: {
      default: `calc(-1 * ${unit.x3})`,
      '[data-dense]': `calc(-1 * ${unit.x2})`
    },
    overflow: 'hidden',
    paddingBlock: {
      default: unit.x2,
      '[data-dense]': unit.x1_5
    },
    paddingInline: {
      default: unit.x3,
      '[data-dense]': unit.x2
    },
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  // Body rows.
  row: {
    // hover:bg-muted/40 — pinned cells pre-mix their own hover tint below.
    backgroundColor: {
      default: 'transparent',
      ':hover': `color-mix(in srgb, ${colors.backgroundNeutral} 40%, transparent)`
    }
  },
  rowHoverCursor: {
    cursor: 'pointer'
  },
  rowSelected: {
    backgroundColor: `color-mix(in srgb, ${colors.backgroundNeutral} 50%, transparent)`
  },
  // Pinned cells are OPAQUE (they hide scrolled content), so a hover must
  // pre-mix the tint over the background instead of inheriting the
  // translucent row fill.
  pinnedCellHoverMix: {
    backgroundColor: `color-mix(in oklab, ${colors.backgroundNeutral} 40%, ${colors.backgroundPage})`
  },
  pinnedCellSelectedMix: {
    backgroundColor: `color-mix(in oklab, ${colors.backgroundNeutral} 50%, ${colors.backgroundPage})`
  },
  // Striped rows.
  rowStriped: {
    backgroundColor: {
      default: 'transparent',
      ':hover': 'transparent'
    }
  },
  cellStripedOdd: {
    backgroundColor: `color-mix(in srgb, ${colors.backgroundNeutral} 90%, transparent)`
  },
  cellStripedOddHover: {
    backgroundColor: {
      default: `color-mix(in srgb, ${colors.backgroundNeutral} 90%, transparent)`,
      ':hover': `color-mix(in srgb, ${colors.backgroundNeutral} 100%, transparent)`
    }
  },
  // rowsPinnable tint.
  rowPinnedTint: {
    backgroundColor: {
      default: `color-mix(in srgb, ${colors.backgroundNeutral} 30%, transparent)`,
      // hover:bg-muted/50
      ':hover': `color-mix(in srgb, ${colors.backgroundNeutral} 50%, transparent)`
    }
  },
  // Pinned-row boundary shadows: the separator shadow casts away from the
  // scrolled content.
  rowBoundaryTop: {
    boxShadow: '0 2px 0 rgba(0, 0, 0, 0.03)'
  },
  rowBoundaryBottom: {
    boxShadow: '0 -2px 0 rgba(0, 0, 0, 0.03)'
  },
  // CRUD row-status tints (defaults; yield to tableStyles overrides).
  rowStatusDeleted: {
    backgroundColor: `color-mix(in srgb, ${colors.backgroundCritical} 5%, transparent)`,
    opacity: 0.6
  },
  rowStatusDirty: {
    backgroundColor: colors.backgroundWarningFaded
  },
  rowStatusNew: {
    backgroundColor: colors.backgroundPositiveFaded
  },
  cellStatusDeleted: {
    backgroundColor: `color-mix(in oklab, ${colors.backgroundCritical} 5%, ${colors.backgroundPage})`,
    textDecoration: 'line-through'
  },
  cellStatusDirtyPinned: {
    backgroundColor: `color-mix(in oklab, ${colors.backgroundWarning} 5%, ${colors.backgroundPage})`
  },
  cellStatusNewPinned: {
    backgroundColor: `color-mix(in oklab, ${colors.backgroundPositive} 5%, ${colors.backgroundPage})`
  },
  // The classic edited-cell corner mark, active only when getCellStatus is
  // wired: amber (warning) for "dirty", destructive (critical) for "invalid".
  cellStatusMark: {
    position: 'relative',
    '::after': {
      borderInlineStartColor: 'transparent',
      borderInlineStartStyle: 'solid',
      borderInlineStartWidth: 5,
      borderTopColor: colors.backgroundCritical,
      borderTopStyle: 'solid',
      borderTopWidth: 5,
      blockSize: 0,
      content: '""',
      insetInlineEnd: 0,
      position: 'absolute',
      top: 0
    }
  },
  cellStatusMarkDirty: {
    '::after': {
      borderTopColor: colors.backgroundWarning
    }
  },
  // Filler cells for the resizable strip.
  fillCell: {
    padding: 0
  },
  fillHeadCellBackground: {
    backgroundColor: colors.backgroundNeutral
  },
  // Quick-create affordance row.
  addRowButton: {
    color: colors.foregroundNeutralFaded,
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    // Block-level flex: inline-flex would sit on the cell's text baseline
    // and push the icon and label off vertical center.
    alignItems: 'center',
    borderRadius: 0,
    height: {
      default: unit.x9,
      '[data-dense]': unit.x8
    },
    paddingInline: {
      default: unit.x3,
      '[data-dense]': unit.x2
    }
  },
  addRowCell: {
    padding: 0
  },
  addRowIcon: {
    height: unit.x4,
    width: unit.x4
  },
  // Empty state.
  emptyCell: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    paddingBlock: unit.x6,
    textAlign: 'center'
  },
  // Spinner loading mode cell.
  loadingCell: {
    padding: unit.x8
  },
  loadingInner: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  loadingText: {
    color: colors.foregroundNeutralFaded
  },
  // Floating loader (spinner mode for viewports).
  loaderWrap: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  loaderCard: {
    alignItems: 'center',
    backgroundColor: colors.backgroundElevationBase,
    borderStyle: 'solid',
    borderTopColor: colors.borderNeutralFaded,
    borderTopWidth: stroke.ring1,
    borderInlineEndColor: colors.borderNeutralFaded,
    borderInlineEndWidth: stroke.ring1,
    borderInlineStartColor: colors.borderNeutralFaded,
    borderInlineStartWidth: stroke.ring1,
    borderBottomColor: colors.borderNeutralFaded,
    borderBottomWidth: stroke.ring1,
    borderRadius: radius.large,
    color: colors.foregroundNeutralFaded,
    display: 'flex',
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    gap: unit.x2,
    lineHeight: 1,
    paddingBlock: unit.x2,
    paddingInline: unit.x4
  },
  loaderSpinner: {
    height: unit.x5,
    opacity: 0.6,
    width: unit.x5
  },
  // Row pin toggle.
  rowPinButton: {
    alignItems: 'center',
    borderRadius: radius.medium,
    color: {
      default: `color-mix(in srgb, ${colors.foregroundNeutralFaded} 100%, transparent)`,
      ':hover': `color-mix(in srgb, ${colors.foregroundNeutral} 100%, transparent)`,
      '[data-pinned]': `color-mix(in srgb, ${colors.foregroundPrimary} 100%, transparent)`,
      ':hover[data-pinned]': `color-mix(in srgb, ${colors.foregroundPrimary} 80%, transparent)`
    },
    display: 'inline-flex',
    height: unit.x7,
    justifyContent: 'center',
    transitionDuration: '150ms',
    transitionProperty: 'color, background-color, border-color',
    width: unit.x7
  },
  // Row expand toggle.
  rowExpand: {
    alignItems: 'center',
    display: 'inline-flex',
    flexShrink: 0,
    // ps-(--data-grid-tree-padding): the inline style sets the var.
    paddingInlineStart: 'var(--data-grid-tree-padding)',
    verticalAlign: 'middle'
  },
  rowExpandButton: {
    alignItems: 'center',
    borderRadius: radius.medium,
    color: {
      default: `color-mix(in srgb, ${colors.foregroundNeutralFaded} 100%, transparent)`,
      ':hover': `color-mix(in srgb, ${colors.foregroundNeutral} 100%, transparent)`
    },
    display: 'inline-flex',
    height: {
      default: unit.x7,
      '[data-dense]': unit.x6
    },
    justifyContent: 'center',
    transitionDuration: '150ms',
    transitionProperty: 'color, background-color, border-color',
    width: {
      default: unit.x7,
      '[data-dense]': unit.x6
    }
  },
  rowExpandChevron: {
    height: unit.x4,
    transform: {
      default: 'rotate(0deg)',
      ':dir(rtl)': 'rotate(0deg)'
    },
    transitionDuration: '200ms',
    transitionProperty: 'transform',
    width: unit.x4
  },
  rowExpandChevronCollapsed: {
    transform: {
      default: 'rotate(-90deg)',
      ':dir(rtl)': 'rotate(90deg)'
    }
  },
  rowExpandLeafSpacer: {
    flexShrink: 0,
    width: unit.x2
  },
  // Virtualization spacer tbody.
  bodySpacer: {
    height: unit.x2
  },
  // Column resize handle.
  resizeHandle: {
    cursor: 'col-resize',
    display: 'flex',
    height: '100%',
    position: 'absolute',
    top: 0,
    touchAction: 'none',
    userSelect: 'none',
    zIndex: 10
  },
  resizeHandleStart: {
    justifyContent: 'flex-start',
    insetInlineStart: 0,
    width: unit.x5
  },
  resizeHandleEnd: {
    justifyContent: 'flex-end',
    insetInlineEnd: 0,
    width: unit.x5
  },
  resizeHandleCenter: {
    justifyContent: 'center',
    insetInlineEnd: `calc(-1 * ${unit.x2})`,
    width: unit.x5
  },
  // The hairline preview line; hidden where another separator already draws
  // the boundary (cell borders, the pin affordance's own divider).
  resizeHandleLine: {
    '::before': {
      backgroundColor: colors.borderNeutralFaded,
      blockSize: '100%',
      content: '""',
      inlineSize: stroke.ring1,
      position: 'absolute',
      top: 0
    }
  },
  resizeHandleLineStart: {
    '::before': {
      insetInlineStart: 0
    }
  },
  resizeHandleLineEnd: {
    '::before': {
      insetInlineEnd: 0,
      transform: 'translateX(-1px)'
    }
  },
  resizeHandleLineCenter: {
    '::before': {
      insetInlineEnd: '50%',
      transform: 'translateX(50%)'
    }
  },
  resizeHandleLineHidden: {
    '::before': {
      display: 'none'
    }
  },
  resizeHandleActive: {
    opacity: 1
  },
  resizeHandleActiveLine: {
    '::before': {
      backgroundColor: colors.backgroundPrimary,
      display: 'block',
      inlineSize: 2
    }
  },
  resizeHandleActiveLineEnd: {
    '::before': {
      insetInlineEnd: 0,
      transform: 'none'
    }
  },
  // Live (onChange) resize indicator.
  resizeIndicator: {
    insetBlock: 0,
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 50
  },
  resizeIndicatorBar: {
    backgroundColor: `color-mix(in srgb, ${colors.backgroundPrimary} 85%, transparent)`,
    insetBlock: 0,
    left: 0,
    position: 'absolute',
    transform: 'translateX(-50%)',
    width: stroke.ring1
  },
  resizeIndicatorHead: {
    backgroundColor: colors.backgroundPrimary,
    borderBottomLeftRadius: radius.small,
    borderBottomRightRadius: radius.small,
    boxShadow: shadow.outline,
    left: 0,
    position: 'absolute',
    top: 0,
    transform: 'translateX(-50%)',
    width: 5
  },
  // Body / foot sections.
  footRowBackground: {
    backgroundColor: `color-mix(in srgb, ${colors.backgroundNeutral} 40%, transparent)`
  },
  footCell: {
    color: `color-mix(in srgb, ${colors.foregroundNeutral} 80%, transparent)`,
    fontWeight: fontWeight.medium,
    paddingBlock: {
      default: unit.x2,
      '[data-dense]': unit.x1_5
    },
    paddingInline: {
      default: unit.x3,
      '[data-dense]': unit.x2
    },
    verticalAlign: 'middle'
  },
  // Fill handle variants.
  fillHandle: {
    bottom: 0,
    cursor: 'crosshair',
    position: 'absolute',
    zIndex: 10
  },
  fillHandleDot: {
    backgroundColor: colors.backgroundPrimary,
    borderColor: colors.backgroundPage,
    borderRadius: radius.full,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    blockSize: 9,
    inlineSize: 9,
    insetInlineEnd: 0
  },
  fillHandleSquare: {
    backgroundColor: colors.backgroundPrimary,
    blockSize: 5,
    inlineSize: 5,
    insetInlineEnd: 0
  },
  fillHandleRing: {
    backgroundColor: colors.backgroundPage,
    borderColor: colors.backgroundPrimary,
    borderRadius: radius.full,
    borderStyle: 'solid',
    borderWidth: 2,
    blockSize: 11,
    inlineSize: 11,
    insetInlineEnd: -5,
    bottom: -5
  },
  fillHandleRingClampEnd: {
    insetInlineEnd: 0
  },
  fillHandleRingClampBottom: {
    bottom: 0
  }
})

/** Viewport wrapper for the table (single or split header/body layouts). */
export const dataGridTableViewportStyles = stylex.create({
  viewport: {
    minWidth: '100%',
    position: 'relative',
    verticalAlign: 'top'
  }
})
