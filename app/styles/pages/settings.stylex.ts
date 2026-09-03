import * as stylex from '@stylexjs/stylex'
import { unit } from '#/styles/core/tokens.stylex'

/**
 * Settings-only layout bits; everything else comes from shared components
 * (Card, Field, Input, Alert, Badge, Text, ThemeSwitcher).
 */
export const styles = stylex.create({
  profileRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: unit.x5
  },
  grow: {
    flexGrow: 1,
    minWidth: '12rem'
  },
  appearanceRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1
  },
  dangerRow: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: unit.x4,
    justifyContent: 'space-between'
  },
  dangerCopy: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1
  }
})
