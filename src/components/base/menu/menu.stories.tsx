import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { Button } from '#/components/base/button'
import {
  Menu,
  MenuPopup,
  MenuItem,
  MenuTrigger,
  MenuSeparator,
  MenuSubmenuTrigger,
  MenuSubmenu,
  MenuSubmenuPopup,
  MenuGroup,
  MenuRadioItem,
  MenuRadioGroup,
  MenuGroupLabel
} from '#/components/base/menu'
import { Hotkey } from '#/components/extra/hotkey'
import { color } from '#/styles/tokens.stylex'

const meta = {
  title: 'Base Components/Menu',
  component: Menu,
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
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <Menu>
      <MenuTrigger render={<Button color='neutral' variant='outline' />}>
        Menu <Lucide.ChevronDown />
      </MenuTrigger>
      <MenuPopup>
        <MenuItem>Cast Spell</MenuItem>
        <MenuItem>Brew Potion</MenuItem>
        <MenuSeparator />
        <MenuItem>Read Ancient Text</MenuItem>
        <MenuItem>Decode Symbol</MenuItem>
      </MenuPopup>
    </Menu>
  )
}

export const WithItemIcon: Story = {
  args: {},
  render: () => (
    <Menu>
      <MenuTrigger render={<Button color='neutral' variant='outline' />}>
        Menu <Lucide.ChevronDown />
      </MenuTrigger>
      <MenuPopup {...stylex.props(x.width['12rem'])}>
        <MenuItem>
          <Lucide.Book />
          Open Book
        </MenuItem>
        <MenuSubmenu>
          <MenuSubmenuTrigger>
            <Lucide.Layers />
            Select Novel
          </MenuSubmenuTrigger>
          <MenuPopup>
            <MenuItem>The Da Vinci Code</MenuItem>
            <MenuItem>Angels & Demons</MenuItem>
            <MenuItem>Harry Potter</MenuItem>
            <MenuSeparator />
            <MenuItem>All Books</MenuItem>
          </MenuPopup>
        </MenuSubmenu>
        <MenuItem>
          <Lucide.Camera />
          View Painting
        </MenuItem>
        <MenuItem>
          <Lucide.Video />
          Watch Scene
        </MenuItem>
      </MenuPopup>
    </Menu>
  )
}

export const NestedSubMenu: Story = {
  args: {},
  render: () => (
    <Menu>
      <MenuTrigger render={<Button color='neutral' variant='outline' />}>
        Menu <Lucide.ChevronDown />
      </MenuTrigger>
      <MenuPopup>
        <MenuItem>Add to Collection</MenuItem>
        <MenuSubmenu>
          <MenuSubmenuTrigger>Add to Reading List</MenuSubmenuTrigger>
          <MenuSubmenuPopup>
            <MenuItem>Recently Added</MenuItem>
            <MenuItem>Currently Reading</MenuItem>
            <MenuSeparator />
            <MenuSubmenu>
              <MenuSubmenuTrigger>More</MenuSubmenuTrigger>
              <MenuSubmenuPopup>
                <MenuItem>Dan Brown Collection</MenuItem>
                <MenuItem>Harry Potter Series</MenuItem>
                <MenuItem>Mystery Novels</MenuItem>
                <MenuItem>Fantasy Books</MenuItem>
              </MenuSubmenuPopup>
            </MenuSubmenu>
          </MenuSubmenuPopup>
        </MenuSubmenu>
        <MenuItem>Add to Queue</MenuItem>
        <MenuSeparator />
        <MenuItem>Read Next</MenuItem>
        <MenuItem>Read Later</MenuItem>
      </MenuPopup>
    </Menu>
  )
}

