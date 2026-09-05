import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/base/avatar'
import { Button } from '#/components/base/button'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { PreviewCard, PreviewCardContent, PreviewCardTrigger } from './preview-card.component'

const meta = {
  title: 'Base Components/PreviewCard',
  component: PreviewCard,
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
} satisfies Meta<typeof PreviewCard>

type Story = StoryObj<typeof meta>

const sides = ['top', 'right', 'bottom', 'left'] as const

const styles = stylex.create({
  row: {
    display: 'flex',
    gap: 12
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },
  name: {
    fontWeight: fontWeight.semibold
  },
  muted: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1
  },
  sidesRow: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <PreviewCard>
      <PreviewCardTrigger render={<Button variant='ghost' />}>@dumbledore</PreviewCardTrigger>
      <PreviewCardContent>
        <div {...stylex.props(styles.row)}>
          <Avatar>
            <AvatarImage src='https://github.com/vercel.png' alt='@dumbledore' />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div {...stylex.props(styles.info)}>
            <span {...stylex.props(styles.name)}>@dumbledore</span>
            <span>
              Transfiguration professor at Hogwarts — keeper of the Philosopher&apos;s Stone.
            </span>
            <span {...stylex.props(styles.muted)}>Joined September 1892</span>
          </div>
        </div>
      </PreviewCardContent>
    </PreviewCard>
  ),
  play: async ({ canvas }) => {
    const body = within(document.body)

    // Hovering the trigger reveals the preview card.
    await userEvent.hover(canvas.getByRole('button', { name: '@dumbledore' }))
    await body.findByText('Joined September 1892')

    // Hovering away dismisses it.
    await userEvent.unhover(canvas.getByRole('button', { name: '@dumbledore' }))
    await waitFor(() => expect(body.queryByText('Joined September 1892')).toBeNull())
  }
}

export const Sides: Story = {
  render: () => (
    <div {...stylex.props(styles.sidesRow)}>
      {sides.map((side) => (
        <PreviewCard key={side}>
          <PreviewCardTrigger render={<Button variant='outline' />}>{side}</PreviewCardTrigger>
          <PreviewCardContent side={side}>Preview floats to the {side}</PreviewCardContent>
        </PreviewCard>
      ))}
    </div>
  )
}
