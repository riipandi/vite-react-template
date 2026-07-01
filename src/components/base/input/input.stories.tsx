import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { colorVar } from '#/styles/tokens.stylex'
import { Input } from '.'

const meta = {
  title: 'Base Components/Input',
  component: Input,
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
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.75rem'])}>
      <Input placeholder='Spell name' {...stylex.props(x.width['100%'])} />
      <Input placeholder='Subtle variant' variant='subtle' {...stylex.props(x.width['100%'])} />
      <Input disabled placeholder='Disabled input' {...stylex.props(x.width['100%'])} />
      <Input type='password' placeholder='••••••••••••••••' {...stylex.props(x.width['100%'])} />
      <Input type='file' {...stylex.props(x.width['100%'])} />
    </div>
  )
}

export const DatePicker: Story = {
  render: () => (
    <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.75rem'])}>
      <Input type='date' {...stylex.props(x.width['100%'])} />
      <Input type='date' defaultValue='2025-01-15' {...stylex.props(x.width['100%'])} />
      <Input type='date' min='2025-01-01' max='2025-12-31' {...stylex.props(x.width['100%'])} />
      <Input type='date' disabled {...stylex.props(x.width['100%'])} />
      <Input type='date' variant='subtle' {...stylex.props(x.width['100%'])} />
    </div>
  )
}

export const TimePicker: Story = {
  render: () => (
    <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.75rem'])}>
      <Input type='time' {...stylex.props(x.width['100%'])} />
      <Input type='time' defaultValue='09:30' {...stylex.props(x.width['100%'])} />
      <Input type='time' step='1' defaultValue='14:30:45' {...stylex.props(x.width['100%'])} />
      <Input type='time' disabled {...stylex.props(x.width['100%'])} />
      <Input type='time' variant='subtle' {...stylex.props(x.width['100%'])} />
    </div>
  )
}

export const DateTimePicker: Story = {
  render: () => (
    <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.75rem'])}>
      <Input type='datetime-local' {...stylex.props(x.width['100%'])} />
      <Input
        type='datetime-local'
        defaultValue='2025-01-15T09:30'
        {...stylex.props(x.width['100%'])}
      />
      <Input
        type='datetime-local'
        min='2025-01-01T00:00'
        max='2025-12-31T23:59'
        {...stylex.props(x.width['100%'])}
      />
      <Input type='datetime-local' disabled {...stylex.props(x.width['100%'])} />
      <Input type='datetime-local' variant='subtle' {...stylex.props(x.width['100%'])} />
    </div>
  )
}

export const DateWithIcon: Story = {
  render: () => (
    <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.75rem'])}>
      <Input type='date' placeholder='Select date' {...stylex.props(x.flex['1'])} />
      <Lucide.Calendar
        {...stylex.props(x.color[colorVar.fgNeutralFaded])}
        {...stylex.props(
          x.marginLeft['0.5rem'],
          x.marginRight['0.5rem'],
          x.width['1rem'],
          x.height['1rem']
        )}
      />
      <Input type='date' defaultValue='2025-06-15' {...stylex.props(x.flex['1'])} />
      <Lucide.Calendar
        {...stylex.props(x.color[colorVar.fgNeutralFaded])}
        {...stylex.props(
          x.marginLeft['0.5rem'],
          x.marginRight['0.5rem'],
          x.width['1rem'],
          x.height['1rem']
        )}
      />
    </div>
  )
}

export const TimeWithIcon: Story = {
  render: () => (
    <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.75rem'])}>
      <Input type='time' placeholder='Select time' {...stylex.props(x.flex['1'])} />
      <Lucide.Clock
        {...stylex.props(x.color[colorVar.fgNeutralFaded])}
        {...stylex.props(
          x.marginLeft['0.5rem'],
          x.marginRight['0.5rem'],
          x.width['1rem'],
          x.height['1rem']
        )}
      />
      <Input type='time' step='1' defaultValue='14:30:45' {...stylex.props(x.flex['1'])} />
      <Lucide.Clock
        {...stylex.props(x.color[colorVar.fgNeutralFaded])}
        {...stylex.props(
          x.marginLeft['0.5rem'],
          x.marginRight['0.5rem'],
          x.width['1rem'],
          x.height['1rem']
        )}
      />
    </div>
  )
}