export const NestedCompact: Story = {
  args: {},
  render: () => (
    <Menu>
      <MenuTrigger render={<Button color='neutral' variant='outline' size-='sm' />}>
        Menu <Lucide.ChevronDown />
      </MenuTrigger>
      <MenuPopup size='compact'>
        <MenuItem>Add to Collection</MenuItem>
        <MenuSubmenu>
          <MenuSubmenuTrigger>Add to Reading List</MenuSubmenuTrigger>
          <MenuSubmenuPopup size='compact'>
            <MenuItem>Recently Added</MenuItem>
            <MenuItem>Currently Reading</MenuItem>
            <MenuSeparator />
            <MenuSubmenu>
              <MenuSubmenuTrigger>More</MenuSubmenuTrigger>
              <MenuSubmenuPopup size='compact'>
                <MenuItem>Dan Brown Collection</MenuItem>
                <MenuItem>Harry Potter Series</MenuItem>
                <MenuItem>Mystery Novels</MenuItem>
                <MenuItem>Fantasy Books</MenuItem>
              </MenuSubmenuPopup>
            </MenuSubmenu>
          </MenuSubmenuPopup>
        </MenuSubmenu>
        <MenuItem>Add to Queue</MenuItem>
        <MenuSeparator />
        <MenuItem>Read Next</MenuItem>
        <MenuItem>Read Later</MenuItem>
      </MenuPopup>
    </Menu>
  )
}

export const AdvanceMenu: Story = {
  args: {},
  render: () => (
    <Menu>
      <MenuTrigger render={<Button color='neutral' variant='outline' />}>
        Menu <Lucide.ChevronDown />
      </MenuTrigger>
      <MenuPopup {...stylex.props(x.minWidth['12rem'])}>
        <MenuGroup>
          <MenuGroupLabel>Account</MenuGroupLabel>
          <MenuItem>
            <Lucide.User />
            Profile
          </MenuItem>
          <MenuItem>
            <Lucide.Rocket />
            Upgrade Plan
          </MenuItem>
          <MenuItem>
            <Lucide.SlidersHorizontal />
            Settings
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Appearances</MenuGroupLabel>
          <MenuSubmenu>
            <MenuSubmenuTrigger>Theme</MenuSubmenuTrigger>
            <MenuPopup>
              <MenuItem>Light</MenuItem>
              <MenuItem>Dark</MenuItem>
              <MenuItem>System</MenuItem>
            </MenuPopup>
          </MenuSubmenu>
          <MenuItem>
            Toggle Sidebar
            <Hotkey color='neutral' variant='outline' {...stylex.props(x.marginLeft.auto)}>
              ⌘ B
            </Hotkey>
          </MenuItem>
          <MenuSubmenu>
            <MenuSubmenuTrigger>Sidebar Position</MenuSubmenuTrigger>
            <MenuPopup>
              <MenuRadioGroup defaultValue='left'>
                <MenuRadioItem value='left'>Left</MenuRadioItem>
                <MenuRadioItem value='right'>Right</MenuRadioItem>
              </MenuRadioGroup>
            </MenuPopup>
          </MenuSubmenu>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem {...stylex.props(x.color[color.fgCritical])}>
          Quit App
          <Hotkey color='neutral' variant='outline' {...stylex.props(x.marginLeft.auto)}>
            ⌘ Q
          </Hotkey>
        </MenuItem>
      </MenuPopup>
    </Menu>
  )
}

export const CompactMenu: Story = {
  args: {},
  render: () => (
    <Menu>
      <MenuTrigger render={<Button color='neutral' variant='outline' size='sm' />}>
        Menu <Lucide.ChevronDown />
      </MenuTrigger>
      <MenuPopup size='compact'>
        <MenuItem>
          <Lucide.Sun />
          Light
        </MenuItem>
        <MenuItem>
          <Lucide.Moon />
          Dark
        </MenuItem>
        <MenuItem>
          <Lucide.Laptop />
          System
        </MenuItem>
        <MenuSeparator />
        <MenuSubmenu>
          <MenuSubmenuTrigger>
            <Lucide.Palette />
            Custom
          </MenuSubmenuTrigger>
          <MenuSubmenuPopup size='compact'>
            <MenuItem>
              <Lucide.Palette />
              Tokyo Night
            </MenuItem>
            <MenuItem>
              <Lucide.Palette />
              Dracula
            </MenuItem>
            <MenuItem>
              <Lucide.Palette />
              Nord
            </MenuItem>
            <MenuItem>
              <Lucide.Palette />
              Gruvbox
            </MenuItem>
            <MenuItem>
              <Lucide.Palette />
              Catppuccin
            </MenuItem>
          </MenuSubmenuPopup>
        </MenuSubmenu>
      </MenuPopup>
    </Menu>
  )
}
