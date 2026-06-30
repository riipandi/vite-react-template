import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import { fn } from 'storybook/test'
import { RadioGroup, RadioGroupItem } from '#/components/base/radio'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Radio',
  component: RadioGroup,
  parameters: { layout: 'centered' },
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' }
  },
  tags: [],
  args: { onValueChange: fn() }
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    minWidth: '12rem'
  }
})

const radioLabelStyles = stylex.create({
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: space[2],
    cursor: 'pointer'
  }
})

function RadioOption({ value, id }: { value: string; id: string }) {
  return (
    <label {...stylex.props(radioLabelStyles.label)} htmlFor={id}>
      <RadioGroupItem id={id} value={value} />
      <span>{value}</span>
    </label>
  )
}

export const Playground: Story = {
  args: { defaultValue: 'option-1' },
  render: (args) => (
    <div {...stylex.props(layoutStyles.wrapper)} id='radio-playground-wrapper'>
      <RadioGroup id='radio-playground' {...args}>
        <RadioOption value='option-1' id='radio-playground-item-1' />
        <RadioOption value='option-2' id='radio-playground-item-2' />
        <RadioOption value='option-3' id='radio-playground-item-3' />
      </RadioGroup>
    </div>
  )
}

export const Default: Story = {
  name: 'Default',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='radio-default-wrapper'>
      <RadioGroup id='radio-default' defaultValue='apple'>
        <RadioOption value='apple' id='radio-default-item-1' />
        <RadioOption value='banana' id='radio-default-item-2' />
        <RadioOption value='orange' id='radio-default-item-3' />
      </RadioGroup>
    </div>
  )
}
