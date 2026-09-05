import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect } from 'storybook/test'
import { container, radius } from '#/styles/core/tokens.stylex'
import { Skeleton } from './skeleton.component'

const meta = {
  title: 'Extra Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Skeleton>

type Story = StoryObj<typeof meta>

const styles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    gap: 16
  },
  avatar: {
    borderRadius: radius.circular,
    height: 48,
    width: 48
  },
  lines: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  lineWide: {
    height: 16,
    width: container.xs
  },
  line: {
    height: 16,
    width: 64
  },
  cardRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: container.card
  },
  image: {
    borderRadius: radius.large,
    height: container.xs,
    width: '100%'
  },
  cardLineWide: {
    height: 16,
    width: '100%'
  },
  cardLine: {
    height: 16,
    width: '60%'
  },
  listRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: container.sm
  },
  listRow: {
    alignItems: 'center',
    display: 'flex',
    gap: 12
  },
  listAvatar: {
    borderRadius: radius.circular,
    flexShrink: 0,
    height: 40,
    width: 40
  },
  listLines: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 8
  },
  listLineWide: {
    height: 16,
    width: '70%'
  },
  listLine: {
    height: 16,
    width: '40%'
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <div data-testid='skeleton-scene' {...stylex.props(styles.root)}>
      <Skeleton style={styles.avatar} />
      <div {...stylex.props(styles.lines)}>
        <Skeleton style={styles.lineWide} />
        <Skeleton style={styles.line} />
      </div>
    </div>
  ),
  // Skeletons are empty presentational placeholders — four shapes for the
  // avatar and two text lines (plus their wrapper).
  play: ({ canvas }) => {
    const scene = canvas.getByTestId('skeleton-scene')
    expect(scene.querySelectorAll('div').length).toBe(4)
  }
}

export const Card: Story = {
  render: () => (
    <div {...stylex.props(styles.cardRoot)}>
      <Skeleton style={styles.image} />
      <Skeleton style={styles.cardLineWide} />
      <Skeleton style={styles.cardLine} />
    </div>
  )
}

export const List: Story = {
  render: () => (
    <div {...stylex.props(styles.listRoot)}>
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} {...stylex.props(styles.listRow)}>
          <Skeleton style={styles.listAvatar} />
          <div {...stylex.props(styles.listLines)}>
            <Skeleton style={styles.listLineWide} />
            <Skeleton style={styles.listLine} />
          </div>
        </div>
      ))}
    </div>
  )
}
