import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { StatusBadge } from '#/components/extra/status-badge'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Extended/StatusBadge',
  component: StatusBadge,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'stroke']
    },
    status: {
      control: 'select',
      options: ['success', 'warning', 'failed', 'disabled', 'info']
    },
    doted: { control: 'boolean' }
  },
  tags: []
} satisfies Meta<typeof StatusBadge>

export default meta
type Story = StoryObj<typeof meta>

const statuses = ['success', 'warning', 'failed', 'disabled', 'info'] as const
const variants = ['light', 'stroke'] as const

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[4] },
  row: { display: 'flex', alignItems: 'center', gap: space[2] },
  rowLabel: { minWidth: '6rem' }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='status-badge-row'>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='status-badge-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: { variant: 'light', status: 'success', doted: false, children: 'Active' },
  render: (args) => <StatusBadge id='status-badge-playground' {...args} />
}

export const VariantShowcase: Story = {
  name: 'Variants',
  args: { status: 'success' } as never,
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {variants.map((v) => (
        <Row key={v} label={v}>
          {statuses.map((s) => (
            <StatusBadge key={s} variant={v} status={s} id={`status-badge-var-${v}-${s}`}>
              {s}
            </StatusBadge>
          ))}
        </Row>
      ))}
    </Grid>
  )
}

export const StatusShowcase: Story = {
  name: 'Statuses',
  args: { status: 'success' } as never,
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {statuses.map((s) => (
        <Row key={s} label={s}>
          <StatusBadge status={s} id={`status-badge-status-${s}`}>
            {s}
          </StatusBadge>
        </Row>
      ))}
    </Grid>
  )
}

export const DotedShowcase: Story = {
  name: 'Doted',
  args: { status: 'success' } as never,
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {statuses.map((s) => (
        <Row key={s} label={s}>
          <StatusBadge status={s} doted id={`status-badge-doted-${s}`}>
            {s}
          </StatusBadge>
        </Row>
      ))}
    </Grid>
  )
}
