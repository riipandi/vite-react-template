import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Button } from '#/components/base/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from './dropdown-menu.component'

const meta = {
  title: 'Base Components/DropdownMenu',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          atoms.display.flex,
          atoms.justifyContent.center,
          atoms.padding['20px'],
          atoms.minWidth['448px'],
          atoms.width['100%']
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof DropdownMenu>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant='outline' />}>Open the menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Gringotts</DropdownMenuLabel>
          <DropdownMenuItem>Vault holder</DropdownMenuItem>
          <DropdownMenuItem>Galleon balance</DropdownMenuItem>
          <DropdownMenuItem>Vault settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Disapparate</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    const body = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Open the menu' }))
    await body.findByRole('menu')
    expect(body.getByRole('menuitem', { name: 'Vault holder' })).toBeInTheDocument()

    // Escape dismisses the menu.
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByRole('menu')).toBeNull())
  }
}

export const DisabledItem: Story = {
  name: 'Disabled item',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant='outline' />}>Spells</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Gemino</DropdownMenuItem>
          <DropdownMenuItem disabled>Archive (Ministry pending)</DropdownMenuItem>
          <DropdownMenuItem>Evanesco</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const Checkboxes: Story = {
  name: 'Checkbox and radio items',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant='outline' />}>Map options</DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Menu labels are Base UI GroupLabels — they must live inside a
            Group or RadioGroup. */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Enchantments</DropdownMenuLabel>
          <DropdownMenuCheckboxItem defaultChecked>Show whispers</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Show traces</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup defaultValue='bottom'>
          <DropdownMenuLabel>Map position</DropdownMenuLabel>
          <DropdownMenuRadioItem value='top'>Ceiling</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='bottom'>Floor</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvas }) => {
    const body = within(document.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Map options' }))
    await body.findByRole('menu')

    // Checkbox items toggle open state.
    const traces = body.getByRole('menuitemcheckbox', { name: 'Show traces' })
    expect(traces).toHaveAttribute('aria-checked', 'false')
    await userEvent.click(traces)
    expect(traces).toHaveAttribute('aria-checked', 'true')

    // Radio items switch exclusively.
    await userEvent.click(body.getByRole('menuitemradio', { name: 'Ceiling' }))
    expect(body.getByRole('menuitemradio', { name: 'Ceiling' })).toHaveAttribute(
      'aria-checked',
      'true'
    )
    expect(body.getByRole('menuitemradio', { name: 'Floor' })).toHaveAttribute(
      'aria-checked',
      'false'
    )
  }
}

export const RadioGroup: Story = {
  name: 'Radio group',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant='outline' />}>
        Incantation size
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Menu labels are Base UI GroupLabels — they must live inside a
            Group or RadioGroup. */}
        <DropdownMenuRadioGroup defaultValue='md'>
          <DropdownMenuLabel>Scroll size</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value='sm'>Imp</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='md'>Wizard</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='lg'>Giant</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const Shortcuts: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant='outline' />}>
        Edit the Prophet
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          Sever
          <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Gemino
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Reparo
          <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Select every scroll
          <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const Destructive: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant='outline' />}>
        Prophet article options
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Revise</DropdownMenuItem>
        <DropdownMenuItem>Gemino</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive'>Evanesco</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const Submenu: Story = {
  name: 'Submenu, shortcuts, destructive',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant='outline' />}>Quill actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          New article
          <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Send by Owl</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Email the Prophet</DropdownMenuItem>
            <DropdownMenuItem>Gemino the link</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive'>
          Evanesco
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
