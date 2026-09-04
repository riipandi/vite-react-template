import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/base/avatar'
import { Button } from '#/components/base/button'
import { colors } from '#/styles/core/colors.stylex'
import { fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { PreviewCard, PreviewCardContent, PreviewCardTrigger } from './preview-card.component'

const meta = {
  title: 'Base Components/PreviewCard',
  component: PreviewCard,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
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
      <PreviewCardTrigger render={<Button variant='ghost' />}>@nextjs</PreviewCardTrigger>
      <PreviewCardContent>
        <div {...stylex.props(styles.row)}>
          <Avatar>
            <AvatarImage src='https://github.com/vercel.png' alt='@vercel' />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div {...stylex.props(styles.info)}>
            <span {...stylex.props(styles.name)}>@nextjs</span>
            <span>The React framework — created and maintained by Vercel.</span>
            <span {...stylex.props(styles.muted)}>Joined December 2021</span>
          </div>
        </div>
      </PreviewCardContent>
    </PreviewCard>
  )
}

export const Sides: Story = {
  render: () => (
    <div {...stylex.props(styles.sidesRow)}>
      {sides.map((side) => (
        <PreviewCard key={side}>
          <PreviewCardTrigger render={<Button variant='outline' />}>{side}</PreviewCardTrigger>
          <PreviewCardContent side={side}>Preview card on {side}</PreviewCardContent>
        </PreviewCard>
      ))}
    </div>
  )
}
