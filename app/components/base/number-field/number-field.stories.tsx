import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent } from 'storybook/test'
import { Label } from '#/components/extra/label'
import { NumberField, NumberFieldGroup } from './number-field.component'

const meta = {
  title: 'Base Components/NumberField',
  component: NumberField,
  parameters: { layout: 'centered' },
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' }
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
} satisfies Meta<typeof NumberField>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { defaultValue: 5, min: 0, max: 100 },
  render: (args) => (
    <NumberField {...args}>
      <Label>
        Galleons
        <NumberFieldGroup />
      </Label>
    </NumberField>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'Galleons' })
    expect(input).toHaveValue('5')

    // Stepper buttons adjust the value by one.
    await userEvent.click(canvas.getByRole('button', { name: 'Increase' }))
    expect(input).toHaveValue('6')
    await userEvent.click(canvas.getByRole('button', { name: 'Decrease' }))
    await userEvent.click(canvas.getByRole('button', { name: 'Decrease' }))
    expect(input).toHaveValue('4')

    // Typing a value works too.
    await userEvent.clear(input)
    await userEvent.type(input, '17')
    expect(input).toHaveValue('17')
  }
}

export const MinMaxStep: Story = {
  name: 'Min, max, and step',
  args: { defaultValue: 20, min: 0, max: 100, step: 5 },
  render: (args) => (
    <NumberField {...args}>
      <Label>
        Butterbeer pints
        <NumberFieldGroup />
      </Label>
    </NumberField>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'Butterbeer pints' })

    // Step increments land on multiples of 5.
    await userEvent.click(canvas.getByRole('button', { name: 'Increase' }))
    expect(input).toHaveValue('25')

    // Typing a valid in-range value keeps it on blur (no snapping).
    await userEvent.clear(input)
    await userEvent.type(input, '7')
    await userEvent.tab()
    expect(input).toHaveValue('7')
  }
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
        Gringotts fee
        <NumberFieldGroup />
      </Label>
    </NumberField>
  )
}
