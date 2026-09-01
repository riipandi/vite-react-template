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
// Inset (inset from container bounds)
// ---------------------------------------------------------------------------

const inset = stylex.create({
  '0': {
    paddingInline: 0
  },
  '1': {
    paddingInline: unit.x1
  },
  '2': {
    paddingInline: unit.x2
  },
  '3': {
    paddingInline: unit.x3
  },
  '4': {
    paddingInline: unit.x4
  },
  '6': {
    paddingInline: unit.x6
  },
  '8': {
    paddingInline: unit.x8
  }
})

const insetVertical = stylex.create({
  '0': {
    paddingBlock: 0
  },
  '1': {
    paddingBlock: unit.x1
  },
  '2': {
    paddingBlock: unit.x2
  },
  '3': {
    paddingBlock: unit.x3
  },
  '4': {
    paddingBlock: unit.x4
  },
  '6': {
    paddingBlock: unit.x6
  },
  '8': {
    paddingBlock: unit.x8
  }
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const separatorStyles = {
  colorStyles,
  orientation,
  contentPosition,
  blank,
  inset,
  insetVertical
} as const
