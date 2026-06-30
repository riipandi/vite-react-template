import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import {
  ContextMenu,
  ContextMenuPopup,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSubmenuTrigger,
  ContextMenuSubmenu,
  ContextMenuSubmenuPopup,
  ContextMenuGroup,
  ContextMenuRadioItem,
  ContextMenuRadioGroup,
  ContextMenuGroupLabel
} from '#/components/base/context-menu'
import { Hotkey } from '#/components/extra/hotkey'
import { radius, color } from '#/styles/tokens.stylex'

const meta = {
  title: 'Base Components/ContextMenu',
  component: ContextMenu,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [],
  args: {},
  decorators: [
    (Story) => (
      <div
        {...stylex.props(x.minWidth['448px'], x.padding['5rem'])}
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
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {},
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger
        {...stylex.props(x.borderColor[color.borderNeutralFaded], x.color[color.fgNeutralFaded])}
        {...stylex.props(x.borderWidth['1px'], x.borderStyle.dashed)}
        {...stylex.props(
          x.display.flex,
          x.height['48rem'],
          x.width['100%'],
          x.alignItems.center,
          x.justifyContent.center,
          x.borderRadius[radius.md],
          x.userSelect.none
        )}
      >
        Right click here
      </ContextMenuTrigger>
      <ContextMenuPopup>
        <ContextMenuItem>Cast Spell</ContextMenuItem>
        <ContextMenuItem>Brew Potion</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Read Next</ContextMenuItem>
        <ContextMenuItem>Read Later</ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenu>
  )
}

export const WithItemIcon: Story = {
  args: {},
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger
        {...stylex.props(x.borderColor[color.borderNeutralFaded], x.color[color.fgNeutralFaded])}
        {...stylex.props(x.borderWidth['1px'], x.borderStyle.dashed)}
        {...stylex.props(
          x.display.flex,
          x.height['48rem'],
          x.width['100%'],
          x.alignItems.center,
          x.justifyContent.center,
          x.borderRadius[radius.md],
          x.userSelect.none
        )}
      >
        Right click here
      </ContextMenuTrigger>
      <ContextMenuPopup {...stylex.props(x.width['12rem'])}>
        <ContextMenuItem>
          <Lucide.Book />
          Open Book
        </ContextMenuItem>
        <ContextMenuSubmenu>
          <ContextMenuSubmenuTrigger>
            <Lucide.Layers />
            Select Novel
          </ContextMenuSubmenuTrigger>
          <ContextMenuSubmenuPopup>
            <ContextMenuItem>The Da Vinci Code</ContextMenuItem>
            <ContextMenuItem>Angels & Demons</ContextMenuItem>
            <ContextMenuItem>Harry Potter</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>All Books</ContextMenuItem>
          </ContextMenuSubmenuPopup>
        </ContextMenuSubmenu>
        <ContextMenuItem>
          <Lucide.ScrollText />
          View Painting
        </ContextMenuItem>
        <ContextMenuItem>
          <Lucide.Eye />
          Examine Clue
        </ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenu>
  )
}

export const NestedSubMenu: Story = {
  args: {},
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger
        {...stylex.props(x.borderColor[color.borderNeutralFaded], x.color[color.fgNeutralFaded])}
        {...stylex.props(x.borderWidth['1px'], x.borderStyle.dashed)}
        {...stylex.props(
          x.display.flex,
          x.height['48rem'],
          x.width['100%'],
          x.alignItems.center,
          x.justifyContent.center,
          x.borderRadius[radius.md],
          x.userSelect.none
        )}
      >
        Right click here
      </ContextMenuTrigger>
      <ContextMenuPopup>
        <ContextMenuItem>Add to Collection</ContextMenuItem>
        <ContextMenuSubmenu>
          <ContextMenuSubmenuTrigger>Add to Reading List</ContextMenuSubmenuTrigger>
          <ContextMenuSubmenuPopup>
            <ContextMenuItem>Recently Added</ContextMenuItem>
            <ContextMenuItem>Currently Reading</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuSubmenu>
              <ContextMenuSubmenuTrigger>More</ContextMenuSubmenuTrigger>
              <ContextMenuSubmenuPopup>
                <ContextMenuItem>Dan Brown Collection</ContextMenuItem>
                <ContextMenuItem>Harry Potter Series</ContextMenuItem>
                <ContextMenuItem>Mystery Novels</ContextMenuItem>
                <ContextMenuItem>Fantasy Books</ContextMenuItem>
              </ContextMenuSubmenuPopup>
            </ContextMenuSubmenu>
          </ContextMenuSubmenuPopup>
        </ContextMenuSubmenu>
        <ContextMenuItem>Add to Queue</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Read Next</ContextMenuItem>
        <ContextMenuItem>Read Later</ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenu>
  )
}

