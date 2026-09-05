import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { expect } from 'storybook/test'
import { Separator } from '#/components/base/separator'
import { colors } from '#/styles/core/colors.stylex'
import {
  container,
  fontFamily,
  fontSize,
  fontWeight,
  radius,
  stroke
} from '#/styles/core/tokens.stylex'
import { ScrollArea, ScrollBar } from './scroll-area.component'

const meta = {
  title: 'Base Components/ScrollArea',
  component: ScrollArea,
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
} satisfies Meta<typeof ScrollArea>

type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 50 }, (_, i) => `Daily Prophet edition ${50 - i}`)

const artworks = [
  { title: 'The Mona Lisa', artist: 'Jacques Saunière' },
  { title: 'The Vitruvian Man', artist: 'Robert Langdon' },
  { title: 'The Last Supper Cipher', artist: 'Silas' },
  { title: 'Portrait of Hogwarts', artist: 'Luna Lovegood' },
  { title: "Marauder's Map", artist: 'Sirius Black' },
  { title: 'The Golden Snitch', artist: 'Dobby' }
]

const styles = stylex.create({
  root: {
    borderColor: colors.borderNeutral,
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    height: container.sm,
    width: container.card
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: 8,
    padding: 16
  },
  heading: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    margin: 0
  },
  tag: {
    fontSize: fontSize.body2
  },
  wide: {
    width: container.xl
  },
  row: {
    display: 'flex',
    gap: 16,
    paddingBottom: 16,
    width: 'max-content'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: 8,
    width: container.card
  },
  thumb: {
    backgroundColor: colors.backgroundNeutral,
    borderColor: colors.borderNeutral,
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    height: 64,
    width: '100%'
  },
  title: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium
  },
  artist: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <ScrollArea style={styles.root} fade>
      <div {...stylex.props(styles.inner)}>
        <h4 {...stylex.props(styles.heading)}>Daily Prophet editions</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div {...stylex.props(styles.tag)}>{tag}</div>
            <Separator />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
  // All 50 editions are rendered — the viewport clips, not the DOM.
  play: ({ canvas }) => {
    expect(canvas.getAllByText(/^Daily Prophet edition \d+$/).length).toBe(50)
  }
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea style={styles.wide}>
      <div {...stylex.props(styles.row)}>
        {artworks.map((art) => (
          <div key={art.title} {...stylex.props(styles.card)}>
            <div {...stylex.props(styles.thumb)} />
            <div {...stylex.props(styles.title)}>{art.title}</div>
            <div {...stylex.props(styles.artist)}>{art.artist}</div>
          </div>
        ))}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
