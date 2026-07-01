import * as stylex from '@stylexjs/stylex'
import { colorVar, radiusVar, fontSizeVar, fontWeightVar } from '#/styles/tokens.stylex'

export const avatarStyles = stylex.create({
  base: {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radiusVar.full,
    backgroundColor: colorVar.bgNeutralFaded,
    color: colorVar.fgNeutral,
    fontWeight: fontWeightVar.semibold,
    userSelect: 'none'
  },
  image: {
    width: '100%',
    height: '100%',
    // ans: objectFit not supported in StyleX 0.19
    borderRadius: radiusVar.full
  },
  fallback: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radiusVar.full
  },
  fallbackInitial: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radiusVar.full,
    fontSize: fontSizeVar.lg
  },
  indicator: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radiusVar.full
  }
})

export const avatarSizes = stylex.create({
  sm: { width: '1.875rem', height: '1.875rem' },
  md: { width: '2.625rem', height: '2.625rem' },
  lg: { width: '3.125rem', height: '3.125rem' }
})
