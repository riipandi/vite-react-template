import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { fn } from 'storybook/test'
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  NumberFieldScrubArea
} from '#/components/base/number-field'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/NumberField',
  component: NumberField,
  parameters: { layout: 'centered' },
  argTypes: {
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' }
  },
  tags: [],
  args: { onValueChange: fn() }
} satisfies Meta<typeof NumberField>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    minWidth: '16rem'
  }
})

export const Playground: Story = {
  args: { value: 50, min: 0, max: 100, step: 1 },
  render: (args) => (
    <div {...stylex.props(layoutStyles.wrapper)} id='number-field-playground-wrapper'>
      <NumberField id='number-field-playground' {...args}>
        <NumberFieldScrubArea id='number-field-scrub-playground'>
          <Lucide.GripHorizontal size={16} />
        </NumberFieldScrubArea>
        <NumberFieldGroup id='number-field-group-playground'>
          <NumberFieldDecrement id='number-field-decrement-playground'>
            <Lucide.Minus size={16} />
          </NumberFieldDecrement>
          <NumberFieldInput id='number-field-input-playground' />
          <NumberFieldIncrement id='number-field-increment-playground'>
            <Lucide.Plus size={16} />
          </NumberFieldIncrement>
        </NumberFieldGroup>
      </NumberField>
    </div>
  )
}

export const Default: Story = {
  name: 'Default',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='number-field-default-wrapper'>
      <NumberField id='number-field-default' defaultValue={25} min={0} max={100}>
        <NumberFieldGroup id='number-field-group-default'>
          <NumberFieldDecrement id='number-field-decrement-default'>
            <Lucide.Minus size={16} />
          </NumberFieldDecrement>
          <NumberFieldInput id='number-field-input-default' />
          <NumberFieldIncrement id='number-field-increment-default'>
            <Lucide.Plus size={16} />
          </NumberFieldIncrement>
        </NumberFieldGroup>
      </NumberField>
    </div>
  )
}
