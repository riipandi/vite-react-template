import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { expect, fn, userEvent } from 'storybook/test'
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
  parameters: { layout: 'centered' },
  argTypes: {
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' }
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
  ),
  play: async ({ canvas }) => {
    // The accessible name combines aria-label and the label text.
    const el = canvas.getByRole('checkbox', { name: /Accept the Hogwarts letter/ })
    expect(el).toHaveAttribute('aria-checked', 'true')

    await userEvent.click(el)
    expect(el).toHaveAttribute('aria-checked', 'false')

    await userEvent.click(el)
    expect(el).toHaveAttribute('aria-checked', 'true')
  }
}

export const Indeterminate: Story = {
  args: { indeterminate: true },
  render: (args) => (
    <Label>
      <Checkbox {...args} aria-label='Select all Marauders' /> Select all Marauders
    </Label>
  ),
  play: ({ canvas }) => {
    expect(canvas.getByRole('checkbox', { name: /Select all Marauders/ })).toHaveAttribute(
      'aria-checked',
      'mixed'
    )
  }
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
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByRole('checkbox', { name: /Hogsmeade permission slip/ })
    expect(el).toHaveAttribute('data-disabled')
    expect(el).toHaveAttribute('aria-checked', 'true')
    await userEvent.click(el)
    expect(el).toHaveAttribute('aria-checked', 'true')
  }
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

export const GroupPlay: StoryObj<{ handleValueChange: ReturnType<typeof fn> }> = {
  name: 'group (interaction)',
  args: { handleValueChange: fn() },
  render: (args) => (
    <CheckboxGroup
      defaultValue={['newsletter']}
      onValueChange={args.handleValueChange}
      aria-label='Owl post preferences'
    >
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
  ),
  play: async ({ canvas, args }) => {
    const memos = canvas.getByRole('checkbox', { name: 'Ministry memos' })
    await userEvent.click(memos)
    expect(memos).toHaveAttribute('aria-checked', 'true')
    // onValueChange carries (value, eventDetails) — check the value arg.
    expect(args.handleValueChange.mock.calls[0]?.[0]).toEqual(['newsletter', 'product-updates'])

    await userEvent.click(canvas.getByRole('checkbox', { name: 'Daily Prophet' }))
    expect(args.handleValueChange.mock.calls[1]?.[0]).toEqual(['product-updates'])
  }
}

export const GroupParentPlay: Story = {
  name: 'group with parent (interaction)',
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
  },
  play: async ({ canvas }) => {
    const parent = canvas.getByRole('checkbox', { name: 'All owl post' })

    // One of three selected: the parent checkbox is indeterminate.
    expect(parent).toHaveAttribute('aria-checked', 'mixed')

    // Selecting the parent checks every child.
    await userEvent.click(parent)
    expect(parent).toHaveAttribute('aria-checked', 'true')
    for (const name of ['Howlers', 'Prophet mentions', 'Quidditch updates']) {
      expect(canvas.getByRole('checkbox', { name })).toHaveAttribute('aria-checked', 'true')
    }

    // Selecting it again clears every child.
    await userEvent.click(parent)
    expect(parent).toHaveAttribute('aria-checked', 'false')
    for (const name of ['Howlers', 'Prophet mentions', 'Quidditch updates']) {
      expect(canvas.getByRole('checkbox', { name })).toHaveAttribute('aria-checked', 'false')
    }
  }
}
