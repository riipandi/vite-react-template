import * as Icon from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Hotkey, HotkeyGroup } from './hotkey.component'

const meta = {
  title: 'Extra Components/Hotkey',
  component: Hotkey,
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
} satisfies Meta<typeof Hotkey>

export default meta
type Story = StoryObj<typeof meta>

// Basic
export const Playground: Story = {
  render: () => <Hotkey>⌘K</Hotkey>
}

export const VariantShowcase: Story = {
  args: {},
  render: () => (
    <div className='flex items-center space-x-3'>
      <Hotkey>Alt + F4</Hotkey>
      <Hotkey variant='outline'>Ctrl + V</Hotkey>
      <Hotkey variant='ghost'>Ctrl + C</Hotkey>
    </div>
  )
}

export const SingleKey: Story = {
  render: () => <Hotkey>K</Hotkey>
}

export const WithModifier: Story = {
  render: () => <Hotkey>Ctrl</Hotkey>
}

// Common Keys
export const Command: Story = {
  render: () => <Hotkey>⌘</Hotkey>
}

export const Control: Story = {
  render: () => <Hotkey>Ctrl</Hotkey>
}

export const Shift: Story = {
  render: () => <Hotkey>⇧</Hotkey>
}

export const Option: Story = {
  render: () => <Hotkey>⌥</Hotkey>
}

export const Alt: Story = {
  render: () => <Hotkey>Alt</Hotkey>
}

export const Enter: Story = {
  render: () => <Hotkey>↵</Hotkey>
}

export const Delete: Story = {
  render: () => <Hotkey>⌫</Hotkey>
}

export const Escape: Story = {
  render: () => <Hotkey>Esc</Hotkey>
}

// With Icons
export const WithIcon: Story = {
  render: () => (
    <Hotkey>
      <Icon.Command className='size-3' />K
    </Hotkey>
  )
}

export const ArrowKey: Story = {
  render: () => (
    <Hotkey>
      <Icon.ArrowUp className='size-3' />
    </Hotkey>
  )
}

// Hotkey Groups
export const CommandK: Story = {
  render: () => (
    <HotkeyGroup>
      <Hotkey>⌘</Hotkey>
      <Hotkey>K</Hotkey>
    </HotkeyGroup>
  )
}

export const ControlShiftP: Story = {
  render: () => (
    <HotkeyGroup>
      <Hotkey>Ctrl</Hotkey>
      <Hotkey>⇧</Hotkey>
      <Hotkey>P</Hotkey>
    </HotkeyGroup>
  )
}

export const CommandShiftK: Story = {
  render: () => (
    <HotkeyGroup>
      <Hotkey>⌘</Hotkey>
      <Hotkey>⇧</Hotkey>
      <Hotkey>K</Hotkey>
    </HotkeyGroup>
  )
}

export const AltF4: Story = {
  render: () => (
    <HotkeyGroup>
      <Hotkey>Alt</Hotkey>
      <Hotkey>F4</Hotkey>
    </HotkeyGroup>
  )
}

// Common Shortcuts
export const Copy: Story = {
  render: () => (
    <HotkeyGroup>
      <Hotkey>⌘</Hotkey>
      <Hotkey>C</Hotkey>
    </HotkeyGroup>
  )
}

export const Paste: Story = {
  render: () => (
    <HotkeyGroup>
      <Hotkey>⌘</Hotkey>
      <Hotkey>V</Hotkey>
    </HotkeyGroup>
  )
}

export const Save: Story = {
  render: () => (
    <HotkeyGroup>
      <Hotkey>⌘</Hotkey>
      <Hotkey>S</Hotkey>
    </HotkeyGroup>
  )
}

export const Undo: Story = {
  render: () => (
    <HotkeyGroup>
      <Hotkey>⌘</Hotkey>
      <Hotkey>Z</Hotkey>
    </HotkeyGroup>
  )
}

export const Redo: Story = {
  render: () => (
    <HotkeyGroup>
      <Hotkey>⌘</Hotkey>
      <Hotkey>⇧</Hotkey>
      <Hotkey>Z</Hotkey>
    </HotkeyGroup>
  )
}

export const SelectAll: Story = {
  render: () => (
    <HotkeyGroup>
      <Hotkey>⌘</Hotkey>
      <Hotkey>A</Hotkey>
    </HotkeyGroup>
  )
}

export const Find: Story = {
  render: () => (
    <HotkeyGroup>
      <Hotkey>⌘</Hotkey>
      <Hotkey>F</Hotkey>
    </HotkeyGroup>
  )
}

