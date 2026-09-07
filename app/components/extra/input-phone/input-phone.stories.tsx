import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent } from 'storybook/test'
import { Field, FieldError, FieldLabel } from '#/components/base/field'
import { container } from '#/styles/core/tokens.stylex'
import { InputPhone } from './input-phone.component'

const meta = {
  title: 'Extra Components/InputPhone',
  component: InputPhone,
  parameters: { layout: 'centered' },
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
} satisfies Meta<typeof InputPhone>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: container.medium
  },
  wrap: {
    width: container.medium
  }
})

export default meta

export const Playground: Story = {
  render: (args) => (
    <div {...stylex.props(styles.wrap)}>
      <InputPhone {...args} />
    </div>
  ),
  argTypes: {
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    withCountrySelect: { control: 'boolean' }
  }
}

export const WithLabel: Story = {
  name: 'With label',
  render: () => (
    <Field style={styles.field}>
      <FieldLabel htmlFor='phone-labeled'>Owl office hotline</FieldLabel>
      <InputPhone id='phone-labeled' defaultCountry='GB' placeholder='020 7946 0958' />
    </Field>
  )
}

export const International: Story = {
  name: 'International option',
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <InputPhone defaultCountry='ID' placeholder='812 3456 7890' />
    </div>
  )
}

export const RestrictedCountries: Story = {
  name: 'Restricted countries',
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <InputPhone countries={['ID', 'SG', 'MY']} defaultCountry='ID' placeholder='812 3456 7890' />
    </div>
  )
}

export const WithDefaultValue: Story = {
  name: 'With default value',
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <InputPhone value='+12135551234' onChange={() => {}} />
    </div>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByRole('textbox')
    expect(el).toHaveValue('+1 213 555 1234')
  }
}

export const Invalid: Story = {
  render: () => (
    <Field invalid style={styles.field}>
      <FieldLabel htmlFor='phone-invalid'>Emergency contact</FieldLabel>
      <InputPhone id='phone-invalid' defaultCountry='US' placeholder='(555) 000-0000' invalid />
      <FieldError>Enter a valid phone number.</FieldError>
    </Field>
  )
}

export const Disabled: Story = {
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <InputPhone placeholder='Sealed by the Ministry' disabled />
    </div>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByRole('textbox')
    expect(el).toBeDisabled()
    await userEvent.type(el, '123')
    expect(el).toHaveValue('')
  }
}

export const WithoutCountry: Story = {
  name: 'Without country',
  render: () => (
    <Field style={styles.field}>
      <FieldLabel htmlFor='phone-no-country'>Ministry hotline</FieldLabel>
      <InputPhone id='phone-no-country' withCountrySelect={false} placeholder='(555) 123-4567' />
    </Field>
  ),
  play: async ({ canvas }) => {
    // No flag button rendered; the digits span the whole group.
    expect(canvas.queryByRole('combobox')).toBeNull()
  }
}

export const ReadOnly: Story = {
  name: 'Read only',
  render: () => (
    <Field style={styles.field}>
      <FieldLabel htmlFor='phone-readonly'>Registered owl line</FieldLabel>
      <InputPhone
        id='phone-readonly'
        defaultCountry='US'
        value='+12135551234'
        onChange={() => {}}
        readOnly
      />
    </Field>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByRole('textbox')
    expect(el).toHaveAttribute('readonly')
    expect(el).toHaveValue('+1 213 555 1234')
  }
}

export const Interaction: Story = {
  render: () => (
    <div {...stylex.props(styles.wrap)}>
      <InputPhone id='phone-typing' defaultCountry='US' />
    </div>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByRole('textbox')
    await userEvent.type(el, '2135551234')
    expect(el).toHaveValue('(213) 555-1234')
  }
}
