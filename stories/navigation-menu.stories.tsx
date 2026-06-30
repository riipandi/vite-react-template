import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator
} from '#/components/base/navigation-menu'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/NavigationMenu',
  component: NavigationMenu,
  parameters: { layout: 'centered' },
  tags: [],
  args: {}
} satisfies Meta<typeof NavigationMenu>

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
    <div {...stylex.props(layoutStyles.wrapper)} id='nav-menu-playground-wrapper'>
      <NavigationMenu id='nav-menu-playground'>
        <NavigationMenuList id='nav-menu-list'>
          <NavigationMenuItem id='nav-menu-item-1'>
            <NavigationMenuTrigger id='nav-menu-trigger-1'>Overview</NavigationMenuTrigger>
            <NavigationMenuContent id='nav-menu-content-1'>
              <NavigationMenuLink id='nav-menu-link-1-1' href='#'>
                Getting started
              </NavigationMenuLink>
              <NavigationMenuLink id='nav-menu-link-1-2' href='#'>
                Installation
              </NavigationMenuLink>
              <NavigationMenuLink id='nav-menu-link-1-3' href='#'>
                Configuration
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem id='nav-menu-item-2'>
            <NavigationMenuTrigger id='nav-menu-trigger-2'>Components</NavigationMenuTrigger>
            <NavigationMenuContent id='nav-menu-content-2'>
              <NavigationMenuLink id='nav-menu-link-2-1' href='#'>
                Button
              </NavigationMenuLink>
              <NavigationMenuLink id='nav-menu-link-2-2' href='#'>
                Dialog
              </NavigationMenuLink>
              <NavigationMenuLink id='nav-menu-link-2-3' href='#'>
                Menu
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem id='nav-menu-item-3'>
            <NavigationMenuTrigger id='nav-menu-trigger-3'>Resources</NavigationMenuTrigger>
            <NavigationMenuContent id='nav-menu-content-3'>
              <NavigationMenuLink id='nav-menu-link-3-1' href='#'>
                API reference
              </NavigationMenuLink>
              <NavigationMenuLink id='nav-menu-link-3-2' href='#'>
                Examples
              </NavigationMenuLink>
              <NavigationMenuLink id='nav-menu-link-3-3' href='#'>
                Changelog
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuIndicator id='nav-menu-indicator' />
      </NavigationMenu>
    </div>
  )
}

export const Default: Story = {
  name: 'Default',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)} id='nav-menu-default-wrapper'>
      <NavigationMenu id='nav-menu-default'>
        <NavigationMenuList id='nav-menu-default-list'>
          <NavigationMenuItem id='nav-menu-default-item-1'>
            <NavigationMenuTrigger id='nav-menu-default-trigger-1'>Products</NavigationMenuTrigger>
            <NavigationMenuContent id='nav-menu-default-content-1'>
              <NavigationMenuLink id='nav-menu-default-link-1-1' href='#'>
                Overview
              </NavigationMenuLink>
              <NavigationMenuLink id='nav-menu-default-link-1-2' href='#'>
                Pricing
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem id='nav-menu-default-item-2'>
            <NavigationMenuLink id='nav-menu-default-link-2' href='#'>
              Blog
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem id='nav-menu-default-item-3'>
            <NavigationMenuLink id='nav-menu-default-link-3' href='#'>
              Contact
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
