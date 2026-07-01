import * as stylex from '@stylexjs/stylex'
import { colorVar, fontSizeVar } from '#/styles/tokens.stylex'

export const linkStyles = stylex.create({
  base: {
    fontWeight: 'normal',
    textDecoration: 'none',
    // ans: `textUnderlineOffset` not supported in StyleX 0.19
    transitionProperty: 'all',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    outlineStyle: 'none',
    ':disabled': {
      // ans: `pointerEvents: 'none'` not supported in StyleX 0.19
      opacity: 0.5
    },
    ':focus-visible': {
      outlineColor: colorVar.borderPrimary,
      borderRadius: '2px',
      outlineWidth: '2px',
      outlineStyle: 'solid'
    }
  },
  icon: {
    marginLeft: '0.5rem',
    display: 'inline-flex',
    flexShrink: 0
    // ans: `verticalAlign: 'middle'` not supported in StyleX 0.19 — use flexbox parent
  }
})

export const linkVariants = stylex.create({
  default: {
    color: colorVar.fgNeutral,
    ':hover': {
      color: colorVar.fgPrimary
    }
  },
  muted: {
    color: colorVar.fgNeutralFaded,
    ':hover': {
      color: colorVar.fgNeutral
    }
  },
  primary: {
    color: colorVar.fgPrimary,
    ':hover': {
      opacity: 0.8
    }
  },
  secondary: {
    color: colorVar.fgNeutral,
    ':hover': {
      opacity: 0.8
    }
  },
  danger: {
    color: colorVar.fgCritical,
    ':hover': {
      opacity: 0.8
    }
  }
})

export const linkSizes = stylex.create({
  sm: {
    fontSize: fontSizeVar.xs
  },
  md: {
    fontSize: fontSizeVar.sm
  },
  lg: {
    fontSize: fontSizeVar.md
  }
})

export const linkUnderlines = stylex.create({
  none: {},
  hover: {
    ':hover': {
      textDecoration: 'underline'
    }
  },
  always: {
    textDecoration: 'underline'
  }
})
