import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent, waitFor, within } from 'storybook/test'
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
          <NavigationMenuTrigger>First year at Hogwarts</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div {...stylex.props(styles.panel)}>
              <NavigationMenuLink href='#'>
                <div {...stylex.props(styles.linkBody)}>
                  <span {...stylex.props(styles.linkTitle)}>Platform Nine and Three-Quarters</span>
                  <span {...stylex.props(styles.linkText)}>
                    Run straight at the barrier between platforms nine and ten.
                  </span>
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href='#'>
                <div {...stylex.props(styles.linkBody)}>
                  <span {...stylex.props(styles.linkTitle)}>Diagon Alley</span>
                  <span {...stylex.props(styles.linkText)}>
                    Tap the third brick from the left above the dustbin.
                  </span>
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Codebreaking</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div {...stylex.props(styles.panel)}>
              <NavigationMenuLink href='#'>
                <div {...stylex.props(styles.linkBody)}>
                  <span {...stylex.props(styles.linkTitle)}>Cryptex</span>
                  <span {...stylex.props(styles.linkText)}>
                    A medieval lock with twenty-six rotating dials.
                  </span>
                </div>
              </NavigationMenuLink>
              <NavigationMenuLink href='#'>
                <div {...stylex.props(styles.linkBody)}>
                  <span {...stylex.props(styles.linkTitle)}>Keystone</span>
                  <span {...stylex.props(styles.linkText)}>
                    The only key to the vault hidden beneath the Louvre.
                  </span>
                </div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href='#'>Library</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvas }) => {
    const body = within(document.body)
    const firstTrigger = canvas.getByRole('button', { name: 'First year at Hogwarts' })
    const secondTrigger = canvas.getByRole('button', { name: 'Codebreaking' })

    // Hovering a trigger reveals its panel of links.
    await userEvent.hover(firstTrigger)
    await body.findByRole('link', { name: /platform nine/i })

    // Leave the first trigger so the next one becomes hoverable again.
    await userEvent.unhover(firstTrigger)
    await waitFor(() => expect(body.queryByRole('link', { name: /platform nine/i })).toBeNull())

    // Base UI restores pointer-events on the bar after the panel closes.
    await waitFor(() => {
      expect(getComputedStyle(secondTrigger).pointerEvents).not.toBe('none')
    })

    // Hovering the second trigger opens its own panel.
    await userEvent.hover(secondTrigger)
    await waitFor(() => expect(body.getByRole('link', { name: /cryptex/i })).toBeInTheDocument(), {
      timeout: 3000
    })
    expect(body.queryByRole('link', { name: /platform nine/i })).toBeNull()
  }
}

export const Link: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href='#' active>
            Headmaster&apos;s tower
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href='#'>Illuminati archives</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href='#'>Gringotts exchange rates</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
