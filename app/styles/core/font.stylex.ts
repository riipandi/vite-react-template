import * as stylex from '@stylexjs/stylex'

export const fontFamilyVar = stylex.defineVars({
  headline: '"Mona Sans Variable", system-ui, -apple-system, Roboto, Aptos, Helvetica, sans-serif',
  title: '"Mona Sans Variable", system-ui, -apple-system, Roboto, Aptos, Helvetica, sans-serif',
  body: '"Mona Sans Variable", system-ui, -apple-system, Roboto, Aptos, Helvetica, sans-serif',
  monospace: '"JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
})

export const fontWeightVar = stylex.defineVars({
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
})

export const fontFamily = stylex.defineVars({
  headline1: fontFamilyVar.headline,
  headline2: fontFamilyVar.headline,
  headline3: fontFamilyVar.headline,
  featured1: fontFamilyVar.title,
  featured2: fontFamilyVar.title,
  featured3: fontFamilyVar.title,
  featured4: fontFamilyVar.title,
  featured5: fontFamilyVar.title,
  featured6: fontFamilyVar.title,
  body1: fontFamilyVar.body,
  body2: fontFamilyVar.body,
  caption1: fontFamilyVar.body,
  caption2: fontFamilyVar.body
})

export const fontWeight = stylex.defineVars({
  headline1: fontWeightVar.bold,
  headline2: fontWeightVar.bold,
  headline3: fontWeightVar.bold,
  featured1: fontWeightVar.semibold,
  featured2: fontWeightVar.semibold,
  featured3: fontWeightVar.semibold,
  featured4: fontWeightVar.semibold,
  featured5: fontWeightVar.semibold,
  featured6: fontWeightVar.semibold,
  body1: fontWeightVar.regular,
  body2: fontWeightVar.regular,
  caption1: fontWeightVar.regular,
  caption2: fontWeightVar.regular
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
