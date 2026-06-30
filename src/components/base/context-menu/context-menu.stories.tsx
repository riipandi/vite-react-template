import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
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

const meta = {
  title: 'Base Components/ContextMenu',
  component: ContextMenu,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: [],
  args: {},
  decorators: [
    (Story) => (
      <div className='flex w-full min-w-md items-center justify-center p-20'>
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
      <ContextMenuTrigger className='border-muted text-foreground-neutral-faded flex h-48 w-full items-center justify-center rounded border border-dashed select-none'>
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
      <ContextMenuTrigger className='border-muted text-foreground-neutral-faded flex h-48 w-full items-center justify-center rounded border border-dashed select-none'>
        Right click here
      </ContextMenuTrigger>
      <ContextMenuPopup className='w-48'>
        <ContextMenuItem>
          <Icon.BookIcon weight='bold' />
          Open Book
        </ContextMenuItem>
        <ContextMenuSubmenu>
          <ContextMenuSubmenuTrigger>
            <Icon.StackIcon weight='bold' />
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
          <Icon.ScrollIcon weight='bold' />
          View Painting
        </ContextMenuItem>
        <ContextMenuItem>
          <Icon.EyeIcon weight='bold' />
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
      <ContextMenuTrigger className='border-muted text-foreground-neutral-faded flex h-48 w-full items-center justify-center rounded border border-dashed select-none'>
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
      <ContextMenuTrigger className='border-muted text-foreground-neutral-faded flex h-48 w-full items-center justify-center rounded border border-dashed select-none'>
        Right click here
      </ContextMenuTrigger>
      <ContextMenuPopup className='min-w-48'>
        <ContextMenuGroup>
          <ContextMenuGroupLabel>Wizard Profile</ContextMenuGroupLabel>
          <ContextMenuItem>
            <Icon.UserIcon weight='bold' />
            Profile
          </ContextMenuItem>
          <ContextMenuItem>
            <Icon.MagicWandIcon weight='bold' />
            Learn Spell
          </ContextMenuItem>
          <ContextMenuItem>
            <Icon.SlidersHorizontalIcon weight='bold' />
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
            <Hotkey variant='outline' className='ml-auto'>
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
        <ContextMenuItem className='text-danger'>
          Use Unforgivable Curse
          <Hotkey variant='outline' className='ml-auto'>
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
      <ContextMenuTrigger className='border-muted text-foreground-neutral-faded flex h-48 w-full items-center justify-center rounded border border-dashed select-none'>
        Right click here
      </ContextMenuTrigger>
      <ContextMenuPopup size='compact'>
        <ContextMenuItem>
          <Icon.SunIcon weight='bold' />
          Light
        </ContextMenuItem>
        <ContextMenuItem>
          <Icon.MoonIcon weight='bold' />
          Dark
        </ContextMenuItem>
        <ContextMenuItem>
          <Icon.LaptopIcon weight='bold' />
          System
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSubmenu>
          <ContextMenuSubmenuTrigger>
            <Icon.PaletteIcon weight='bold' />
            Custom
          </ContextMenuSubmenuTrigger>
          <ContextMenuSubmenuPopup size='compact'>
            <ContextMenuItem>
              <Icon.PaletteIcon weight='bold' />
              Tokyo Night
            </ContextMenuItem>
            <ContextMenuItem>
              <Icon.PaletteIcon weight='bold' />
              Dracula
            </ContextMenuItem>
            <ContextMenuItem>
              <Icon.PaletteIcon weight='bold' />
              Nord
            </ContextMenuItem>
            <ContextMenuItem>
              <Icon.PaletteIcon weight='bold' />
              Gruvbox
            </ContextMenuItem>
            <ContextMenuItem>
              <Icon.PaletteIcon weight='bold' />
              Catppuccin
            </ContextMenuItem>
          </ContextMenuSubmenuPopup>
        </ContextMenuSubmenu>
      </ContextMenuPopup>
    </ContextMenu>
  )
}
