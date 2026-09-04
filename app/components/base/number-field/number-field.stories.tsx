import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Label } from '#/components/extra/label'
import { NumberField, NumberFieldGroup } from './number-field.component'

const meta = {
  title: 'Base Components/NumberField',
  component: NumberField,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof NumberField>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { defaultValue: 5, min: 0, max: 100 },
  render: (args) => (
    <NumberField {...args}>
      <Label>
        Quantity
        <NumberFieldGroup />
      </Label>
    </NumberField>
  )
}

export const MinMaxStep: Story = {
  name: 'Min, max, and step',
  args: { defaultValue: 20, min: 0, max: 100, step: 5 },
  render: (args) => (
    <NumberField {...args}>
      <Label>
        Volume
        <NumberFieldGroup />
      </Label>
    </NumberField>
  )
}

export const Formatted: Story = {
  args: {
    defaultValue: 49.99,
    min: 0,
    step: 1,
    format: { style: 'currency', currency: 'USD' }
  },
  render: (args) => (
    <NumberField {...args}>
      <Label>
        Price
        <NumberFieldGroup />
      </Label>
    </NumberField>
  )
}
