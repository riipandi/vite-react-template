import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Button } from '#/components/base/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '#/components/base/tooltip'
import { colors } from '#/styles/core/colors.stylex'
import { Kbd, KbdGroup } from './kbd.component'

const meta = {
  title: 'Extra Components/Kbd',
  component: Kbd,
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
} satisfies Meta<typeof Kbd>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  content: {
    alignItems: 'center',
    display: 'flex',
    gap: 6
  },
  kbd: {
    backgroundColor: `color-mix(in srgb, ${colors.backgroundPage} 20%, transparent)`,
    color: colors.backgroundPage
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  )
}

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  )
}

export const InTooltip: Story = {
  name: 'In a tooltip',
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant='outline' />}>Alohomora</TooltipTrigger>
        <TooltipContent style={styles.content}>
          Alohomora <Kbd style={styles.kbd}>⌘S</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  play: async ({ canvas }) => {
    const body = within(document.body)
    await userEvent.hover(canvas.getByRole('button', { name: 'Alohomora' }))
    await waitFor(() => expect(body.getByText('⌘S')).toBeVisible())
  }
}

export const InButton: Story = {
  name: 'In a button',
  render: () => (
    <Button variant='outline'>
      Lumos
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>S</Kbd>
      </KbdGroup>
    </Button>
  )
}
