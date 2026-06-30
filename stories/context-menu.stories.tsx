import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSubmenu,
  ContextMenuSubmenuTrigger
} from '#/components/base/context-menu'
import { space, radius } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/ContextMenu',
  component: ContextMenu,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: []
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    width: '28rem'
  },
  triggerArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '12rem',
    borderRadius: radius.md,
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderColor: 'oklch(0 0 0 / 0.15)',
    background: 'oklch(0.983 0.003 265.75)',
    color: 'oklch(0.51 0.041 265.75)',
    fontSize: '0.875rem',
    userSelect: 'none'
  }
})

export const Playground: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div {...stylex.props(layoutStyles.triggerArea)}>Right-click anywhere in this area</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Go back</ContextMenuItem>
          <ContextMenuItem>Go forward</ContextMenuItem>
          <ContextMenuItem>Reload</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Save as...</ContextMenuItem>
          <ContextMenuItem>Print...</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSubmenu>
            <ContextMenuSubmenuTrigger>More tools</ContextMenuSubmenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Inspect</ContextMenuItem>
              <ContextMenuItem>Developer tools</ContextMenuItem>
              <ContextMenuItem>Console</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenuSubmenu>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}

export const WithCheckboxRadio: Story = {
  name: 'With checkboxes & radios',
  parameters: { controls: { disable: true } },
  render: () => {
    const [showSidebar, setShowSidebar] = React.useState(true)
    const [showStatusBar, setShowStatusBar] = React.useState(false)
    const [theme, setTheme] = React.useState('system')

    return (
      <div {...stylex.props(layoutStyles.wrapper)}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div {...stylex.props(layoutStyles.triggerArea)}>Right-click to toggle options</div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuGroupLabel>Display</ContextMenuGroupLabel>
            <ContextMenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
              Show sidebar
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
              Show status bar
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuGroupLabel>Theme</ContextMenuGroupLabel>
            <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
              <ContextMenuRadioItem value='light'>Light</ContextMenuRadioItem>
              <ContextMenuRadioItem value='dark'>Dark</ContextMenuRadioItem>
              <ContextMenuRadioItem value='system'>System</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    )
  }
}
