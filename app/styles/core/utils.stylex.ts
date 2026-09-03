import * as stylex from '@stylexjs/stylex'
import { colors } from '#/lib/tokens.stylex'
import { stroke } from '#/styles/core/tokens.stylex'

/** Re-exported so component files only import from one place. */
export type StyleXStyles = stylex.StyleXStyles

/**
 * `ring` — the Tailwind `ring-*` equivalent, defined once as a StyleX dynamic
 * style. Draws the edge as a box-shadow instead of a border and composes like
 * any style:
 *
 *   {...stylex.props(styles.popup, ring({ shadow: shadow.md }), style)}
 *   {...stylex.props(styles.card, ring({ width: stroke.focus, color: colors.ring }))}
 *
 * Use it on popups instead of a border: Base UI's align-item-with-trigger
 * math ignores borders (a border shifts the aligned text by its width), and a
 * ring paints outside the box, overlapping the trigger's border for a single
 * crisp edge.
 */
const recipes = stylex.create({
  boxShadow: (value: string) => ({ boxShadow: value })
})

export interface RingOptions {
  /** Ring thickness. Default: `stroke.border` (1px). */
  width?: string
  /** Ring color. Default: `colors.border`. */
  color?: string
  /** Extra drop shadow layered under the ring (e.g. `shadow.md`). Default: none. */
  shadow?: string | null
}

export const ring = ({
  width = stroke.border,
  color = colors.border,
  shadow: drop = null
}: RingOptions = {}) => recipes.boxShadow(`0 0 0 ${width} ${color}${drop ? `, ${drop}` : ''}`)

// Base UI state styling needs no JS adapter: since StyleX 0.18, attribute
// selectors are valid condition keys, and Base UI mirrors every state as a
// data attribute — style it inline:
//
//   backgroundColor: { default: 'transparent', '[data-highlighted]': colors.accent }
