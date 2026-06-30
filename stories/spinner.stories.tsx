import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { Spinner } from '#/components/extra/spinner'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Extended/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg']
    }
  },
  tags: []
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

const sizes = ['xs', 'sm', 'md', 'lg'] as const

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[4] },
  row: { display: 'flex', alignItems: 'center', gap: space[3] },
  rowLabel: { minWidth: '3rem' }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='spinner-row'>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='spinner-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: { size: 'md' },
  render: (args) => <Spinner id='spinner-playground' {...args} />
}

export const SizeShowcase: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sizes.map((s) => (
        <Row key={s} label={s}>
          <Spinner id={`spinner-size-${s}`} size={s} />
        </Row>
      ))}
    </Grid>
  )
}
