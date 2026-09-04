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
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    defaultChecked: { control: 'boolean' },
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
      <Switch {...args} aria-label='Airplane mode' /> Airplane mode
    </label>
  )
}

export const Sizes: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      <Label>
        <Switch size='sm' defaultChecked />
        Small
      </Label>
      <Label>
        <Switch defaultChecked />
        Medium
      </Label>
    </div>
  )
}

export const Description: Story = {
  render: () => (
    <Field orientation='horizontal'>
      <FieldContent>
        <FieldLabel htmlFor='switch-description-marketing'>Marketing emails</FieldLabel>
        <FieldDescription>Receive emails about new products and features.</FieldDescription>
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
        <FieldLabel htmlFor='switch-invalid-two-factor'>Two-factor authentication</FieldLabel>
        <FieldError>Two-factor authentication is required.</FieldError>
      </FieldContent>
      <Switch id='switch-invalid-two-factor' />
    </Field>
  )
}
