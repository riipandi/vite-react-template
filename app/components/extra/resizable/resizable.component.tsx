import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Group as GroupPrimitive, Panel as PanelPrimitive } from 'react-resizable-panels'
import { Separator as SeparatorPrimitive } from 'react-resizable-panels'
import { resizableStyles as s } from './resizable.stylex'

type Orientation = 'horizontal' | 'vertical'
type HandleVariant = 'pill' | 'spring' | 'capsule'

const OrientationContext = React.createContext<Orientation>('horizontal')

const indicatorByVariant: Record<
  HandleVariant,
  { horizontal: stylex.StyleXStyles; vertical: stylex.StyleXStyles }
> = {
  pill: { horizontal: s.pillHorizontalGroup, vertical: s.pillVerticalGroup },
  spring: { horizontal: s.springHorizontalGroup, vertical: s.springVerticalGroup },
  capsule: { horizontal: s.capsuleHorizontalGroup, vertical: s.capsuleVerticalGroup }
}

interface StyleProp {
  style?: stylex.StyleXStyles
}

/**
 * Groups resizable panels. `orientation` is the panel flow direction:
 * - "horizontal" → panels laid out in a row; the handle bar is vertical
 * - "vertical" → panels stacked in a column; the handle bar is horizontal
 *
 * Persistence is available via `useDefaultLayout` from `react-resizable-panels`.
 */
export function ResizablePanelGroup({
  orientation = 'horizontal',
  style,
  ...props
}: Omit<React.ComponentProps<typeof GroupPrimitive>, 'className' | 'style'> & StyleProp) {
  return (
    <OrientationContext.Provider value={orientation}>
      <GroupPrimitive {...props} orientation={orientation} {...stylex.props(s.group, style)} />
    </OrientationContext.Provider>
  )
}

/**
 * A resizable panel. Styles are applied to an inner element, so they never
 * interfere with the flex layout managed by the parent group. Content that
 * exceeds the panel size is clipped by default; pass `overflow` via the style
 * prop to opt into scrolling.
 */
export function ResizablePanel({
  style,
  ...props
}: Omit<React.ComponentProps<typeof PanelPrimitive>, 'className' | 'style'> & StyleProp) {
  return <PanelPrimitive {...props} {...stylex.props(s.panel, style)} />
}

export function ResizableHandle({
  children,
  variant = 'pill',
  withHandle = false,
  style,
  ...props
}: Omit<React.ComponentProps<typeof SeparatorPrimitive>, 'className' | 'style'> &
  StyleProp & { variant?: HandleVariant; withHandle?: boolean }) {
  const orientation = React.useContext(OrientationContext)
  const isVertical = orientation === 'vertical'
  const indicatorStyle = indicatorByVariant[variant][isVertical ? 'vertical' : 'horizontal']

  return (
    <SeparatorPrimitive
      {...props}
      {...stylex.props(
        stylex.defaultMarker(),
        s.handle,
        isVertical && s.handleVerticalGroup,
        variant === 'capsule' && s.handleCapsule,
        style
      )}
    >
      <div
        aria-hidden='true'
        {...stylex.props(
          s.handleHitArea,
          isVertical ? s.handleHitAreaVerticalGroup : s.handleHitAreaHorizontalGroup
        )}
      />
      {children}
      {withHandle && <div {...stylex.props(s.handleIndicator, indicatorStyle)} />}
    </SeparatorPrimitive>
  )
}
