import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Checkbox, CheckboxGroup } from '#/components/base/checkbox'
import { Field, FieldDescription, FieldError, FieldLabel, FieldItem } from '#/components/base/field'
import { Fieldset, FieldsetLegend } from '#/components/base/fieldset'
import { Input } from '#/components/base/input'
import { Radio, RadioGroup } from '#/components/base/radio'
import { Separator } from '#/components/base/separator'
import { Text } from '#/components/extra/typography'

const meta = {
  title: 'Base Components/Fieldset',
  component: Fieldset,
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
} satisfies Meta<typeof Fieldset>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.width['83.333333%'])}>
      <Fieldset>
        <FieldsetLegend>Wizard Information</FieldsetLegend>
        <Text>
          This information will be used to create your magical identity. You can always change this
          information later.
        </Text>
        <Field>
          <FieldLabel htmlFor='name1'>Wizard Name</FieldLabel>
          <Input id='name1' placeholder='Enter your wizard name' required />
          <FieldError match='valueMissing'>This is required</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor='email1'>Owl Post</FieldLabel>
          <Input id='email1' placeholder='Enter your owl post address' required />
          <FieldError match='valueMissing'>This is required</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor='password1'>Secret Password</FieldLabel>
          <Input id='password1' type='password' placeholder='Enter your secret password' required />
          <FieldError match='valueMissing'>This is required</FieldError>
          <FieldDescription>Password must be at least 8 characters long.</FieldDescription>
        </Field>
      </Fieldset>
    </div>
  )
}

export const Complex: Story = {
  args: {},
  render: () => (
    <div
      {...stylex.props(x.maxWidth['448px'], x.width['83.333333%'])}
      {...stylex.props(
        x.display.flex,
        x.flexDirection.column,
        x.gap['1.5rem'],
        x.paddingTop['8rem'],
        x.paddingBottom['8rem']
      )}
    >
      <Fieldset>
        <FieldsetLegend>Wizard Information</FieldsetLegend>
        <Text>
          We need your name and owl post to create your account. <br />
          You can always change this information later.
        </Text>
        <Field>
          <FieldLabel htmlFor='name'>Wizard Name</FieldLabel>
          <Input id='name' placeholder='Enter your wizard name' required />
          <FieldError match='valueMissing'>This is required</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor='email'>Owl Post</FieldLabel>
          <Input id='email' placeholder='Enter your owl post address' required />
          <FieldError match='valueMissing'>This is required</FieldError>
        </Field>
      </Fieldset>
      <Separator />
      <Fieldset>
        <FieldsetLegend>Magical Security</FieldsetLegend>
        <Text>Set up your security preferences to protect your magical account.</Text>
        <Field>
          <FieldLabel htmlFor='password'>Secret Password</FieldLabel>
          <Input id='password' type='password' placeholder='Enter your password' required />
          <FieldError match='valueMissing'>This is required</FieldError>
          <FieldDescription>Password must be at least 8 characters long.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor='confirm-password'>Confirm Password</FieldLabel>
          <Input
            id='confirm-password'
            type='password'
            placeholder='Confirm your password'
            required
          />
          <FieldError match='valueMissing'>This is required</FieldError>
          <FieldError match='valueMissing'>Passwords do not match</FieldError>
        </Field>
      </Fieldset>
      <Separator />
      <Field>
        <Fieldset render={<CheckboxGroup defaultValue={['owl']} />}>
          <FieldsetLegend>Magical Communications</FieldsetLegend>
          <Text>
            We'll send you notifications about your account and important updates. Choose the ones
            you want to receive.
          </Text>
          <FieldItem>
            <Checkbox name='notifications' id='notifications-owl' value='owl' />
            <FieldLabel htmlFor='notifications-owl'>Owl Post</FieldLabel>
          </FieldItem>
          <FieldItem>
            <Checkbox name='notifications' id='patronus' value='patronus' />
            <FieldLabel htmlFor='patronus'>Patronus Charm</FieldLabel>
          </FieldItem>
          <FieldItem>
            <Checkbox name='notifications' id='floo' value='floo' />
            <FieldLabel htmlFor='floo'>Floo Network</FieldLabel>
          </FieldItem>
        </Fieldset>
      </Field>
      <Separator />
      <Field>
        <Fieldset render={<RadioGroup defaultValue='gryffindor' />}>
          <FieldsetLegend>Hogwarts House</FieldsetLegend>
          <Text>Choose your preferred house at Hogwarts.</Text>
          <FieldItem>
            <Radio id='house-gryffindor' value='gryffindor' />
            <FieldLabel htmlFor='house-gryffindor'>Gryffindor</FieldLabel>
          </FieldItem>
          <FieldItem>
            <Radio id='house-slytherin' value='slytherin' />
            <FieldLabel htmlFor='house-slytherin'>Slytherin</FieldLabel>
          </FieldItem>
          <FieldItem>
            <Radio id='house-ravenclaw' value='ravenclaw' />
            <FieldLabel htmlFor='house-ravenclaw'>Ravenclaw</FieldLabel>
            <FieldDescription>
              Ravenclaw values intelligence, creativity, learning, and wit.
            </FieldDescription>
          </FieldItem>
          <FieldError match='valueMissing'>This is required</FieldError>
        </Fieldset>
      </Field>
    </div>
  )
}
