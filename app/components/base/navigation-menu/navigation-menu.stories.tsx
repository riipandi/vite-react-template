import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { colors } from '#/styles/core/colors.stylex'
import { container, fontSize, fontWeight, unit } from '#/styles/core/tokens.stylex'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from './navigation-menu.component'

const meta = {
  title: 'Base Components/NavigationMenu',
  component: NavigationMenu,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof NavigationMenu>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1,
    width: container.md
  },
  linkBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1
  },
  linkTitle: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium
  },
  linkText: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div {...stylex.props(styles.panel)}>
              <NavigationMenuLink href='#'>
                <div {...stylex.props(styles.linkBody)}>
                  <span {...stylex.props(styles.linkTitle)}>Introduction</span>
                  <span {...stylex.props(styles.linkText)}>
                    Base UI + StyleX components you own.
                  </span>
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href='#'>
                <div {...stylex.props(styles.linkBody)}>
                  <span {...stylex.props(styles.linkTitle)}>Installation</span>
                  <span {...stylex.props(styles.linkText)}>
                    Set up StyleX and install components via the CLI.
                  </span>
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div {...stylex.props(styles.panel)}>
              <NavigationMenuLink href='#'>
                <div {...stylex.props(styles.linkBody)}>
                  <span {...stylex.props(styles.linkTitle)}>Button</span>
                  <span {...stylex.props(styles.linkText)}>
                    Variants, sizes, and render-prop composition.
                  </span>
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href='#'>
                <div {...stylex.props(styles.linkBody)}>
                  <span {...stylex.props(styles.linkTitle)}>Dialog</span>
                  <span {...stylex.props(styles.linkText)}>
                    Modal dialogs with overlay and close button.
                  </span>
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href='#'>Docs</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export const Link: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href='#' active>
            Overview
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href='#'>Integrations</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href='#'>Pricing</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