export const ArrowNavigation: Story = {
  render: () => (
    <HotkeyGroup>
      <Hotkey>
        <Icon.ArrowUp />
      </Hotkey>
      <Hotkey>
        <Icon.ArrowDown />
      </Hotkey>
      <Hotkey>
        <Icon.ArrowLeft />
      </Hotkey>
      <Hotkey>
        <Icon.ArrowRight />
      </Hotkey>
    </HotkeyGroup>
  )
}

// Showcase
export const AllModifiers: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <span className='w-20 text-sm'>Command:</span>
        <Hotkey>⌘</Hotkey>
      </div>
      <div className='flex items-center gap-2'>
        <span className='w-20 text-sm'>Control:</span>
        <Hotkey>Ctrl</Hotkey>
      </div>
      <div className='flex items-center gap-2'>
        <span className='w-20 text-sm'>Shift:</span>
        <Hotkey>⇧</Hotkey>
      </div>
      <div className='flex items-center gap-2'>
        <span className='w-20 text-sm'>Option:</span>
        <Hotkey>⌥</Hotkey>
      </div>
      <div className='flex items-center gap-2'>
        <span className='w-20 text-sm'>Alt:</span>
        <Hotkey>Alt</Hotkey>
      </div>
    </div>
  )
}

export const CommonShortcuts: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between gap-8'>
        <span className='text-sm'>Copy</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>C</Hotkey>
        </HotkeyGroup>
      </div>
      <div className='flex items-center justify-between gap-8'>
        <span className='text-sm'>Paste</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>V</Hotkey>
        </HotkeyGroup>
      </div>
      <div className='flex items-center justify-between gap-8'>
        <span className='text-sm'>Save</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>S</Hotkey>
        </HotkeyGroup>
      </div>
      <div className='flex items-center justify-between gap-8'>
        <span className='text-sm'>Undo</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>Z</Hotkey>
        </HotkeyGroup>
      </div>
      <div className='flex items-center justify-between gap-8'>
        <span className='text-sm'>Redo</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>⇧</Hotkey>
          <Hotkey>Z</Hotkey>
        </HotkeyGroup>
      </div>
      <div className='flex items-center justify-between gap-8'>
        <span className='text-sm'>Find</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>F</Hotkey>
        </HotkeyGroup>
      </div>
    </div>
  )
}

export const NavigationKeys: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between gap-8'>
        <span className='text-sm'>Move Up</span>
        <Hotkey>
          <Icon.ArrowUp />
        </Hotkey>
      </div>
      <div className='flex items-center justify-between gap-8'>
        <span className='text-sm'>Move Down</span>
        <Hotkey>
          <Icon.ArrowDown />
        </Hotkey>
      </div>
      <div className='flex items-center justify-between gap-8'>
        <span className='text-sm'>Page Up</span>
        <HotkeyGroup>
          <Hotkey>⇧</Hotkey>
          <Hotkey>
            <Icon.ArrowUp />
          </Hotkey>
        </HotkeyGroup>
      </div>
      <div className='flex items-center justify-between gap-8'>
        <span className='text-sm'>Page Down</span>
        <HotkeyGroup>
          <Hotkey>⇧</Hotkey>
          <Hotkey>
            <Icon.ArrowDown />
          </Hotkey>
        </HotkeyGroup>
      </div>
    </div>
  )
}

// Real World Examples
export const SearchShortcut: Story = {
  render: () => (
    <div className='bg-background-neutral border-border-neutral flex w-full max-w-sm items-center gap-2 rounded-lg border p-4'>
      <Icon.MagnifyingGlassIcon
        weight='bold'
        className='text-foreground-neutral-faded-foreground size-4'
      />
      <span className='text-foreground-neutral-faded-foreground flex-1 text-sm'>Search...</span>
      <HotkeyGroup>
        <Hotkey>⌘</Hotkey>
        <Hotkey>K</Hotkey>
      </HotkeyGroup>
    </div>
  )
}

export const MenuItems: Story = {
  render: () => (
    <div className='bg-background-neutral border-border-neutral w-64 rounded-lg border p-2'>
      <div className='hover:bg-background-neutral-faded flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5'>
        <span className='text-sm'>New File</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>N</Hotkey>
        </HotkeyGroup>
      </div>
      <div className='hover:bg-background-neutral-faded flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5'>
        <span className='text-sm'>Open File</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>O</Hotkey>
        </HotkeyGroup>
      </div>
      <div className='hover:bg-background-neutral-faded flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5'>
        <span className='text-sm'>Save</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>S</Hotkey>
        </HotkeyGroup>
      </div>
      <div className='bg-border my-1.5 h-px' />
      <div className='hover:bg-background-neutral-faded flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5'>
        <span className='text-sm'>Close Window</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>W</Hotkey>
        </HotkeyGroup>
      </div>
    </div>
  )
}
