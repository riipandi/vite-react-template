import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Input } from './input.component'

const meta = {
  title: 'Base Components/Input',
  component: Input,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    disabled: { control: 'boolean' }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Input>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { placeholder: 'Type something…' },
  render: (args) => <Input {...args} />
}
