import * as stylex from '@stylexjs/stylex'
import { fontSizeVar, fontWeightVar, spaceVar, colorVar } from '#/styles/core/tokens.stylex'

export const styles = stylex.create({
  container: {
    display: 'block',
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    maxWidth: 'none',
    paddingTop: spaceVar[6],
    paddingBottom: spaceVar[6],
    paddingLeft: spaceVar[4],
    paddingRight: spaceVar[4],
    '@media (min-width: 640px)': {
      paddingTop: spaceVar[8],
      paddingBottom: spaceVar[8],
      paddingLeft: spaceVar[6],
      paddingRight: spaceVar[6]
    },
    '@media (min-width: 1024px)': {
      paddingTop: spaceVar[10],
      paddingBottom: spaceVar[10],
      paddingLeft: spaceVar[10],
      paddingRight: spaceVar[10]
    }
  },
  pageHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spaceVar[10],
    gap: spaceVar[4]
  },
  headerLeft: { display: 'flex', flexDirection: 'column', gap: spaceVar[1] },
  pageLabel: {
    fontSize: fontSizeVar.xs,
    fontWeight: fontWeightVar.semibold,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: colorVar.fgPrimary
  },
  pageTitle: {
    fontSize: fontSizeVar['2xl'],
    fontWeight: fontWeightVar.bold,
    color: colorVar.fgNeutral,
    lineHeight: '1.2'
  },
  pageSubtitle: {
    fontSize: fontSizeVar.sm,
    color: colorVar.fgNeutralFaded,
    marginTop: spaceVar[1]
  }
})