export const AdvanceMenu: Story = {
  args: {},
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger
        {...stylex.props(x.borderColor[color.borderNeutralFaded], x.color[color.fgNeutralFaded])}
        {...stylex.props(x.borderWidth['1px'], x.borderStyle.dashed)}
        {...stylex.props(
          x.display.flex,
          x.height['48rem'],
          x.width['100%'],
          x.alignItems.center,
          x.justifyContent.center,
          x.borderRadius[radius.md],
          x.userSelect.none
        )}
      >
        Right click here
      </ContextMenuTrigger>
      <ContextMenuPopup {...stylex.props(x.minWidth['12rem'])}>
        <ContextMenuGroup>
          <ContextMenuGroupLabel>Wizard Profile</ContextMenuGroupLabel>
          <ContextMenuItem>
            <Lucide.User />
            Profile
          </ContextMenuItem>
          <ContextMenuItem>
            <Lucide.Wand />
            Learn Spell
          </ContextMenuItem>
          <ContextMenuItem>
            <Lucide.SlidersHorizontal />
            Settings
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuGroupLabel>Magical Settings</ContextMenuGroupLabel>
          <ContextMenuSubmenu>
            <ContextMenuSubmenuTrigger>Wand Core</ContextMenuSubmenuTrigger>
            <ContextMenuSubmenuPopup>
              <ContextMenuItem>Phoenix Feather</ContextMenuItem>
              <ContextMenuItem>Dragon Heartstring</ContextMenuItem>
              <ContextMenuItem>Unicorn Hair</ContextMenuItem>
            </ContextMenuSubmenuPopup>
          </ContextMenuSubmenu>
          <ContextMenuItem>
            Toggle Spellbook
            <Hotkey variant='outline' {...stylex.props(x.marginLeft.auto)}>
              ⌘ B
            </Hotkey>
          </ContextMenuItem>
          <ContextMenuSubmenu>
            <ContextMenuSubmenuTrigger>Hogwarts House</ContextMenuSubmenuTrigger>
            <ContextMenuSubmenuPopup>
              <ContextMenuRadioGroup defaultValue='gryffindor'>
                <ContextMenuRadioItem value='gryffindor'>Gryffindor</ContextMenuRadioItem>
                <ContextMenuRadioItem value='slytherin'>Slytherin</ContextMenuRadioItem>
                <ContextMenuRadioItem value='ravenclaw'>Ravenclaw</ContextMenuRadioItem>
                <ContextMenuRadioItem value='hufflepuff'>Hufflepuff</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuSubmenuPopup>
          </ContextMenuSubmenu>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem {...stylex.props(x.color[color.fgCritical])}>
          Use Unforgivable Curse
          <Hotkey variant='outline' {...stylex.props(x.marginLeft.auto)}>
            ⌘ Q
          </Hotkey>
        </ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenu>
  )
}

export const CompactMenu: Story = {
  args: {},
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger
        {...stylex.props(x.borderColor[color.borderNeutralFaded], x.color[color.fgNeutralFaded])}
        {...stylex.props(x.borderWidth['1px'], x.borderStyle.dashed)}
        {...stylex.props(
          x.display.flex,
          x.height['48rem'],
          x.width['100%'],
          x.alignItems.center,
          x.justifyContent.center,
          x.borderRadius[radius.md],
          x.userSelect.none
        )}
      >
        Right click here
      </ContextMenuTrigger>
      <ContextMenuPopup size='compact'>
        <ContextMenuItem>
          <Lucide.Sun />
          Light
        </ContextMenuItem>
        <ContextMenuItem>
          <Lucide.Moon />
          Dark
        </ContextMenuItem>
        <ContextMenuItem>
          <Lucide.Laptop />
          System
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSubmenu>
          <ContextMenuSubmenuTrigger>
            <Lucide.Palette />
            Custom
          </ContextMenuSubmenuTrigger>
          <ContextMenuSubmenuPopup size='compact'>
            <ContextMenuItem>
              <Lucide.Palette />
              Tokyo Night
            </ContextMenuItem>
            <ContextMenuItem>
              <Lucide.Palette />
              Dracula
            </ContextMenuItem>
            <ContextMenuItem>
              <Lucide.Palette />
              Nord
            </ContextMenuItem>
            <ContextMenuItem>
              <Lucide.Palette />
              Gruvbox
            </ContextMenuItem>
            <ContextMenuItem>
              <Lucide.Palette />
              Catppuccin
            </ContextMenuItem>
          </ContextMenuSubmenuPopup>
        </ContextMenuSubmenu>
      </ContextMenuPopup>
    </ContextMenu>
  )
}
