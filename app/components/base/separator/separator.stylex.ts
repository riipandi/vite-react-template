import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/color.stylex'
import { unit } from '#/styles/core/size.stylex'

// ---------------------------------------------------------------------------
// Color styles
// ---------------------------------------------------------------------------

const colorStyles = stylex.create({
  'neutral-faded': {
    '--separator-color': colors.borderNeutralFaded
  },
  neutral: {
    '--separator-color': colors.borderNeutral
  }
})

// ---------------------------------------------------------------------------
// Orientation styles
// ---------------------------------------------------------------------------

const orientation = stylex.create({
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: unit.x2,
    width: '100%',
    verticalAlign: 'top',
    '::before': {
      content: '',
      flexGrow: 1,
      height: 1,
      backgroundColor: 'var(--separator-color)'
    },
    '::after': {
      content: '',
      flexGrow: 1,
      height: 1,
      backgroundColor: 'var(--separator-color)'
    }
  },
  vertical: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: unit.x2,
    minHeight: '100%',
    width: 'auto',
    verticalAlign: 'top',
    '::before': {
      content: '',
      flexGrow: 1,
      width: 1,
      height: 'auto',
      backgroundColor: 'var(--separator-color)'
    },
    '::after': {
      content: '',
      flexGrow: 1,
      width: 1,
      height: 'auto',
      backgroundColor: 'var(--separator-color)'
    }
  }
})

// ---------------------------------------------------------------------------
// Content position
// ---------------------------------------------------------------------------

const contentPosition = stylex.create({
  center: {},
  start: {
    '::before': { content: 'none' },
    '::after': { content: '' }
  },
  end: {
    '::before': { content: '' },
    '::after': { content: 'none' }
  }
})

// ---------------------------------------------------------------------------
// Blank (no space, for borders in Tabs)
// ---------------------------------------------------------------------------

const blank = stylex.create({
  root: {
    position: 'relative',
    marginTop: -1
  },
  vertical: {
    marginTop: 0,
    marginInlineStart: -1
  }
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const separatorStyles = {
  colorStyles,
  orientation,
  contentPosition,
  blank
} as const
