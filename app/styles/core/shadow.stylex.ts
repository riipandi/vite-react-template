import * as stylex from '@stylexjs/stylex'

const DARK = '@media (prefers-color-scheme: dark)'

const shadowLightVar = stylex.defineVars({
  outline: '0px 1px 2px -0.5px rgba(0, 0, 0, 0.06), 0px 2px 3px -1px rgba(0, 0, 0, 0.06)',
  'outline-intense': '0px 1px 2px -0.5px rgba(0, 0, 0, 0.12), 0px 2px 3px -1px rgba(0, 0, 0, 0.12)',
  raised: '0px 8px 12px -4px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
  'raised-intense': '0px 8px 12px -4px rgba(0, 0, 0, 0.16), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)',
  overlay:
    '0px 16px 24px -4px rgba(0, 0, 0, 0.06), 0px 8px 12px -4px rgba(0, 0, 0, 0.06), 0px 4px 6px -2px rgba(0, 0, 0, 0.06)',
  'overlay-intense':
    '0px 16px 24px -4px rgba(0, 0, 0, 0.12), 0px 8px 12px -4px rgba(0, 0, 0, 0.12), 0px 4px 6px -2px rgba(0, 0, 0, 0.12)'
})

const shadowDarkVar = stylex.defineVars({
  outline:
    '0px -1px 2px -0.5px rgba(255, 255, 255, 0.06), 0px -1px 3px -1px rgba(255, 255, 255, 0.05)',
  'outline-intense':
    '0px -1px 2px -0.5px rgba(255, 255, 255, 0.12), 0px -1px 3px -1px rgba(255, 255, 255, 0.1)',
  raised: '0px 8px 12px -4px rgba(0, 0, 0, 0.08), 0px -1.5px 2px -1px rgba(255, 255, 255, 0.1)',
  'raised-intense':
    '0px 8px 12px -4px rgba(0, 0, 0, 0.16), 0px -1.5px 2px -1px rgba(255, 255, 255, 0.2)',
  overlay:
    '0px 16px 24px -4px rgba(0, 0, 0, 0.06), 0px 8px 12px -4px rgba(0, 0, 0, 0.06), 0px 8px 6px -4px rgba(0, 0, 0, 0.06)',
  'overlay-intense':
    '0px 16px 24px -4px rgba(0, 0, 0, 0.12), 0px 8px 12px -4px rgba(0, 0, 0, 0.12), 0px 8px 6px -4px rgba(0, 0, 0, 0.12)'
})

export const shadow = stylex.defineVars({
  outline: {
    default: shadowLightVar['outline'],
    [DARK]: shadowDarkVar['outline']
  },
  'outline-intense': {
    default: shadowLightVar['outline-intense'],
    [DARK]: shadowDarkVar['outline-intense']
  },
  raised: {
    default: shadowLightVar['raised'],
    [DARK]: shadowDarkVar['raised']
  },
  'raised-intense': {
    default: shadowLightVar['raised-intense'],
    [DARK]: shadowDarkVar['raised-intense']
  },
  overlay: {
    default: shadowLightVar['overlay'],
    [DARK]: shadowDarkVar['overlay']
  },
  'overlay-intense': {
    default: shadowLightVar['overlay-intense'],
    [DARK]: shadowDarkVar['overlay-intense']
  }
})
