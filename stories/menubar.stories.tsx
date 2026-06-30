import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { fn } from 'storybook/test'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarLabel,
  MenubarItem,
  MenubarSeparator,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem
} from '#/components/base/menubar'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Menubar',
  component: Menubar,
  parameters: { layout: 'centered' },
  tags: [],
  args: {}
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    alignItems: 'center'
  }
})

export const Playground: Story = {
  name: 'Playground',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='menubar-playground-wrapper'>
      <Menubar id='menubar-playground'>
        <MenubarMenu>
          <MenubarTrigger id='menubar-trigger-file'>File</MenubarTrigger>
          <MenubarContent id='menubar-content-file'>
            <MenubarItem id='menubar-item-new' onMouseEnter={fn()}>
              <Lucide.FilePlus size={16} />
              New file
            </MenubarItem>
            <MenubarItem id='menubar-item-open' onMouseEnter={fn()}>
              <Lucide.FolderOpen size={16} />
              Open...
            </MenubarItem>
            <MenubarSeparator id='menubar-sep-file-1' />
            <MenubarItem id='menubar-item-save' onMouseEnter={fn()}>
              <Lucide.Save size={16} />
              Save
            </MenubarItem>
            <MenubarItem id='menubar-item-save-as' onMouseEnter={fn()}>
              Save as...
            </MenubarItem>
            <MenubarSeparator id='menubar-sep-file-2' />
            <MenubarItem id='menubar-item-exit' onMouseEnter={fn()}>
              <Lucide.LogOut size={16} />
              Exit
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger id='menubar-trigger-edit'>Edit</MenubarTrigger>
          <MenubarContent id='menubar-content-edit'>
            <MenubarItem id='menubar-item-undo' onMouseEnter={fn()}>
              <Lucide.Undo size={16} />
              Undo
            </MenubarItem>
            <MenubarItem id='menubar-item-redo' onMouseEnter={fn()}>
              <Lucide.Redo size={16} />
              Redo
            </MenubarItem>
            <MenubarSeparator id='menubar-sep-edit-1' />
            <MenubarItem id='menubar-item-cut' onMouseEnter={fn()}>
              <Lucide.Scissors size={16} />
              Cut
            </MenubarItem>
            <MenubarItem id='menubar-item-copy' onMouseEnter={fn()}>
              <Lucide.Copy size={16} />
              Copy
            </MenubarItem>
            <MenubarItem id='menubar-item-paste' onMouseEnter={fn()}>
              <Lucide.ClipboardPaste size={16} />
              Paste
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger id='menubar-trigger-view'>View</MenubarTrigger>
          <MenubarContent id='menubar-content-view'>
            <MenubarCheckboxItem id='menubar-checkbox-toolbar' defaultChecked>
              Toolbar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem id='menubar-checkbox-statusbar' defaultChecked>
              Status bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem id='menubar-checkbox-minimap'>Minimap</MenubarCheckboxItem>
            <MenubarSeparator id='menubar-sep-view-1' />
            <MenubarRadioGroup id='menubar-radio-group' defaultValue='list'>
              <MenubarLabel id='menubar-label-layout'>Layout</MenubarLabel>
              <MenubarRadioItem id='menubar-radio-list' value='list'>
                <Lucide.List size={16} />
                List
              </MenubarRadioItem>
              <MenubarRadioItem id='menubar-radio-grid' value='grid'>
                <Lucide.Grid size={16} />
                Grid
              </MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
