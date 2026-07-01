import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Label } from '#/components/extra/label'
import { Checkbox, CheckboxGroup, CheckboxGroupLabel } from './checkbox.component'

const meta = {
  title: 'Base Components/Checkbox',
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <Label>
      <Checkbox />
      <span>I solemnly swear that I am up to no good.</span>
    </Label>
  )
}

export const Grouped: Story = {
  args: {},
  render: () => (
    <div>
      <CheckboxGroup defaultValue={['owl', 'patronus']} aria-labelledby='notifications-label'>
        <CheckboxGroupLabel id='notifications-label'>Magical Communications</CheckboxGroupLabel>
        <Label>
          <Checkbox value='owl' />
          Owl Post
        </Label>
        <Label>
          <Checkbox value='patronus' />
          Patronus Charm
        </Label>
        <Label>
          <Checkbox value='floo-network' />
          Floo Network
        </Label>
      </CheckboxGroup>
    </div>
  )
}
export const GroupNested: Story = {
  args: {},
  render: () => {
    const [value, setValue] = React.useState<string[]>([])

    const permissions = [
      { label: 'Unforgivable Curses', value: 'unforgivable' },
      { label: 'Defensive Magic', value: 'defensive' },
      { label: 'Charms', value: 'charms' }
    ]

    return (
      <CheckboxGroup
        value={value}
        onValueChange={setValue}
        aria-labelledby='permissions-label'
        allValues={permissions.map((p) => p.value)}
      >
        <CheckboxGroupLabel id='permissions-label'>Magical Permissions</CheckboxGroupLabel>
        <Label>
          <Checkbox parent name='wizard-permissions' />
          Wizard Permissions
        </Label>
        {permissions.map((permission) => (
          <Label key={permission.value} {...stylex.props(x.paddingLeft['1rem'])}>
            <Checkbox value={permission.value} />
            {permission.label}
          </Label>
        ))}
      </CheckboxGroup>
    )
  }
}
