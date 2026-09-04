import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from './menubar.component'

const meta = {
  title: 'Base Components/Menubar',
  component: Menubar,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Menubar>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Grimoire</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New scroll
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New parchment
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Dispatch</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Send by owl</MenubarItem>
              <MenubarItem>Message Bezu Fache</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Transcribe…
            <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Cryptex</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Rotate dial left
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Rotate dial right
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Divination</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem defaultChecked>
            Always show the Marauder&apos;s Map bar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem>Always show full incantations</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup defaultValue='andy'>
            <MenubarRadioItem value='andy'>Gryffindor</MenubarRadioItem>
            <MenubarRadioItem value='benoit'>Slytherin</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export const Checkbox: Story = {
  name: 'Checkbox items',
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Divination</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem defaultChecked>
            Always show the Marauder&apos;s Map bar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem>Always show full incantations</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarCheckboxItem>Show crystal ball preview</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export const Radio: Story = {
  name: 'Radio group',
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Ministry staff</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup defaultValue='andy'>
            <MenubarRadioItem value='andy'>Harry</MenubarRadioItem>
            <MenubarRadioItem value='benoit'>Ron</MenubarRadioItem>
            <MenubarRadioItem value='luis'>Hermione</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export const Submenu: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Grimoire</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New scroll</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Dispatch</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Send by owl</MenubarItem>
              <MenubarItem>Message Bezu Fache</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Copy incantation</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
