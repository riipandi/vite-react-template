import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
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
      <div className='flex w-full min-w-md items-center justify-center'>
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
    <div className='flex flex-col gap-6'>
      <Field>
        <NumberField defaultValue={999} min={1} max={10000}>
          <NumberFieldScrubArea>
            <FieldLabel>Default variant</FieldLabel>
          </NumberFieldScrubArea>
          <NumberFieldGroup variant='default'>
            <NumberFieldDecrement>
              <Icon.MinusIcon weight='bold' />
            </NumberFieldDecrement>
            <NumberFieldInput />
            <NumberFieldIncrement>
              <Icon.PlusIcon weight='bold' />
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
              <Icon.MinusIcon weight='bold' />
            </NumberFieldDecrement>
            <NumberFieldInput />
            <NumberFieldIncrement>
              <Icon.PlusIcon weight='bold' />
            </NumberFieldIncrement>
          </NumberFieldGroup>
        </NumberField>
      </Field>
    </div>
  )
}
