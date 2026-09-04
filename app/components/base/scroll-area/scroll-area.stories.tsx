import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
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
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ScrollArea>

type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 50 }, (_, i) => `v1.2.0-beta.${50 - i}`)

const artworks = [
  { title: 'Ocean Horizon', artist: 'Reyes' },
  { title: 'Desert Bloom', artist: 'Okafor' },
  { title: 'City Lights', artist: 'Petrova' },
  { title: 'Quiet Forest', artist: 'Lindgren' },
  { title: 'Northern Sky', artist: 'Haruki' },
  { title: 'Red Canyon', artist: 'Alvarez' }
]

const styles = stylex.create({
  root: {
    borderColor: colors.borderNeutral,
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.border,
    height: container.xs,
    width: container.xs
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
    borderWidth: stroke.border,
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
    <ScrollArea style={styles.root}>
      <div {...stylex.props(styles.inner)}>
        <h4 {...stylex.props(styles.heading)}>Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div {...stylex.props(styles.tag)}>{tag}</div>
            <Separator />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
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
