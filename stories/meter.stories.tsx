import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { Meter, MeterLabel } from '#/components/base/meter'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Meter',
  component: Meter,
  parameters: { layout: 'centered' },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 }
    },
    min: { control: 'number' },
    max: { control: 'number' }
  },
  tags: [],
  args: {}
} satisfies Meta<typeof Meter>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    minWidth: '20rem'
  },
  meterRow: {
    display: 'flex',
    alignItems: 'center',
    gap: space[3]
  }
})

export const Playground: Story = {
  args: { value: 45, min: 0, max: 100 },
  render: (args) => (
    <div {...stylex.props(layoutStyles.wrapper)} id='meter-playground-wrapper'>
      <Meter id='meter-playground' {...args} />
    </div>
  )
}

export const ValueShowcase: Story = {
  name: 'Value Showcase',
  args: { value: 50 } as never,
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='meter-value-wrapper'>
      <div {...stylex.props(layoutStyles.meterRow)} id='meter-value-25'>
        <MeterLabel id='meter-label-25'>25%</MeterLabel>
        <Meter id='meter-25' value={25} min={0} max={100} />
      </div>
      <div {...stylex.props(layoutStyles.meterRow)} id='meter-value-50'>
        <MeterLabel id='meter-label-50'>50%</MeterLabel>
        <Meter id='meter-50' value={50} min={0} max={100} />
      </div>
      <div {...stylex.props(layoutStyles.meterRow)} id='meter-value-75'>
        <MeterLabel id='meter-label-75'>75%</MeterLabel>
        <Meter id='meter-75' value={75} min={0} max={100} />
      </div>
      <div {...stylex.props(layoutStyles.meterRow)} id='meter-value-100'>
        <MeterLabel id='meter-label-100'>100%</MeterLabel>
        <Meter id='meter-100' value={100} min={0} max={100} />
      </div>
    </div>
  )
}
