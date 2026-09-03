import * as stylex from '@stylexjs/stylex'
import { unit } from '#/styles/core/tokens.stylex'

// Mirror of `breakpoints` from `#/styles/core/tokens.stylex` (medium/large/
// xlarge). @stylexjs/babel-plugin 0.19 only inlines `defineConsts` media keys
// declared in the SAME file, so these cannot be imported cross-file yet —
// keep the values in sync.
export const breakpoints = stylex.defineConsts({
  medium: '@media (min-width: 660px) and (max-width: 899px)',
  large: '@media (min-width: 900px) and (max-width: 1279px)',
  xlarge: '@media (min-width: 1280px)'
})

/**
 * Shared shell for authenticated pages: page header (kicker + title +
 * description) and responsive containers. Typography comes from the `Text`
 * component; only layout lives here.
 */
export const pageStyles = stylex.create({
  container: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    paddingTop: unit.x6,
    paddingBottom: unit.x6,
    paddingLeft: unit.x4,
    paddingRight: unit.x4
  },
  containerPadMedium: {
    [breakpoints.medium]: {
      paddingTop: unit.x8,
      paddingBottom: unit.x8,
      paddingLeft: unit.x6,
      paddingRight: unit.x6
    }
  },
  containerPadLarge: {
    [breakpoints.large]: {
      paddingTop: unit.x10,
      paddingBottom: unit.x10,
      paddingLeft: unit.x10,
      paddingRight: unit.x10
    }
  },
  containerPadXLarge: {
    [breakpoints.xlarge]: {
      paddingTop: unit.x10,
      paddingBottom: unit.x10,
      paddingLeft: unit.x10,
      paddingRight: unit.x10
    }
  },
  header: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: unit.x4,
    justifyContent: 'space-between',
    marginBottom: unit.x8
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1
  },
  kicker: {
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x6
  },
  cardsGrid: {
    display: 'grid',
    gap: unit.x4
  },
  cardsGridMedium: {
    [breakpoints.medium]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }
  },
  cardsGridLarge: {
    [breakpoints.large]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }
  },
  cardsGridXLarge: {
    [breakpoints.xlarge]: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }
  },
  statLabel: {
    marginBottom: unit.x2
  },
  quickCard: {
    marginTop: unit.x4
  },
  quickTitle: {
    marginBottom: unit.x2
  }
})
