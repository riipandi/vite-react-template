import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'

/**
 * Shared StyleX styles for the data-grid stories. StyleX requires styles that
 * cross module boundaries to live in a `.stylex.ts` file.
 */
export const stackStyles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%'
  },
  link: {
    color: {
      default: colors.foregroundNeutral,
      ':hover': colors.foregroundPrimary
    },
    textDecoration: {
      default: 'none',
      ':hover': 'underline'
    }
  },
  muted: {
    color: colors.foregroundNeutralFaded
  },
  strong: {
    color: colors.foregroundNeutral,
    fontWeight: 500
  },
  flag: {
    borderRadius: '999px',
    flexShrink: 0,
    height: 16,
    width: 16
  },
  // Common cell layouts.
  cellFlex: {
    alignItems: 'center',
    display: 'flex',
    gap: 8
  },
  cellFlexWide: {
    alignItems: 'center',
    display: 'flex',
    gap: 12
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  salary: {
    fontWeight: 600
  },
  nameStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  },
  avatar32: {
    height: 32,
    width: 32
  },
  avatar24: {
    height: 24,
    width: 24
  },
  textEnd: {
    textAlign: 'end'
  },
  cardFlush: {
    padding: 0
  }
})
