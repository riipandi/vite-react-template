import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { fn } from 'storybook/test'
import { Button } from '#/components/base/button'
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuSeparator,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSubmenu,
  MenuSubmenuTrigger
} from '#/components/base/menu'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Menu',
  component: Menu,
  parameters: { layout: 'centered' },
  argTypes: {
    open: { control: 'boolean' }
  },
  tags: [],
  args: {}
} satisfies Meta<typeof Menu>

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
    <div {...stylex.props(layoutStyles.wrapper)} id='menu-playground-wrapper'>
      <Menu>
        <MenuTrigger id='menu-playground-trigger'>
          <Button id='menu-playground-button'>Open menu</Button>
        </MenuTrigger>
        <MenuContent id='menu-playground-content'>
          <MenuItem id='menu-playground-item-1' onMouseEnter={fn()}>
            <Lucide.User size={16} />
            Profile
          </MenuItem>
          <MenuItem id='menu-playground-item-2' onMouseEnter={fn()}>
            <Lucide.Settings size={16} />
            Settings
          </MenuItem>
          <MenuItem id='menu-playground-item-3' onMouseEnter={fn()}>
            <Lucide.Bell size={16} />
            Notifications
          </MenuItem>
          <MenuSeparator id='menu-playground-sep-1' />
          <MenuSubmenu>
            <MenuSubmenuTrigger id='menu-playground-sub-trigger'>
              <Lucide.Share2 size={16} />
              Share
            </MenuSubmenuTrigger>
            <MenuContent id='menu-playground-sub-content'>
              <MenuItem id='menu-playground-sub-item-1' onMouseEnter={fn()}>
                <Lucide.Mail size={16} />
                Email
              </MenuItem>
              <MenuItem id='menu-playground-sub-item-2' onMouseEnter={fn()}>
                <Lucide.Link size={16} />
                Copy link
              </MenuItem>
            </MenuContent>
          </MenuSubmenu>
          <MenuSeparator id='menu-playground-sep-2' />
          <MenuItem id='menu-playground-item-4' onMouseEnter={fn()}>
            <Lucide.LogOut size={16} />
            Log out
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  )
}

const checkboxWrapperStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    alignItems: 'center',
    padding: space[8]
  }
})

export const WithCheckboxes: Story = {
  name: 'With Checkboxes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(checkboxWrapperStyles.wrapper)} id='menu-checkbox-wrapper'>
      <Menu>
        <MenuTrigger id='menu-checkbox-trigger'>
          <Button id='menu-checkbox-button'>View options</Button>
        </MenuTrigger>
        <MenuContent id='menu-checkbox-content'>
          <MenuGroup id='menu-checkbox-group'>
            <MenuGroupLabel id='menu-checkbox-group-label'>Columns</MenuGroupLabel>
            <MenuCheckboxItem id='menu-checkbox-item-1' defaultChecked>
              <Lucide.Eye size={16} />
              Name
            </MenuCheckboxItem>
            <MenuCheckboxItem id='menu-checkbox-item-2' defaultChecked>
              <Lucide.Eye size={16} />
              Status
            </MenuCheckboxItem>
            <MenuCheckboxItem id='menu-checkbox-item-3'>
              <Lucide.EyeOff size={16} />
              Role
            </MenuCheckboxItem>
            <MenuCheckboxItem id='menu-checkbox-item-4' defaultChecked>
              <Lucide.Eye size={16} />
              Email
            </MenuCheckboxItem>
          </MenuGroup>
        </MenuContent>
      </Menu>
    </div>
  )
}

export const WithRadio: Story = {
  name: 'With Radio Group',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(checkboxWrapperStyles.wrapper)} id='menu-radio-wrapper'>
      <Menu>
        <MenuTrigger id='menu-radio-trigger'>
          <Button id='menu-radio-button'>Sort by</Button>
        </MenuTrigger>
        <MenuContent id='menu-radio-content'>
          <MenuRadioGroup id='menu-radio-group' defaultValue='name'>
            <MenuRadioItem id='menu-radio-item-1' value='name'>
              <Lucide.ArrowUpDown size={16} />
              Name
            </MenuRadioItem>
            <MenuRadioItem id='menu-radio-item-2' value='date'>
              <Lucide.Calendar size={16} />
              Date
            </MenuRadioItem>
            <MenuRadioItem id='menu-radio-item-3' value='size'>
              <Lucide.HardDrive size={16} />
              Size
            </MenuRadioItem>
          </MenuRadioGroup>
        </MenuContent>
      </Menu>
    </div>
  )
}
