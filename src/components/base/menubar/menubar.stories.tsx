import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '#/components/base/button'
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuSubmenuPopup,
  MenuTrigger
} from '#/components/base/menu'
import { Menubar } from '#/components/base/menubar'

const meta = {
  title: 'Base Components/Menubar',
  component: Menubar,
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
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <Menubar>
      <Menu>
        <MenuTrigger render={<Button color='neutral' variant='ghost' />}>Book</MenuTrigger>
        <MenuPopup size='compact'>
          <MenuItem>New Book</MenuItem>
          <MenuItem>Open</MenuItem>
          <MenuItem>Save</MenuItem>
          <MenuSubmenu>
            <MenuSubmenuTrigger>Export</MenuSubmenuTrigger>
            <MenuSubmenuPopup size='compact'>
              <MenuItem>PDF</MenuItem>
              <MenuItem>EPUB</MenuItem>
              <MenuItem>MOBI</MenuItem>
            </MenuSubmenuPopup>
          </MenuSubmenu>
          <MenuSeparator />
          <MenuItem>Close App</MenuItem>
        </MenuPopup>
      </Menu>
      <Menu>
        <MenuTrigger render={<Button color='neutral' variant='ghost' />}>Edit</MenuTrigger>
        <MenuPopup size='compact'>
          <MenuItem>Copy Spell</MenuItem>
          <MenuItem>Paste Clue</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuPopup>
      </Menu>
      <Menu>
        <MenuTrigger render={<Button color='neutral' variant='ghost' />}>View</MenuTrigger>
        <MenuPopup size='compact'>
          <MenuItem>Zoom In</MenuItem>
          <MenuItem>Zoom Out</MenuItem>
          <MenuSubmenu>
            <MenuSubmenuTrigger>Layout</MenuSubmenuTrigger>
            <MenuSubmenuPopup size='compact'>
              <MenuItem>Single Page</MenuItem>
              <MenuItem>Two Pages</MenuItem>
              <MenuItem>Continuous</MenuItem>
            </MenuSubmenuPopup>
          </MenuSubmenu>
          <MenuSeparator />
          <MenuItem>Full Screen</MenuItem>
        </MenuPopup>
      </Menu>
    </Menubar>
  )
}

export const Compact: Story = {
  args: {},
  render: () => (
    <Menubar>
      <Menu>
        <MenuTrigger render={<Button color='neutral' variant='ghost' size='sm' />}>
          Book
        </MenuTrigger>
        <MenuPopup size='compact'>
          <MenuItem>New Book</MenuItem>
          <MenuItem>Open</MenuItem>
          <MenuItem>Save</MenuItem>
          <MenuSubmenu>
            <MenuSubmenuTrigger>Export</MenuSubmenuTrigger>
            <MenuSubmenuPopup size='compact'>
              <MenuItem>PDF</MenuItem>
              <MenuItem>EPUB</MenuItem>
              <MenuItem>MOBI</MenuItem>
            </MenuSubmenuPopup>
          </MenuSubmenu>
          <MenuSeparator />
          <MenuItem>Close App</MenuItem>
        </MenuPopup>
      </Menu>
      <Menu>
        <MenuTrigger render={<Button color='neutral' variant='ghost' size='sm' />}>
          Edit
        </MenuTrigger>
        <MenuPopup size='compact'>
          <MenuItem>Copy Spell</MenuItem>
          <MenuItem>Paste Clue</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuPopup>
      </Menu>
      <Menu>
        <MenuTrigger render={<Button color='neutral' variant='ghost' size='sm' />}>
          View
        </MenuTrigger>
        <MenuPopup size='compact'>
          <MenuItem>Zoom In</MenuItem>
          <MenuItem>Zoom Out</MenuItem>
          <MenuSubmenu>
            <MenuSubmenuTrigger>Layout</MenuSubmenuTrigger>
            <MenuSubmenuPopup size='compact'>
              <MenuItem>Single Page</MenuItem>
              <MenuItem>Two Pages</MenuItem>
              <MenuItem>Continuous</MenuItem>
            </MenuSubmenuPopup>
          </MenuSubmenu>
          <MenuSeparator />
          <MenuItem>Full Screen</MenuItem>
        </MenuPopup>
      </Menu>
    </Menubar>
  )
}
