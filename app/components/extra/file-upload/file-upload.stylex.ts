import * as stylex from '@stylexjs/stylex'
import { colors, shadow } from '#/styles/core/colors.stylex'
import {
  unit,
  radius,
  duration,
  easing,
  stroke,
  fontSize,
  fontFamily
} from '#/styles/core/tokens.stylex'

/**
 * Port of the Reshaped FileUpload: a form field for handling file
 * attachments, including drag-and-drop interaction.
 *
 * Layout notes:
 * - The root element only exists to receive drag events, so the actual
 *   clickable surface is a native `<label>` wrapping the (visually hidden)
 *   file input. Clicking anywhere on the layer opens the file picker and the
 *   input stays reachable by keyboard.
 * - `FileUploadTrigger` is `display: contents`, letting a nested link or
 *   button participate in text flow without breaking the label click.
 */
export const fileUploadStyles = stylex.create({
  root: {
    display: 'block',
    borderRadius: radius.large,
    ':focus-within': {
      boxShadow: shadow.outline
    }
  },
  inline: {
    display: 'inline-block',
    verticalAlign: 'top',
    borderRadius: radius.medium,
    ':focus-within': {
      boxShadow: 'none'
    }
  },
  layer: {
    alignItems: 'center',
    borderRadius: radius.large,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2,
    height: '100%',
    justifyContent: 'center',
    padding: unit.x6,
    textAlign: 'center',
    transitionDuration: duration.fast,
    transitionProperty: 'background-color, border-color',
    transitionTimingFunction: easing.standard,
    width: '100%'
  },
  layerCompact: {
    borderRadius: radius.medium,
    ':focus-within': {
      boxShadow: shadow.outline
    }
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.borderNeutral,
    borderStyle: 'dashed',
    borderWidth: stroke.ring1,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: colors.backgroundNeutralHighlightedFaded
    }
  },
  highlighted: {
    backgroundColor: colors.backgroundPrimaryHighlightedFaded,
    borderColor: colors.borderPrimary
  },
  headless: {
    cursor: 'default'
  },
  disabled: {
    borderColor: colors.borderDisabled,
    cursor: 'not-allowed',
    opacity: 0.5,
    ':hover': {
      backgroundColor: 'transparent'
    }
  },
  trigger: {
    display: 'contents'
  },
  content: {
    alignItems: 'center',
    color: colors.foregroundNeutral,
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    gap: unit.x2,
    justifyContent: 'center'
  },
  input: {
    // Visually hidden, still focusable and readable by screen readers.
    border: 0,
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1
  }
})
