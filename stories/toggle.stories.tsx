import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import * as React from 'react'
import { fn } from 'storybook/test'
import { Toggle } from '#/components/base/toggle'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['ghost', 'primary']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    disabled: { control: 'boolean' }
  },
  tags: [],
  args: { onClick: fn() }
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

const variants = ['ghost', 'primary'] as const
const sizes = ['sm', 'md', 'lg'] as const

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[4] },
  row: { display: 'flex', alignItems: 'center', gap: space[2] },
  rowLabel: { minWidth: '5rem' }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='toggle-row'>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='toggle-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: { variant: 'primary', size: 'md', children: <Lucide.Bold size={16} strokeWidth={2} /> },
  render: (args) => (
    <Toggle id='toggle-playground' {...args}>
      {args.children}
    </Toggle>
  )
}

export const VariantShowcase: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {variants.map((v) => (
        <Row key={v} label={v}>
          {sizes.map((s) => (
            <Toggle key={s} variant={v} size={s} id={`toggle-variant-${v}-${s}`}>
              <Lucide.Bold size={s === 'sm' ? 14 : s === 'lg' ? 20 : 16} strokeWidth={2} />
            </Toggle>
          ))}
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
          {variants.map((v) => (
            <Toggle key={v} variant={v} size={s} id={`toggle-size-${s}-${v}`}>
              <Lucide.Italic size={s === 'sm' ? 14 : s === 'lg' ? 20 : 16} strokeWidth={2} />
            </Toggle>
          ))}
        </Row>
      ))}
    </Grid>
  )
}
