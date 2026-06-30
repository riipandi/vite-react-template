import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Field, FieldDescription, FieldError, FieldLabel } from '#/components/base/field'
import { Input } from '#/components/base/input'
import {
  Select,
  SelectPopup,
  SelectItem,
  SelectList,
  SelectTrigger,
  SelectValue
} from '#/components/base/select'

const meta = {
  title: 'Base Components/Field',
  component: Field,
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
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div className='min-w-md lg:w-6/12' {...stylex.props(x.width['100%'])}>
      <Field>
        <FieldLabel htmlFor='name'>Wizard Name</FieldLabel>
        <Input id='name' placeholder='Enter your wizard name' required />
        <FieldError match='valueMissing'>This is required</FieldError>
        <FieldDescription>Try to input something, clear it and leave the field.</FieldDescription>
      </Field>
    </div>
  )
}

export const Controlled: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.width['100%'])}>
      <Field>
        <FieldLabel htmlFor='name'>Select Book</FieldLabel>
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectList>
              <SelectItem value='da-vinci'>The Da Vinci Code</SelectItem>
              <SelectItem value='angels-demons'>Angels & Demons</SelectItem>
              <SelectItem value='sorcerers-stone'>The Sorcerer's Stone</SelectItem>
            </SelectList>
          </SelectPopup>
        </Select>
      </Field>
    </div>
  )
}
