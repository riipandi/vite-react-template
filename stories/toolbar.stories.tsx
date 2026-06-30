import type { Meta, StoryObj } from '@storybook/react-vite'
import * as Lucide from 'lucide-react'
import { fn } from 'storybook/test'
import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarGroup,
  ToolbarInput
} from '#/components/base/toolbar'

const meta = {
  title: 'Component/Toolbar',
  component: Toolbar,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [],
  args: {}
} satisfies Meta<typeof Toolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  name: 'Playground',
  parameters: { controls: { disable: true } },
  render: () => (
    <Toolbar id='toolbar-playground'>
      <ToolbarGroup id='tb-playgroup-text'>
        <ToolbarButton id='tb-play-bold' onClick={fn()}>
          <Lucide.Bold size={16} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton id='tb-play-italic' onClick={fn()}>
          <Lucide.Italic size={16} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton id='tb-play-underline' onClick={fn()}>
          <Lucide.Underline size={16} strokeWidth={2} />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator id='tb-play-sep1' />
      <ToolbarGroup id='tb-playgroup-align'>
        <ToolbarButton id='tb-play-align-left' onClick={fn()}>
          <Lucide.AlignLeft size={16} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton id='tb-play-align-center' onClick={fn()}>
          <Lucide.AlignCenter size={16} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton id='tb-play-align-right' onClick={fn()}>
          <Lucide.AlignRight size={16} strokeWidth={2} />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator id='tb-play-sep2' />
      <ToolbarInput placeholder='Search...' id='tb-play-input' />
    </Toolbar>
  )
}

export const Default: Story = {
  name: 'Default',
  parameters: { controls: { disable: true } },
  render: () => (
    <Toolbar id='toolbar-default'>
      <ToolbarGroup id='tb-default-list'>
        <ToolbarButton id='tb-default-list-bullet' onClick={fn()}>
          <Lucide.List size={16} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton id='tb-default-list-ordered' onClick={fn()}>
          <Lucide.ListOrdered size={16} strokeWidth={2} />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator id='tb-default-sep1' />
      <ToolbarGroup id='tb-default-indent'>
        <ToolbarButton id='tb-default-outdent' onClick={fn()}>
          <Lucide.IndentDecrease size={16} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton id='tb-default-indent' onClick={fn()}>
          <Lucide.IndentIncrease size={16} strokeWidth={2} />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator id='tb-default-sep2' />
      <ToolbarButton id='tb-default-link' onClick={fn()}>
        <Lucide.Link2 size={16} strokeWidth={2} />
      </ToolbarButton>
      <ToolbarButton id='tb-default-image' onClick={fn()}>
        <Lucide.Image size={16} strokeWidth={2} />
      </ToolbarButton>
      <ToolbarSeparator id='tb-default-sep3' />
      <ToolbarInput placeholder='Insert URL...' id='tb-default-input' />
    </Toolbar>
  )
}
