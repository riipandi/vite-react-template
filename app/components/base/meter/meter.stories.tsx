import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect } from 'storybook/test'
import { container } from '#/styles/core/tokens.stylex'
import { Meter, MeterLabel, MeterValue } from './meter.component'

const meta = {
  title: 'Base Components/Meter',
  component: Meter,
  parameters: { layout: 'centered' },
  argTypes: {
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.justifyContent.center,
          atoms.padding['20px'],
          atoms.minWidth['448px'],
          atoms.width['100%']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Meter>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  root: {
    maxWidth: container.small
  }
})

export default meta

export const Playground: Story = {
  args: { value: 24, max: 64, locale: 'en-US' },
  render: (args) => (
    <Meter {...args} style={styles.root}>
      <MeterLabel>Polyjuice Potion brewed</MeterLabel>
      <MeterValue>{(_, value) => `${value} ml of 64 ml`}</MeterValue>
    </Meter>
  ),
  play: ({ canvas }) => {
    const el = canvas.getByRole('meter', { name: 'Polyjuice Potion brewed' })
    expect(el).toHaveAttribute('aria-valuenow', '24')
    expect(el).toHaveAttribute('aria-valuemax', '64')
    expect(canvas.getByText('24 ml of 64 ml')).toBeInTheDocument()
  }
}

export const CustomRange: Story = {
  name: 'Custom range',
  args: { value: 72, min: 30, max: 90, locale: 'en-US' },
  render: (args) => (
    <Meter {...args} style={styles.root}>
      <MeterLabel>Cryptex pressure</MeterLabel>
      <MeterValue>{(_, value) => `${value} psi`}</MeterValue>
    </Meter>
  ),
  play: ({ canvas }) => {
    const el = canvas.getByRole('meter', { name: 'Cryptex pressure' })
    expect(el).toHaveAttribute('aria-valuemin', '30')
    expect(el).toHaveAttribute('aria-valuemax', '90')
    expect(el).toHaveAttribute('aria-valuenow', '72')
    expect(canvas.getByText('72 psi')).toBeInTheDocument()
  }
}
