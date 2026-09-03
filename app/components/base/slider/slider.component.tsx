import { Slider as BaseSlider } from '@base-ui/react/slider'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { space, duration, stroke, container } from '#/lib/constants.stylex'
import { colors, radius } from '#/lib/tokens.stylex'

export interface SliderProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseSlider.Root>,
  'className' | 'style'
> {
  /** StyleX styles merged last — always win over the component's own. */
  style?: stylex.StyleXStyles
}

export function Slider({
  style,
  defaultValue,
  value,
  min = 0,
  max = 100,
  orientation = 'horizontal',
  ...props
}: SliderProps) {
  const values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <BaseSlider.Root
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      orientation={orientation}
      thumbAlignment='edge'
      {...props}
      {...stylex.props(rootOrientations[orientation], style)}
    >
      <BaseSlider.Control {...stylex.props(styles.control, controlOrientations[orientation])}>
        <BaseSlider.Track {...stylex.props(styles.track, trackOrientations[orientation])}>
          <BaseSlider.Indicator {...stylex.props(styles.range, rangeOrientations[orientation])} />
        </BaseSlider.Track>
        {Array.from({ length: values.length }, (_, index) => (
          <BaseSlider.Thumb key={index} {...stylex.props(styles.thumb)} />
        ))}
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}

const haloShadow = `0 0 0 ${stroke.halo} color-mix(in srgb, ${colors.ring} 50%, transparent)`

const styles = stylex.create({
  control: {
    opacity: { default: 1, '[data-disabled]': 0.5 },
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
    touchAction: 'none',
    userSelect: 'none'
  },
  controlDisabled: {
    opacity: 0.5,
    pointerEvents: 'none'
  },
  track: {
    backgroundColor: colors.muted,
    borderRadius: radius.full,
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    userSelect: 'none'
  },
  range: {
    backgroundColor: colors.primary,
    userSelect: 'none'
  },
  thumb: {
    backgroundColor: colors.background,
    borderColor: colors.ring,
    borderRadius: radius.full,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    boxShadow: {
      default: 'none',
      ':hover': haloShadow,
      ':focus-visible': haloShadow,
      ':active': haloShadow
    },
    flexShrink: 0,
    height: space.s3,
    outline: 'none',
    position: 'relative',
    transitionDuration: duration.fast,
    transitionProperty: 'box-shadow',
    userSelect: 'none',
    width: space.s3
  }
})

const rootOrientations = stylex.create({
  horizontal: {
    width: '100%'
  },
  vertical: {
    height: '100%',
    minHeight: container.xs
  }
})

const controlOrientations = stylex.create({
  horizontal: {
    width: '100%'
  },
  vertical: {
    flexDirection: 'column',
    height: '100%',
    minHeight: container.xs
  }
})

const trackOrientations = stylex.create({
  horizontal: {
    height: space.s1,
    width: '100%'
  },
  vertical: {
    height: '100%',
    width: space.s1
  }
})

const rangeOrientations = stylex.create({
  horizontal: {
    height: '100%'
  },
  vertical: {
    width: '100%'
  }
})
