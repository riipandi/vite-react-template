import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { Separator } from '#/components/base/separator'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'solid-text', 'content', 'underline']
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    }
  },
  tags: []
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

const variants = ['line', 'solid-text', 'content', 'underline'] as const

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[4], width: '100%' },
  row: { display: 'flex', alignItems: 'center', gap: space[2] },
  rowLabel: { minWidth: '6rem' },
  hBox: { width: '100%', maxWidth: '20rem' },
  vBox: { height: '8rem' }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='separator-row'>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='separator-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: { variant: 'line', orientation: 'horizontal' },
  render: (args) => (
    <div {...stylex.props(layoutStyles.hBox)} id='separator-playground'>
      <Separator {...args} id='separator-playground-el' />
    </div>
  )
}

export const VariantShowcase: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {variants.map((v) => (
        <Row key={v} label={v}>
          <div {...stylex.props(layoutStyles.hBox)} id={`separator-variant-${v}-box`}>
            <Separator variant={v} id={`separator-variant-${v}`} />
          </div>
        </Row>
      ))}
    </Grid>
  )
}

export const OrientationShowcase: Story = {
  name: 'Orientations',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      <Row label='Horizontal'>
        <div {...stylex.props(layoutStyles.hBox)} id='separator-orient-h-box'>
          <Separator orientation='horizontal' id='separator-orient-h' />
        </div>
      </Row>
      <Row label='Vertical'>
        <div {...stylex.props(layoutStyles.vBox)} id='separator-orient-v-box'>
          <Separator orientation='vertical' id='separator-orient-v' />
        </div>
      </Row>
    </Grid>
  )
}
