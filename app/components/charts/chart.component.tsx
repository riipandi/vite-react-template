/**
 * Shadcn-style chart primitives built on TanStack Charts and StyleX.
 *
 * Anatomy (mirrors the shadcn chart pattern):
 * <ChartContainer config={chartConfig}>
 *   <Chart definition={chartDefinition} ariaLabel='Visitors' height={260} />
 *   <ChartLegend />
 * </ChartContainer>
 *
 * The `definition` is a plain TanStack `defineChart()` value; series keys in
 * the `config` map to mark `id`s so tooltips and legends can resolve labels
 * and colors. Mark colors must be concrete color strings — TanStack paints
 * them as SVG presentation attributes, which do not resolve CSS variables.
 *
 * SSR and multi-chart hygiene: keep `initialWidth` stable across server and
 * client, and give every chart in the same document an explicit `idPrefix` so
 * gradient and clip IDs cannot collide.
 *
 * @see: https://tanstack.com/charts/latest/docs/framework/react/adapter
 * @see: https://tanstack.com/charts/catalog/collections/shadcn
 * @see: https://ui.shadcn.com/docs/components/base/chart
 */

import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as stylex from '@stylexjs/stylex'
import type { ChartValue } from '@tanstack/charts'
import { motion } from '@tanstack/charts/motion'
import {
  RendererChart as TanStackChart,
  type ChartTooltipBodyRenderContext,
  type RendererChartProps as TanStackRendererChartProps
} from '@tanstack/charts/react/tooltip'
import * as React from 'react'
import { chartStyles as s } from './chart.stylex'

export interface ChartConfigItem {
  label?: React.ReactNode
  color?: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

/** Maps mark `id`s (or series keys) to presentation metadata. */
export type ChartConfig = Record<string, ChartConfigItem>

// Motion timing mirrors the core motion tokens — `duration.medium` ('200ms')
// and `easing.decelerate` ('cubic-bezier(0, 0, 0.2, 1)', approximated by the
// 'ease-out' preset) — because the motion driver needs plain numbers. The
// driver respects `prefers-reduced-motion` by default, matching how the
// popup recipe reduces its transitions to opacity. `resize: true` animates
// container resizes instead of snapping. Module scope keeps the renderer
// identity stable across renders (the motion renderer relies on stable keys
// for DOM identity and spring velocity).
const chartMotionRenderer = motion({
  initial: true,
  resize: true,
  transition: { type: 'tween', duration: 200, easing: 'ease-out' }
})

const ChartContext = React.createContext<ChartConfig | null>(null)

/** Resolves the nearest `ChartContainer` config. Throws outside a container. */
export function useChartConfig(): ChartConfig {
  const config = React.useContext(ChartContext)
  if (!config) {
    throw new Error('Chart components must be used within a ChartContainer')
  }
  return config
}

export interface ChartContainerProps extends Omit<
  useRender.ComponentProps<'div'>,
  'className' | 'style'
> {
  config: ChartConfig
  style?: stylex.StyleXStyles
}

export function ChartContainer({ config, style, render, ...props }: ChartContainerProps) {
  return (
    <ChartContext.Provider value={config}>
      {useRender({
        defaultTagName: 'div',
        props: mergeProps<'div'>(stylex.props(s.root, style), props),
        render
      })}
    </ChartContext.Provider>
  )
}

interface ChartOwnProps<TDatum, TXValue extends ChartValue, TYValue extends ChartValue> {
  config?: ChartConfig
  style?: stylex.StyleXStyles
  renderTooltipBody?: (
    context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue>
  ) => React.ReactNode
}

export type ChartProps<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue
> = Omit<
  TanStackRendererChartProps<TDatum, TXValue, TYValue>,
  'renderTooltipBody' | 'style' | 'renderer'
> &
  ChartOwnProps<TDatum, TXValue, TYValue>

export function Chart<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue
>({ config, style, renderTooltipBody, ...props }: ChartProps<TDatum, TXValue, TYValue>) {
  const contextConfig = React.useContext(ChartContext)
  const activeConfig = config ?? contextConfig

  // Rich tooltip bodies stay opt-in via `renderTooltipBody`; the default is
  // the native body (title, per-series rows with swatches, locale formatting)
  // themed through the `--ts-chart-tooltip-*` variables on the host class.
  const chart = (
    <TanStackChart
      {...props}
      renderer={chartMotionRenderer}
      renderTooltipBody={renderTooltipBody}
      className={
        [props.className, stylex.props(s.chart, style).className].filter(Boolean).join(' ') ||
        undefined
      }
      style={stylex.props(s.chart, style).style}
    />
  )

  return activeConfig ? (
    <ChartContext.Provider value={activeConfig}>{chart}</ChartContext.Provider>
  ) : (
    chart
  )
}

export interface ChartLegendProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'className' | 'style'
> {
  config?: ChartConfig
  /** Config keys to skip, e.g. series hidden by an application toggle. */
  hide?: readonly string[]
  style?: stylex.StyleXStyles
}

/** Config-driven legend, rendered outside the chart surface. Returns null
 * when no config entry carries a color. No `useRender` here on purpose: the
 * component conditionally renders nothing, and hooks may not follow an early
 * return — the tooltip content swap happens through `renderTooltipBody`. */
export function ChartLegend({ config, hide, style, ...props }: ChartLegendProps) {
  const contextConfig = React.useContext(ChartContext)
  const activeConfig = config ?? contextConfig ?? {}

  const entries = Object.entries(activeConfig).filter(
    ([key, item]) => Boolean(item.color) && !hide?.includes(key)
  )
  if (entries.length === 0) {
    return null
  }

  return (
    <div {...mergeProps<'div'>(stylex.props(s.legend, style), props)}>
      {entries.map(([key, item]) => {
        const Icon = item.icon
        return (
          <div key={key} {...stylex.props(s.legendItem)}>
            {Icon ? (
              <Icon height={12} width={12} color={item.color} />
            ) : (
              <span
                {...stylex.props(s.legendSwatch)}
                style={{ '--swatch-color': item.color ?? 'currentColor' } as React.CSSProperties}
              />
            )}
            {item.label ?? key}
          </div>
        )
      })}
    </div>
  )
}
