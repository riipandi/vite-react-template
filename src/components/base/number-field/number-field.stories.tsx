import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { Field, FieldLabel } from '#/components/base/field'
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea
} from '#/components/base/number-field'

const meta = {
  title: 'Base Components/NumberField',
  component: NumberField,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof NumberField>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['1.5rem'])}>
      <Field>
        <NumberField defaultValue={999} min={1} max={10000}>
          <NumberFieldScrubArea>
            <FieldLabel>Default variant</FieldLabel>
          </NumberFieldScrubArea>
          <NumberFieldGroup variant='default'>
            <NumberFieldDecrement>
              <Lucide.Minus />
            </NumberFieldDecrement>
            <NumberFieldInput />
            <NumberFieldIncrement>
              <Lucide.Plus />
            </NumberFieldIncrement>
          </NumberFieldGroup>
        </NumberField>
      </Field>

      <Field>
        <NumberField defaultValue={999} min={1} max={10000}>
          <NumberFieldScrubArea>
            <FieldLabel>Ghost variant</FieldLabel>
          </NumberFieldScrubArea>
          <NumberFieldGroup variant='ghost'>
            <NumberFieldDecrement>
              <Lucide.Minus />
            </NumberFieldDecrement>
            <NumberFieldInput />
            <NumberFieldIncrement>
              <Lucide.Plus />
            </NumberFieldIncrement>
          </NumberFieldGroup>
        </NumberField>
      </Field>
    </div>
  )
}
