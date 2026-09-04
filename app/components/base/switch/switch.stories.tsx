import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel
} from '#/components/base/field'
import { Label } from '#/components/extra/label'
import { Switch } from './switch.component'

const meta = {
  title: 'Base Components/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    defaultChecked: { control: 'boolean' },
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
} satisfies Meta<typeof Switch>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  label: {
    alignItems: 'center',
    display: 'flex',
    gap: 8
  },
  disabled: {
    opacity: 0.5
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    gap: 24
  }
})

export default meta

export const Playground: Story = {
  args: { defaultChecked: true },
  render: (args) => (
    <label {...stylex.props(styles.label)}>
      <Switch {...args} aria-label='Invisibility Cloak' /> Invisibility Cloak
    </label>
  )
}

export const Sizes: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      <Label>
        <Switch size='sm' defaultChecked />
        House-elf
      </Label>
      <Label>
        <Switch defaultChecked />
        Half-giant
      </Label>
    </div>
  )
}

export const Description: Story = {
  render: () => (
    <Field orientation='horizontal'>
      <FieldContent>
        <FieldLabel htmlFor='switch-description-marketing'>Owl post from Gringotts</FieldLabel>
        <FieldDescription>Receive Daily Prophet updates about new vault services.</FieldDescription>
      </FieldContent>
      <Switch id='switch-description-marketing' />
    </Field>
  )
}

export const Disabled: Story = {
  render: () => (
    <label {...stylex.props(styles.label, styles.disabled)}>
      <Switch disabled aria-label='Disabled switch' /> Disabled
    </label>
  )
}

export const Invalid: Story = {
  render: () => (
    <Field orientation='horizontal' invalid>
      <FieldContent>
        <FieldLabel htmlFor='switch-invalid-two-factor'>Gringotts security charms</FieldLabel>
        <FieldError>A security charm is required to enter your vault.</FieldError>
      </FieldContent>
      <Switch id='switch-invalid-two-factor' />
    </Field>
  )
}
