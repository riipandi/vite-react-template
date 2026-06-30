import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { fn } from 'storybook/test'
import { Switch } from '#/components/base/switch'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' }
  },
  tags: [],
  args: { onCheckedChange: fn() }
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[4] },
  row: { display: 'flex', alignItems: 'center', gap: space[3] },
  rowLabel: { minWidth: '6rem' }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='switch-row'>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='switch-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: { defaultChecked: false },
  render: (args) => <Switch id='switch-playground' {...args} />
}

export const States: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      <Row label='Unchecked'>
        <Switch id='switch-unchecked' />
      </Row>
      <Row label='Checked'>
        <Switch id='switch-checked' defaultChecked />
      </Row>
      <Row label='Disabled Unchecked'>
        <Switch id='switch-disabled-unchecked' disabled />
      </Row>
      <Row label='Disabled Checked'>
        <Switch id='switch-disabled-checked' disabled defaultChecked />
      </Row>
    </Grid>
  )
}
