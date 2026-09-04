import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel
} from '#/components/base/field'
import { Label } from '#/components/extra/label'
import { Checkbox, CheckboxGroup } from './checkbox.component'

const meta = {
  title: 'Base Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Checkbox>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  child: { marginLeft: 24 }
})

const notifications = ['comments', 'mentions', 'follows']

export default meta

export const Playground: Story = {
  args: { defaultChecked: true },
  render: (args) => (
    <Label>
      <Checkbox {...args} aria-label='Accept the Hogwarts letter' /> Accept the Hogwarts letter and
      its terms
    </Label>
  )
}

export const Indeterminate: Story = {
  args: { indeterminate: true },
  render: (args) => (
    <Label>
      <Checkbox {...args} aria-label='Select all Marauders' /> Select all Marauders
    </Label>
  )
}

export const Description: Story = {
  render: () => (
    <Field orientation='horizontal'>
      <Checkbox id='checkbox-description-newsletter' defaultChecked />
      <FieldContent>
        <FieldLabel htmlFor='checkbox-description-newsletter'>Daily Prophet</FieldLabel>
        <FieldDescription>
          Receive occasional owl-delivered updates and announcements from Hogwarts.
        </FieldDescription>
      </FieldContent>
    </Field>
  )
}

export const Disabled: Story = {
  render: () => (
    <Label>
      <Checkbox disabled defaultChecked aria-label='Hogsmeade permission slip' /> Hogsmeade
      permission slip
    </Label>
  )
}

export const Invalid: Story = {
  render: () => (
    <Field orientation='horizontal' invalid>
      <Checkbox id='checkbox-invalid-terms' />
      <FieldContent>
        <FieldLabel htmlFor='checkbox-invalid-terms'>Accept the Hogwarts school rules</FieldLabel>
        <FieldError>You must accept the school rules before the Sorting begins.</FieldError>
      </FieldContent>
    </Field>
  )
}

export const Group: Story = {
  render: () => (
    <CheckboxGroup defaultValue={['newsletter']} aria-label='Owl post preferences'>
      <Label>
        <Checkbox name='newsletter' /> Daily Prophet
      </Label>
      <Label>
        <Checkbox name='product-updates' /> Ministry memos
      </Label>
      <Label>
        <Checkbox name='promotions' /> Weasleys&apos; Wizard Wheezes deals
      </Label>
    </CheckboxGroup>
  )
}

export const GroupWithParent: Story = {
  name: 'Group with parent',
  render: () => {
    const [value, setValue] = React.useState<string[]>(['comments'])

    return (
      <CheckboxGroup
        value={value}
        onValueChange={setValue}
        allValues={notifications}
        aria-label='Owl post preferences'
      >
        <Label>
          <Checkbox parent /> All owl post
        </Label>
        <Label style={styles.child}>
          <Checkbox name='comments' /> Howlers
        </Label>
        <Label style={styles.child}>
          <Checkbox name='mentions' /> Prophet mentions
        </Label>
        <Label style={styles.child}>
          <Checkbox name='follows' /> Quidditch updates
        </Label>
      </CheckboxGroup>
    )
  }
}
