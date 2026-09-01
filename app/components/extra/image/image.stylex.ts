import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/color.stylex'
import { radius } from '#/styles/core/size.stylex'

// ---------------------------------------------------------------------------
// Root styles (only used when outline is enabled)
// ---------------------------------------------------------------------------

const root = stylex.create({
  root: {
    position: 'relative',
    '& img': {
      height: '100%',
      width: '100%',
      borderRadius: 'inherit'
    }
  }
})

// ---------------------------------------------------------------------------
// Image styles
// ---------------------------------------------------------------------------

const image = stylex.create({
  root: {
    maxWidth: '100%',
    display: 'block'
  },
  'display-mode-cover': {
    objectFit: 'cover'
  },
  'display-mode-contain': {
    objectFit: 'scale-down'
  }
})

// ---------------------------------------------------------------------------
// Border radius
// ---------------------------------------------------------------------------

const borderRadius = stylex.create({
  none: { borderRadius: radius.none },
  small: { borderRadius: radius.small },
  medium: { borderRadius: radius.medium },
  large: { borderRadius: radius.large },
  circular: { borderRadius: radius.circular }
})

// ---------------------------------------------------------------------------
// Outline (semi-transparent border for contrast)
// ---------------------------------------------------------------------------

const outline = stylex.create({
  root: {
    '&::after': {
      content: '',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      pointerEvents: 'none',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colors.borderNeutralFaded
    }
  }
})

// ---------------------------------------------------------------------------
// Fallback
// ---------------------------------------------------------------------------

const fallback = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundNeutralFaded,
    color: colors.foregroundDisabled
  }
})

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const imageStyles = {
  root,
  image,
  borderRadius,
  outline,
  fallback
} as const
