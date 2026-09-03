import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { RadioGroup, RadioGroupItem } from './radio.component'

const meta = {
  title: 'Base Components/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof RadioGroup>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { defaultValue: 'default' },
  render: (args) => (
    <RadioGroup {...args}>
      <div {...stylex.props(atoms.display.flex, atoms.flexDirection.column, atoms.gap['8px'])}>
        <label {...stylex.props(atoms.display.flex, atoms.alignItems.center, atoms.gap['8px'])}>
          <RadioGroupItem value='default' />
          Default
        </label>
        <label {...stylex.props(atoms.display.flex, atoms.alignItems.center, atoms.gap['8px'])}>
          <RadioGroupItem value='comfortable' />
          Comfortable
        </label>
        <label {...stylex.props(atoms.display.flex, atoms.alignItems.center, atoms.gap['8px'])}>
          <RadioGroupItem value='compact' />
          Compact
        </label>
      </div>
    </RadioGroup>
  )
}
