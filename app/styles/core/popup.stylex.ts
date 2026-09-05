import * as stylex from '@stylexjs/stylex'
import { unit, zIndex } from './tokens.stylex'
import { duration, easing } from './tokens.stylex'

/**
 * Shared anchored-popup recipe for Base UI Positioner/Popup pairs.
 * Used by: tooltip, popover, select, menus, autocomplete, combobox, preview-card.
 *
 * Compose shared styles BEFORE the component's own popup style so local
 * values always win:
 *
 *   {...stylex.props(popupFx.shift, popupFx.fade, popupFx.pose, s.popup, ring({ ... }))}
 *
 * On the Positioner element use only `positioner`. Components with custom
 * motion (dialog, drawer, sheet, toast, navigation-menu) keep their own
 * transitions instead of `pose`/`fade`.
 *
 * `shift` carries the anchor-nudge custom properties: no `default` value for
 * conditional custom properties — StyleX emits the default rule unlayered
 * (beating the layered [data-*] rules); the `var()` fallback inside `pose`
 * covers the unset case instead.
 */
export const popupFx = stylex.create({
  /** Base UI `Positioner` reset: kill focus outline, sit above page content. */
  positioner: {
    outline: 'none',
    zIndex: zIndex.absolute
  },
  /** Closed-pose nudge direction from Base UI's `data-side` attribute. */
  shift: {
    '--popup-shift-x': {
      default: null,
      '[data-side="left"]': unit.x2,
      '[data-side="right"]': `calc(-1 * ${unit.x2})`,
      '[data-side="inline-start"]': unit.x2,
      '[data-side="inline-end"]': `calc(-1 * ${unit.x2})`
    },
    '--popup-shift-y': {
      default: null,
      '[data-side="top"]': unit.x2,
      '[data-side="bottom"]': `calc(-1 * ${unit.x2})`
    }
  },
  /** Animation plumbing shared by every anchored popup: transform origin and
   * the opacity/transform transition (disabled motion reduces it to opacity). */
  fade: {
    transformOrigin: 'var(--transform-origin)',
    transitionDuration: duration.fast,
    transitionProperty: {
      default: 'opacity, transform',
      '@media (prefers-reduced-motion: reduce)': 'opacity'
    },
    transitionTimingFunction: easing.decelerate
  },
  /** Closed pose: faded state handled by the popup's own `opacity`, the
   * shrink + nudge rides the `--popup-shift-*` custom properties. */
  pose: {
    transform: {
      default: 'scale(1)',
      '[data-starting-style]':
        'translate(var(--popup-shift-x, 0px), var(--popup-shift-y, 0px)) scale(0.97)',
      '[data-ending-style]':
        'translate(var(--popup-shift-x, 0px), var(--popup-shift-y, 0px)) scale(0.97)'
    }
  }
})
