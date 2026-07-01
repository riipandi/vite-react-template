import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import { colorVar, fontSizeVar, radiusVar } from '#/styles/tokens.stylex'
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
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['448px'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
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
    <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.75rem'])}>
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
      <Lucide.Command {...stylex.props(x.width['0.75rem'], x.height['0.75rem'])} />K
    </Hotkey>
  )
}

export const ArrowKey: Story = {
  render: () => (
    <Hotkey>
      <Lucide.ArrowUp {...stylex.props(x.width['0.75rem'], x.height['0.75rem'])} />
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
        <Lucide.ArrowUp />
      </Hotkey>
      <Hotkey>
        <Lucide.ArrowDown />
      </Hotkey>
      <Hotkey>
        <Lucide.ArrowLeft />
      </Hotkey>
      <Hotkey>
        <Lucide.ArrowRight />
      </Hotkey>
    </HotkeyGroup>
  )
}

// Showcase
export const AllModifiers: Story = {
  render: () => (
    <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['1rem'])}>
      <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.5rem'])}>
        <span {...stylex.props(x.width['5rem'], x.fontSize[fontSizeVar.sm])}>Command:</span>
        <Hotkey>⌘</Hotkey>
      </div>
      <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.5rem'])}>
        <span {...stylex.props(x.width['5rem'], x.fontSize[fontSizeVar.sm])}>Control:</span>
        <Hotkey>Ctrl</Hotkey>
      </div>
      <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.5rem'])}>
        <span {...stylex.props(x.width['5rem'], x.fontSize[fontSizeVar.sm])}>Shift:</span>
        <Hotkey>⇧</Hotkey>
      </div>
      <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.5rem'])}>
        <span {...stylex.props(x.width['5rem'], x.fontSize[fontSizeVar.sm])}>Option:</span>
        <Hotkey>⌥</Hotkey>
      </div>
      <div {...stylex.props(x.display.flex, x.alignItems.center, x.gap['0.5rem'])}>
        <span {...stylex.props(x.width['5rem'], x.fontSize[fontSizeVar.sm])}>Alt:</span>
        <Hotkey>Alt</Hotkey>
      </div>
    </div>
  )
}

export const CommonShortcuts: Story = {
  render: () => (
    <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.75rem'])}>
      <div
        {...stylex.props(
          x.display.flex,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.gap['2rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>Copy</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>C</Hotkey>
        </HotkeyGroup>
      </div>
      <div
        {...stylex.props(
          x.display.flex,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.gap['2rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>Paste</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>V</Hotkey>
        </HotkeyGroup>
      </div>
      <div
        {...stylex.props(
          x.display.flex,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.gap['2rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>Save</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>S</Hotkey>
        </HotkeyGroup>
      </div>
      <div
        {...stylex.props(
          x.display.flex,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.gap['2rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>Undo</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>Z</Hotkey>
        </HotkeyGroup>
      </div>
      <div
        {...stylex.props(
          x.display.flex,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.gap['2rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>Redo</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>⇧</Hotkey>
          <Hotkey>Z</Hotkey>
        </HotkeyGroup>
      </div>
      <div
        {...stylex.props(
          x.display.flex,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.gap['2rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>Find</span>
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
    <div {...stylex.props(x.display.flex, x.flexDirection.column, x.gap['0.75rem'])}>
      <div
        {...stylex.props(
          x.display.flex,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.gap['2rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>Move Up</span>
        <Hotkey>
          <Lucide.ArrowUp />
        </Hotkey>
      </div>
      <div
        {...stylex.props(
          x.display.flex,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.gap['2rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>Move Down</span>
        <Hotkey>
          <Lucide.ArrowDown />
        </Hotkey>
      </div>
      <div
        {...stylex.props(
          x.display.flex,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.gap['2rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>Page Up</span>
        <HotkeyGroup>
          <Hotkey>⇧</Hotkey>
          <Hotkey>
            <Lucide.ArrowUp />
          </Hotkey>
        </HotkeyGroup>
      </div>
      <div
        {...stylex.props(
          x.display.flex,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.gap['2rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>Page Down</span>
        <HotkeyGroup>
          <Hotkey>⇧</Hotkey>
          <Hotkey>
            <Lucide.ArrowDown />
          </Hotkey>
        </HotkeyGroup>
      </div>
    </div>
  )
}

// Real World Examples
export const SearchShortcut: Story = {
  render: () => (
    <div
      {...stylex.props(
        x.backgroundColor[colorVar.bgNeutral],
        x.borderColor[colorVar.borderNeutral],
        x.display.flex,
        x.width['100%'],
        x.maxWidth['384px'],
        x.alignItems.center,
        x.gap['0.5rem'],
        x.borderRadius[radiusVar.lg],
        x.borderWidth['1px'],
        x.padding['1rem']
      )}
    >
      <Lucide.Search
        {...stylex.props(x.color[colorVar.fgNeutralFaded], x.width['1rem'], x.height['1rem'])}
      />
      <span
        {...stylex.props(x.color[colorVar.fgNeutralFaded], x.flex['1'], x.fontSize[fontSizeVar.sm])}
      >
        Search...
      </span>
      <HotkeyGroup>
        <Hotkey>⌘</Hotkey>
        <Hotkey>K</Hotkey>
      </HotkeyGroup>
    </div>
  )
}

export const MenuItems: Story = {
  render: () => (
    <div
      {...stylex.props(
        x.backgroundColor[colorVar.bgNeutral],
        x.borderColor[colorVar.borderNeutral],
        x.width['16rem'],
        x.borderRadius[radiusVar.lg],
        x.borderWidth['1px'],
        x.padding['0.5rem']
      )}
    >
      <div
        {...stylex.props(
          x.display.flex,
          x.cursor.pointer,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.borderRadius[radiusVar.md],
          x.paddingLeft['0.5rem'],
          x.paddingRight['0.5rem'],
          x.paddingTop['0.375rem'],
          x.paddingBottom['0.375rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>New File</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>N</Hotkey>
        </HotkeyGroup>
      </div>
      <div
        {...stylex.props(
          x.display.flex,
          x.cursor.pointer,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.borderRadius[radiusVar.md],
          x.paddingLeft['0.5rem'],
          x.paddingRight['0.5rem'],
          x.paddingTop['0.375rem'],
          x.paddingBottom['0.375rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>Open File</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>O</Hotkey>
        </HotkeyGroup>
      </div>
      <div
        {...stylex.props(
          x.display.flex,
          x.cursor.pointer,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.borderRadius[radiusVar.md],
          x.paddingLeft['0.5rem'],
          x.paddingRight['0.5rem'],
          x.paddingTop['0.375rem'],
          x.paddingBottom['0.375rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>Save</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>S</Hotkey>
        </HotkeyGroup>
      </div>
      <div
        {...stylex.props(
          x.backgroundColor[colorVar.borderNeutral],
          x.marginTop['0.375rem'],
          x.marginBottom['0.375rem'],
          x.height['1px']
        )}
      />
      <div
        {...stylex.props(
          x.display.flex,
          x.cursor.pointer,
          x.alignItems.center,
          x.justifyContent.spaceBetween,
          x.borderRadius[radiusVar.md],
          x.paddingLeft['0.5rem'],
          x.paddingRight['0.5rem'],
          x.paddingTop['0.375rem'],
          x.paddingBottom['0.375rem']
        )}
      >
        <span {...stylex.props(x.fontSize[fontSizeVar.sm])}>Close Window</span>
        <HotkeyGroup>
          <Hotkey>⌘</Hotkey>
          <Hotkey>W</Hotkey>
        </HotkeyGroup>
      </div>
    </div>
  )
}
