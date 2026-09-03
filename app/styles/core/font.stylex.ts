import * as stylex from '@stylexjs/stylex'

export const fontFamily = stylex.defineVars({
  headline: '"Mona Sans Variable", system-ui, -apple-system, Roboto, Aptos, Helvetica, sans-serif',
  title: '"Mona Sans Variable", system-ui, -apple-system, Roboto, Aptos, Helvetica, sans-serif',
  body: '"Mona Sans Variable", system-ui, -apple-system, Roboto, Aptos, Helvetica, sans-serif',
  monospace: '"JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
})

export const fontWeight = stylex.defineConsts({
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
})

export const fontFamilyVar = stylex.defineVars({
  headline1: fontFamily.headline,
  headline2: fontFamily.headline,
  headline3: fontFamily.headline,
  featured1: fontFamily.title,
  featured2: fontFamily.title,
  featured3: fontFamily.title,
  featured4: fontFamily.title,
  featured5: fontFamily.title,
  featured6: fontFamily.title,
  body1: fontFamily.body,
  body2: fontFamily.body,
  caption1: fontFamily.body,
  caption2: fontFamily.body
})

export const fontWeightVar = stylex.defineVars({
  headline1: fontWeight.bold,
  headline2: fontWeight.bold,
  headline3: fontWeight.bold,
  featured1: fontWeight.semibold,
  featured2: fontWeight.semibold,
  featured3: fontWeight.semibold,
  featured4: fontWeight.semibold,
  featured5: fontWeight.semibold,
  featured6: fontWeight.semibold,
  body1: fontWeight.regular,
  body2: fontWeight.regular,
  caption1: fontWeight.regular,
  caption2: fontWeight.regular
})

export const fontSize = stylex.defineVars({
  headline1: '5rem',
  headline2: '4rem',
  headline3: '3rem',
  featured1: '2.5rem',
  featured2: '2rem',
  featured3: '1.75rem',
  featured4: '1.5rem',
  featured5: '1.25rem',
  featured6: '1.125rem',
  body1: '1rem',
  body2: '0.875rem',
  caption1: '0.75rem',
  caption2: '0.625rem'
})

export const fontLineHeight = stylex.defineVars({
  headline1: '5.25rem',
  headline2: '4.25rem',
  headline3: '3.25rem',
  featured1: '2.75rem',
  featured2: '2.25rem',
  featured3: '2rem',
  featured4: '2rem',
  featured5: '1.75rem',
  featured6: '1.5rem',
  body1: '1.5rem',
  body2: '1.25rem',
  caption1: '1rem',
  caption2: '0.75rem'
})

export const fontLetterSpacing = stylex.defineVars({
  headline1: 'normal',
  headline2: 'normal',
  headline3: 'normal',
  featured1: 'normal',
  featured2: 'normal',
  featured3: 'normal',
  featured4: 'normal',
  featured5: 'normal',
  featured6: 'normal',
  body1: 'normal',
  body2: 'normal',
  caption1: 'normal',
  caption2: 'normal'
})
