import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { unit } from '#/styles/core/tokens.stylex'

export const styles = stylex.create({
  container: {
    display: 'block',
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    maxWidth: 'none',
    paddingTop: unit.x6,
    paddingBottom: unit.x6,
    paddingLeft: unit.x4,
    paddingRight: unit.x4,
    '@media (min-width: 640px)': {
      paddingTop: unit.x8,
      paddingBottom: unit.x8,
      paddingLeft: unit.x6,
      paddingRight: unit.x6
    },
    '@media (min-width: 1024px)': {
      paddingTop: unit.x10,
      paddingBottom: unit.x10,
      paddingLeft: unit.x10,
      paddingRight: unit.x10
    }
  },
  pageHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: unit.x10,
    gap: unit.x4
  },
  headerLeft: { display: 'flex', flexDirection: 'column', gap: unit.x1 },
  pageLabel: {
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.semibold,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: colors.foregroundPrimary
  },
  pageSubtitle: {
    fontSize: fontSize.body2,
    color: colors.foregroundNeutralFaded,
    marginTop: unit.x1
  }
})
