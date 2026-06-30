import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import * as React from 'react'
import { ToggleGroup, ToggleGroupItem } from '#/components/base/toggle-group'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/ToggleGroup',
  component: ToggleGroup,
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
    grouped: { control: 'boolean' }
  },
  tags: []
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

const variants = ['ghost', 'primary'] as const
const sizes = ['sm', 'md', 'lg'] as const

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[6] },
  row: { display: 'flex', alignItems: 'center', gap: space[2] },
  rowLabel: { minWidth: '5rem' }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='toggle-group-row'>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='toggle-group-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: { variant: 'primary', size: 'md', grouped: true },
  render: (args) => (
    <ToggleGroup id='toggle-group-playground' {...args}>
      <ToggleGroupItem value='bold' id='tgg-playground-bold'>
        <Lucide.Bold size={16} strokeWidth={2} />
      </ToggleGroupItem>
      <ToggleGroupItem value='italic' id='tgg-playground-italic'>
        <Lucide.Italic size={16} strokeWidth={2} />
      </ToggleGroupItem>
      <ToggleGroupItem value='underline' id='tgg-playground-underline'>
        <Lucide.Underline size={16} strokeWidth={2} />
      </ToggleGroupItem>
    </ToggleGroup>
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
            <ToggleGroup key={`${v}-${s}`} variant={v} size={s} id={`tgg-variant-${v}-${s}`}>
              <ToggleGroupItem value='bold' id={`tgg-variant-${v}-${s}-bold`}>
                <Lucide.Bold size={s === 'sm' ? 14 : s === 'lg' ? 20 : 16} strokeWidth={2} />
              </ToggleGroupItem>
              <ToggleGroupItem value='italic' id={`tgg-variant-${v}-${s}-italic`}>
                <Lucide.Italic size={s === 'sm' ? 14 : s === 'lg' ? 20 : 16} strokeWidth={2} />
              </ToggleGroupItem>
            </ToggleGroup>
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
            <ToggleGroup key={`${v}-${s}`} variant={v} size={s} id={`tgg-size-${s}-${v}`}>
              <ToggleGroupItem value='align-left' id={`tgg-size-${s}-${v}-left`}>
                <Lucide.AlignLeft size={s === 'sm' ? 14 : s === 'lg' ? 20 : 16} strokeWidth={2} />
              </ToggleGroupItem>
              <ToggleGroupItem value='align-center' id={`tgg-size-${s}-${v}-center`}>
                <Lucide.AlignCenter size={s === 'sm' ? 14 : s === 'lg' ? 20 : 16} strokeWidth={2} />
              </ToggleGroupItem>
              <ToggleGroupItem value='align-right' id={`tgg-size-${s}-${v}-right`}>
                <Lucide.AlignRight size={s === 'sm' ? 14 : s === 'lg' ? 20 : 16} strokeWidth={2} />
              </ToggleGroupItem>
            </ToggleGroup>
          ))}
        </Row>
      ))}
    </Grid>
  )
}
