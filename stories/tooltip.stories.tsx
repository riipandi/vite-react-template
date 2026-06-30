import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Button } from '#/components/base/button'
import { Tooltip, TooltipTrigger, TooltipContent } from '#/components/base/tooltip'
import { space } from '#/styles/tokens.stylex'

interface ContentProps {
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

function Demo({
  side = 'top',
  sideOffset = 6,
  align = 'center',
  variant = 'dark',
  size = 'md',
  children
}: React.PropsWithChildren<ContentProps>) {
  return (
    <Tooltip>
      <TooltipTrigger id='tooltip-demo-trigger'>
        <Button variant='neutral' mode='filled' id='tooltip-demo-btn'>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        variant={variant}
        size={size}
        id='tooltip-demo-content'
      >
        Tooltip content
      </TooltipContent>
    </Tooltip>
  )
}

const meta = {
  title: 'Component/Tooltip',
  component: Demo,
  parameters: { layout: 'centered' },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left']
    },
    sideOffset: { control: { type: 'number', min: 0, max: 30 } },
    align: {
      control: 'select',
      options: ['start', 'center', 'end']
    },
    variant: {
      control: 'select',
      options: ['dark', 'light']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  },
  tags: []
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

const sides = ['top', 'right', 'bottom', 'left'] as const
const variants = ['dark', 'light'] as const
const sizes = ['sm', 'md', 'lg'] as const

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[6] },
  row: { display: 'flex', alignItems: 'center', gap: space[3] },
  rowLabel: { minWidth: '5rem' },
  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: space[8],
    width: '100%'
  }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='tooltip-row'>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='tooltip-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: {
    side: 'top',
    sideOffset: 6,
    align: 'center',
    variant: 'dark',
    size: 'md',
    children: 'Hover me'
  },
  render: (args) => <Demo {...args}>{args.children}</Demo>
}

export const SideShowcase: Story = {
  name: 'Sides',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.centered)} id='tooltip-sides-wrapper'>
      <Grid>
        {sides.map((s) => (
          <Row key={s} label={s}>
            <Tooltip>
              <TooltipTrigger id={`tooltip-side-${s}-trigger`}>
                <Button variant='neutral' mode='lighter' id={`tooltip-side-${s}-btn`}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              </TooltipTrigger>
              <TooltipContent side={s} id={`tooltip-side-${s}-content`}>
                Tooltip on {s}
              </TooltipContent>
            </Tooltip>
          </Row>
        ))}
      </Grid>
    </div>
  )
}

export const VariantShowcase: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.centered)} id='tooltip-variants-wrapper'>
      <Grid>
        {variants.map((v) => (
          <Row key={v} label={v}>
            <Tooltip>
              <TooltipTrigger id={`tooltip-variant-${v}-trigger`}>
                <Button
                  variant={v === 'light' ? 'primary' : 'neutral'}
                  mode='filled'
                  id={`tooltip-variant-${v}-btn`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </Button>
              </TooltipTrigger>
              <TooltipContent variant={v} id={`tooltip-variant-${v}-content`}>
                {v} tooltip style
              </TooltipContent>
            </Tooltip>
          </Row>
        ))}
      </Grid>
    </div>
  )
}

export const SizeShowcase: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.centered)} id='tooltip-sizes-wrapper'>
      <Grid>
        {sizes.map((s) => (
          <Row key={s} label={s}>
            <Tooltip>
              <TooltipTrigger id={`tooltip-size-${s}-trigger`}>
                <Button variant='neutral' mode='lighter' id={`tooltip-size-${s}-btn`}>
                  {s.toUpperCase()}
                </Button>
              </TooltipTrigger>
              <TooltipContent size={s} id={`tooltip-size-${s}-content`}>
                {s} size tooltip
              </TooltipContent>
            </Tooltip>
          </Row>
        ))}
      </Grid>
    </div>
  )
}
