import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent, waitFor, within } from 'storybook/test'
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
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' }
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
} satisfies Meta<typeof Select>

type Story = StoryObj<typeof meta>

const fruits = [
  { label: 'Phoenix feather', value: 'phoenix' },
  { label: 'Dragon heartstring', value: 'dragon' },
  { label: 'Unicorn hair', value: 'unicorn' }
]

const groups = [
  {
    label: 'Wand cores',
    items: [
      { label: 'Phoenix feather', value: 'phoenix' },
      { label: 'Dragon heartstring', value: 'dragon' },
      { label: 'Unicorn hair', value: 'unicorn' }
    ]
  },
  {
    label: 'Potion ingredients',
    items: [
      { label: 'Bezoar', value: 'bezoar' },
      { label: 'Asphodel', value: 'asphodel' },
      { label: 'Wormwood', value: 'wormwood' }
    ]
  }
]

const items = groups.flatMap((group) => group.items)

const timezones = [
  'UTC-08:00 Salem',
  'UTC-07:00 Denver',
  'UTC-06:00 Mexico City',
  'UTC-05:00 Boston',
  'UTC-03:00 Buenos Aires',
  'UTC+00:00 London',
  'UTC+01:00 Paris',
  'UTC+01:00 Geneva',
  'UTC+02:00 Athens',
  'UTC+03:00 Istanbul',
  'UTC+04:00 Dubai',
  'UTC+05:30 Mumbai',
  'UTC+07:00 Bangkok',
  'UTC+08:00 Singapore',
  'UTC+09:00 Tokyo',
  'UTC+12:00 Auckland'
].map((label) => ({ label, value: label }))

const plansWithOptions = [
  { label: 'Muggle', value: 'free' },
  { label: 'Prefect', value: 'pro' },
  { label: 'Ministry of Magic (contact us)', value: 'enterprise', disabled: true }
]

const disabledFruits = [{ label: 'Phoenix feather', value: 'phoenix' }]

const invalidPlans = [
  { label: 'Muggle', value: 'free' },
  { label: 'Prefect', value: 'pro' },
  { label: 'Ministry of Magic', value: 'enterprise' }
]

export default meta

export const Playground: Story = {
  args: { items: fruits },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder='Select a wand core' />
      </SelectTrigger>
      <SelectContent>
        {fruits.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
  play: async ({ canvas }) => {
    const body = within(document.body)
    const trigger = canvas.getByText('Select a wand core')

    // Opening lists every wand core.
    await userEvent.click(trigger)
    const listbox = await body.findByRole('listbox')
    expect(body.getAllByRole('option').length).toBe(3)

    // Selecting updates the trigger and closes the popup.
    await userEvent.click(within(listbox).getByRole('option', { name: 'Dragon heartstring' }))
    await waitFor(() => expect(body.queryByRole('listbox')).toBeNull())
    expect(canvas.getByText('Dragon heartstring')).toBeInTheDocument()

    // Escape dismisses without changing the value.
    await userEvent.click(trigger)
    await body.findByRole('listbox')
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByRole('listbox')).toBeNull())
    expect(canvas.getByText('Dragon heartstring')).toBeInTheDocument()
  }
}

export const Groups: Story = {
  args: { items },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder='Select an ingredient' />
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
        <SelectValue placeholder='Select a city' />
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
      <FieldLabel htmlFor='select-invalid-plan'>Gringotts plan</FieldLabel>
      <Select {...args}>
        <SelectTrigger id='select-invalid-plan'>
          <SelectValue placeholder='Select a Gringotts plan' />
        </SelectTrigger>
        <SelectContent>
          {invalidPlans.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError>Please select a Gringotts plan to continue.</FieldError>
    </Field>
  )
}
