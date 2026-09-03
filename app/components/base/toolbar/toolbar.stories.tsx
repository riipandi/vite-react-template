import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarLink,
  ToolbarSeparator
} from './toolbar.component'

const meta = {
  title: 'Base Components/Toolbar',
  component: Toolbar,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Toolbar>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <Toolbar>
      <ToolbarButton>Bold</ToolbarButton>
      <ToolbarButton>Italic</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton>Redo</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarLink href='https://react.dev'>React docs</ToolbarLink>
    </Toolbar>
  )
}
