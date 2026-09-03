import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Meter, MeterLabel, MeterValue } from './meter.component'

const meta = {
  title: 'Base Components/Meter',
  component: Meter,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100 } }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Meter>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { value: 75 },
  render: (args) => (
    <Meter {...args}>
      <MeterLabel>Storage</MeterLabel>
      <MeterValue />
    </Meter>
  )
}
