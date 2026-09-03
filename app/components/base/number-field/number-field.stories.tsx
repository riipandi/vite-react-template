import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { NumberField, NumberFieldGroup, NumberFieldScrubArea } from './number-field.component'

const meta = {
  title: 'Base Components/NumberField',
  component: NumberField,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof NumberField>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { defaultValue: 5 },
  render: (args) => (
    <NumberField {...args}>
      <NumberFieldScrubArea>Age</NumberFieldScrubArea>
      <NumberFieldGroup />
    </NumberField>
  )
}

export const StackedControls: Story = {
  args: { defaultValue: 5 },
  render: (args) => (
    <NumberField {...args}>
      <NumberFieldScrubArea>Age</NumberFieldScrubArea>
      <NumberFieldGroup controls='stacked' />
    </NumberField>
  )
}

export const SideControls: Story = {
  args: { defaultValue: 5 },
  render: (args) => (
    <NumberField {...args}>
      <NumberFieldScrubArea>Age</NumberFieldScrubArea>
      <NumberFieldGroup controls='sides' />
    </NumberField>
  )
}
