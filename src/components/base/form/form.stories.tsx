import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
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
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <Form {...stylex.props(x.width['100%'])}>
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
      <Fieldset {...stylex.props(x.marginLeft['0.5rem'], x.marginRight['0.5rem'])}>
        <Button type='submit' block>
          Create Account
        </Button>
      </Fieldset>
    </Form>
  )
}
