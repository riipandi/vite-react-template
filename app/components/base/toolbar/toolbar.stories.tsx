import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'
import { Button } from '#/components/base/button'
import { Toggle } from '#/components/base/toggle'
import { ToggleGroup, ToggleGroupItem } from '#/components/base/toggle-group'
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from './toolbar.component'

const meta = {
  title: 'Base Components/Toolbar',
  component: Toolbar,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Toolbar>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  icon: { width: 16, height: 16 }
})

export default meta

export const Playground: Story = {
  render: () => (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton render={<Toggle aria-label='Toggle charm' />}>Charm</ToolbarButton>
        <ToolbarButton render={<Toggle aria-label='Toggle hex' />}>Hex</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton render={<Button variant='ghost' size='sm' />}>Send by Owl</ToolbarButton>
    </Toolbar>
  )
}

export const WithToggleGroup: Story = {
  name: 'With a toggle group',
  render: () => (
    <Toolbar>
      <ToggleGroup variant='outline' spacing='joined' defaultValue={['left']}>
        <ToolbarButton render={<ToggleGroupItem value='left' aria-label='Align left' />}>
          <AlignLeftIcon {...stylex.props(styles.icon)} />
        </ToolbarButton>
        <ToolbarButton render={<ToggleGroupItem value='center' aria-label='Align center' />}>
          <AlignCenterIcon {...stylex.props(styles.icon)} />
        </ToolbarButton>
        <ToolbarButton render={<ToggleGroupItem value='right' aria-label='Align right' />}>
          <AlignRightIcon {...stylex.props(styles.icon)} />
        </ToolbarButton>
      </ToggleGroup>
      <ToolbarSeparator />
      <ToolbarButton render={<Button variant='ghost' size='sm' />}>Accio</ToolbarButton>
    </Toolbar>
  )
}
