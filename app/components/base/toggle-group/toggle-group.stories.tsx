import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { ToggleGroup, ToggleGroupItem } from './toggle-group.component'

const meta = {
  title: 'Base Components/ToggleGroup',
  component: ToggleGroup,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ToggleGroup>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  args: { defaultValue: ['bold'] },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value='bold'>Bold</ToggleGroupItem>
      <ToggleGroupItem value='italic'>Italic</ToggleGroupItem>
      <ToggleGroupItem value='underline'>Underline</ToggleGroupItem>
    </ToggleGroup>
  )
}
