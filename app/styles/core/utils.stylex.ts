import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { stroke } from '#/styles/core/tokens.stylex'

/**
 * `ring` — the Tailwind `ring-*` equivalent, defined once as a StyleX dynamic
 * style. Draws the edge as a box-shadow instead of a border and composes like
 * any style:
 *
 *   {...stylex.props(styles.popup, ring({ shadow: shadow.md }), style)}
 *   {...stylex.props(styles.card, ring({ width: stroke.ring2, color: colors.foregroundPrimary }))}
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
  /** Ring thickness. Default: `stroke.ring1` (1px). */
  width?: string
  /** Ring color. Default: `colors.borderNeutralFaded`. */
  color?: string
  /** Extra drop shadow layered under the ring (e.g. `shadow.md`). Default: none. */
  shadow?: string | null
}

export const ring = ({
  width = stroke.ring1,
  color = colors.borderNeutralFaded,
  shadow: drop = null
}: RingOptions = {}) => recipes.boxShadow(`0 0 0 ${width} ${color}${drop ? `, ${drop}` : ''}`)

export const customClassName = (className: string | undefined) => {
  return className ? ({ [className]: className, $$css: true } as StyleXStyles) : null
}
