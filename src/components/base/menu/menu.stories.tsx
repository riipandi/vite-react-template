import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
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

const meta = {
  title: 'Base Components/Menu',
  component: Menu,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [], // ['autodocs']
  args: {},
  decorators: [
    (Story) => (
      <div className='flex w-full min-w-md items-center justify-center'>
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
        Menu <Icon.CaretDownIcon weight='bold' />
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
        Menu <Icon.CaretDownIcon weight='bold' />
      </MenuTrigger>
      <MenuPopup className='w-48'>
        <MenuItem>
          <Icon.BookIcon weight='bold' />
          Open Book
        </MenuItem>
        <MenuSubmenu>
          <MenuSubmenuTrigger>
            <Icon.StackIcon weight='bold' />
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
          <Icon.CameraIcon weight='bold' />
          View Painting
        </MenuItem>
        <MenuItem>
          <Icon.VideoIcon weight='bold' />
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
        Menu <Icon.CaretDownIcon weight='bold' />
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
        Menu <Icon.CaretDownIcon weight='bold' />
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
        Menu <Icon.CaretDownIcon weight='bold' />
      </MenuTrigger>
      <MenuPopup className='min-w-48'>
        <MenuGroup>
          <MenuGroupLabel>Account</MenuGroupLabel>
          <MenuItem>
            <Icon.UserIcon weight='bold' />
            Profile
          </MenuItem>
          <MenuItem>
            <Icon.RocketIcon weight='bold' />
            Upgrade Plan
          </MenuItem>
          <MenuItem>
            <Icon.SlidersHorizontalIcon weight='bold' />
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
            <Hotkey color='neutral' variant='outline' className='ml-auto'>
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
        <MenuItem className='text-danger'>
          Quit App
          <Hotkey color='neutral' variant='outline' className='ml-auto'>
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
        Menu <Icon.CaretDownIcon weight='bold' />
      </MenuTrigger>
      <MenuPopup size='compact'>
        <MenuItem>
          <Icon.SunIcon weight='bold' />
          Light
        </MenuItem>
        <MenuItem>
          <Icon.MoonIcon weight='bold' />
          Dark
        </MenuItem>
        <MenuItem>
          <Icon.LaptopIcon weight='bold' />
          System
        </MenuItem>
        <MenuSeparator />
        <MenuSubmenu>
          <MenuSubmenuTrigger>
            <Icon.PaletteIcon weight='bold' />
            Custom
          </MenuSubmenuTrigger>
          <MenuSubmenuPopup size='compact'>
            <MenuItem>
              <Icon.PaletteIcon weight='bold' />
              Tokyo Night
            </MenuItem>
            <MenuItem>
              <Icon.PaletteIcon weight='bold' />
              Dracula
            </MenuItem>
            <MenuItem>
              <Icon.PaletteIcon weight='bold' />
              Nord
            </MenuItem>
            <MenuItem>
              <Icon.PaletteIcon weight='bold' />
              Gruvbox
            </MenuItem>
            <MenuItem>
              <Icon.PaletteIcon weight='bold' />
              Catppuccin
            </MenuItem>
          </MenuSubmenuPopup>
        </MenuSubmenu>
      </MenuPopup>
    </Menu>
  )
}
