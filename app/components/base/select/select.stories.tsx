import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Field, FieldError, FieldLabel } from '#/components/base/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from './select.component'

const meta = {
  title: 'Base Components/Select',
  component: Select,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    disabled: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Select>

type Story = StoryObj<typeof meta>

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' }
]

const groups = [
  {
    label: 'Fruits',
    items: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' }
    ]
  },
  {
    label: 'Vegetables',
    items: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Potato', value: 'potato' },
      { label: 'Onion', value: 'onion' }
    ]
  }
]

const items = groups.flatMap((group) => group.items)

const timezones = [
  'UTC-08:00 Pacific',
  'UTC-07:00 Mountain',
  'UTC-06:00 Central',
  'UTC-05:00 Eastern',
  'UTC-03:00 Buenos Aires',
  'UTC+00:00 London',
  'UTC+01:00 Paris',
  'UTC+02:00 Athens',
  'UTC+03:00 Istanbul',
  'UTC+04:00 Dubai',
  'UTC+05:30 Mumbai',
  'UTC+07:00 Bangkok',
  'UTC+08:00 Singapore',
  'UTC+09:00 Tokyo',
  'UTC+10:00 Sydney',
  'UTC+12:00 Auckland'
].map((label) => ({ label, value: label }))

const plansWithOptions = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise (contact us)', value: 'enterprise', disabled: true }
]

const disabledFruits = [{ label: 'Apple', value: 'apple' }]

const invalidPlans = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' }
]

export default meta

export const Playground: Story = {
  args: { items: fruits },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        {fruits.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export const Groups: Story = {
  args: { items },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder='Select a food' />
      </SelectTrigger>
      <SelectContent>
        {groups.map((group, index) => (
          <SelectGroup key={group.label}>
            {index > 0 && <SelectSeparator />}
            <SelectLabel>{group.label}</SelectLabel>
            {group.items.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}

export const Scrollable: Story = {
  args: { items: timezones },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder='Select a timezone' />
      </SelectTrigger>
      <SelectContent>
        {timezones.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export const DisabledOptions: Story = {
  name: 'Disabled options',
  args: { items: plansWithOptions, defaultValue: 'pro' },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {plansWithOptions.map(({ label, value, disabled }) => (
          <SelectItem key={value} value={value} disabled={disabled}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export const Disabled: Story = {
  args: { items: disabledFruits, disabled: true },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder='Disabled' />
      </SelectTrigger>
      <SelectContent>
        {disabledFruits.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export const Invalid: Story = {
  args: { items: invalidPlans },
  render: (args) => (
    <Field invalid>
      <FieldLabel htmlFor='select-invalid-plan'>Plan</FieldLabel>
      <Select {...args}>
        <SelectTrigger id='select-invalid-plan'>
          <SelectValue placeholder='Select a plan' />
        </SelectTrigger>
        <SelectContent>
          {invalidPlans.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError>Please select a plan to continue.</FieldError>
    </Field>
  )
}
