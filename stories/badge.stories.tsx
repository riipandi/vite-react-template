import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Badge } from '#/components/extra/badge'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Extended/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    mode: {
      control: 'select',
      options: ['filled', 'light', 'lighter', 'stroke']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    shape: {
      control: 'select',
      options: ['rounded', 'smoothed']
    },
    variant: {
      control: 'select',
      options: ['primary']
    },
    doted: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  tags: [],
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['28rem'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

const modes = ['filled', 'light', 'lighter', 'stroke'] as const
const sizes = ['sm', 'md', 'lg'] as const
const shapes = ['rounded', 'smoothed'] as const

const layoutStyles = stylex.create({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4]
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: space[2]
  },
  rowLabel: {
    minWidth: '5rem'
  }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)}>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)}>{children}</div>
)

export const Playground: Story = {
  args: { mode: 'lighter', size: 'md', children: 'Badge' },
  render: (args) => (
    <Badge
      id='badge-playground'
      mode={args.mode}
      size={args.size}
      shape={args.shape}
      variant={args.variant}
      doted={args.doted}
      disabled={args.disabled}
    >
      {args.children}
    </Badge>
  )
}

export const ModeShowcase: Story = {
  name: 'Modes',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {modes.map((m) => (
        <Row key={m} label={m}>
          <Badge id={`badge-mode-${m}`} mode={m} size='md'>
            Badge
          </Badge>
        </Row>
      ))}
    </Grid>
  )
}

export const SizeShowcase: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sizes.map((s) => (
        <Row key={s} label={s}>
          <Badge id={`badge-size-${s}`} mode='filled' size={s}>
            Badge
          </Badge>
          <Badge id={`badge-size-${s}-light`} mode='light' size={s}>
            Badge
          </Badge>
        </Row>
      ))}
    </Grid>
  )
}

export const ShapeShowcase: Story = {
  name: 'Shapes',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {shapes.map((sh) => (
        <Row key={sh} label={sh}>
          {modes.map((m) => (
            <Badge key={m} id={`badge-shape-${sh}-${m}`} mode={m} shape={sh}>
              Badge
            </Badge>
          ))}
        </Row>
      ))}
    </Grid>
  )
}
