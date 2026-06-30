import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '#/components/base/button'
import { Field, FieldError, FieldLabel } from '#/components/base/field'
import { Fieldset, FieldsetLegend } from '#/components/base/fieldset'
import { Form } from '#/components/base/form'
import { Input } from '#/components/base/input'
import { Text } from '#/components/extra/typography'

const meta = {
  title: 'Base Components/Form',
  component: Form,
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
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <Form className='w-full max-w-sm'>
      <Fieldset>
        <FieldsetLegend>Personal Information</FieldsetLegend>
        <Text>We need your name and email to create your account.</Text>
        <Field>
          <FieldLabel htmlFor='name'>Name</FieldLabel>
          <Input id='name' placeholder='Enter your name' required />
          <FieldError match='valueMissing'>This is required</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input id='email' placeholder='Enter your email' required />
          <FieldError match='valueMissing'>This is required</FieldError>
        </Field>
      </Fieldset>
      <Fieldset className='mt-2'>
        <Button type='submit' block>
          Create Account
        </Button>
      </Fieldset>
    </Form>
  )
}
