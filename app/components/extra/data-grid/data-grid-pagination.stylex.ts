import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontLineHeight, unit } from '#/styles/core/tokens.stylex'

/**
 * Pagination chrome. Tailwind `sm:` (640px) aligns to the project's first
 * token breakpoint (660px).
 */
export const dataGridPaginationStyles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'space-between',
    paddingBlock: '10px',
    '@media (min-width: 660px)': {
      flexDirection: 'row',
      paddingBlock: 0
    }
  },
  sizes: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    order: 2,
    paddingBlockEnd: '10px',
    '@media (min-width: 660px)': {
      order: 1,
      paddingBlockEnd: 0
    }
  },
  mutedText: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2
  },
  // w-fit with a min, never a fixed width: a fixed w-16 clipped the value
  // "100" by 1px at nova's paddings, while fit-content grows the trigger for
  // 3-digit sizes and the min keeps the 1-2 digit ones from collapsing
  // narrower than 64px.
  pageSizeTrigger: {
    height: unit.x8,
    minWidth: unit.x16,
    width: 'fit-content'
  },
  pageSizeContent: { minWidth: 'var(--anchor-width)' },
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'center',
    order: 1,
    paddingBlockStart: '10px',
    '@media (min-width: 660px)': {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      order: 2,
      paddingBlockStart: 0
    }
  },
  infoText: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    order: 2,
    whiteSpace: 'nowrap',
    '@media (min-width: 660px)': {
      order: 1
    }
  },
  pages: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x1,
    order: 1
  },
  pageButton: {
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    padding: 0
  },
  pageButtonMuted: { color: colors.foregroundNeutralFaded },
  pageButtonActive: {
    backgroundColor: colors.backgroundNeutralHighlightedFaded,
    color: colors.foregroundNeutral
  },
  arrowButton: {
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    padding: 0,
    ':dir(rtl)': { transform: 'rotate(180deg)' }
  },
  arrowIcon: { height: unit.x4, width: unit.x4 },
  sizesSkeleton: { height: unit.x8, width: 176 },
  infoSkeleton: { height: unit.x8, width: 240 },
  srOnly: {
    borderStyle: 'solid',
    borderWidth: 0,
    clipPath: 'inset(50%)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1
  }
})
