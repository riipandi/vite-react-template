import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { InputGroup, InputGroupButton, InputGroupInput } from './input-group.component'

const meta = {
  title: 'Extra Components/InputGroup',
  component: InputGroup,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof InputGroup>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder='Search the docs…' />
      <InputGroupButton>Search</InputGroupButton>
    </InputGroup>
  )
}
