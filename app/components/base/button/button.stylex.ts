import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { colorVar, radiusVar } from '#/styles/core/tokens.stylex'

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'

export const buttonStyles = stylex.create({
  base: {
    alignItems: 'center',
    borderRadius: radiusVar.md,
    borderStyle: 'solid',
    borderWidth: 0,
    cursor: { ':disabled': 'not-allowed', default: 'pointer' },
    display: 'inline-flex',
    flexShrink: 0,
    fontSize: '0.875rem',
    fontWeight: 500,
    gap: '0.5rem',
    justifyContent: 'center',
    opacity: { ':disabled': 0.5, default: 1 },
    outline: 'none',
    pointerEvents: { ':disabled': 'none', default: null },
    transition:
      'color 0.15s, background-color 0.15s, box-shadow 0.15s, border-color 0.15s, transform 0.15s',
    whiteSpace: 'nowrap'
  },
  default: {
    backgroundColor: {
      ':hover': 'oklch(0.45 0.22 250)',
      default: colorVar.bgPrimary
    },
    boxShadow: {
      ':hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      default: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
    },
    color: colorVar.onPrimary,
    transform: { ':active': 'scale(0.98)', default: 'none' }
  },
  destructive: {
    backgroundColor: {
      ':hover': 'oklch(0.55 0.25 25)',
      default: colorVar.bgCritical
    },
    boxShadow: {
      ':hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      default: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
    },
    color: colorVar.onBgCritical,
    transform: { ':active': 'scale(0.98)', default: 'none' }
  },
  focusable: {
    boxShadow: {
      ':focus-visible': `0 0 0 3px ${colorVar.borderPrimaryFaded}`,
      default: null
    }
  },
  ghost: {
    backgroundColor: { ':hover': colorVar.bgNeutralFaded, default: 'transparent' },
    color: { ':hover': colorVar.fgNeutral, default: colorVar.fgNeutral },
    transform: { ':active': 'scale(0.98)', default: 'none' }
  },
  link: {
    backgroundColor: 'transparent',
    color: colorVar.fgPrimary,
    textDecorationLine: { ':hover': 'underline', default: 'none' },
    textUnderlineOffset: '4px'
  },
  outline: {
    backgroundColor: {
      ':hover': colorVar.bgNeutralFaded,
      default: 'transparent'
    },
    borderColor: {
      ':hover': colorVar.borderPrimary,
      default: colorVar.borderNeutral
    },
    borderWidth: '1px',
    boxShadow: {
      ':hover': '0 2px 4px -1px rgb(0 0 0 / 0.1)',
      default: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
    },
    color: { ':hover': colorVar.fgPrimary, default: colorVar.fgNeutral },
    transform: { ':active': 'scale(0.98)', default: 'none' }
  },
  secondary: {
    backgroundColor: {
      ':hover': 'oklch(0.85 0.02 265)',
      default: colorVar.bgNeutral
    },
    boxShadow: {
      ':hover': '0 2px 4px -1px rgb(0 0 0 / 0.1)',
      default: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
    },
    color: colorVar.fgNeutral,
    transform: { ':active': 'scale(0.98)', default: 'none' }
  },
  sizeDefault: { height: '2.25rem', paddingInline: '1rem' },
  sizeIcon: {
    height: '2.25rem',
    paddingInline: 0,
    width: '2.25rem'
  },
  sizeIconLg: {
    height: '2.5rem',
    paddingInline: 0,
    width: '2.5rem'
  },
  sizeIconSm: {
    height: '2rem',
    paddingInline: 0,
    width: '2rem'
  },
  sizeLg: { height: '2.5rem', paddingInline: '2rem' },
  sizeSm: {
    height: '2rem',
    paddingInline: '0.75rem'
  }
})

export const buttonVariantStyles: Record<ButtonVariant, StyleXStyles> = {
  default: buttonStyles.default,
  destructive: buttonStyles.destructive,
  ghost: buttonStyles.ghost,
  link: buttonStyles.link,
  outline: buttonStyles.outline,
  secondary: buttonStyles.secondary
}

export const buttonSizeStyles: Record<ButtonSize, StyleXStyles> = {
  default: buttonStyles.sizeDefault,
  icon: buttonStyles.sizeIcon,
  'icon-lg': buttonStyles.sizeIconLg,
  'icon-sm': buttonStyles.sizeIconSm,
  lg: buttonStyles.sizeLg,
  sm: buttonStyles.sizeSm
}
