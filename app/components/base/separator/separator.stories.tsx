import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { colors } from '#/styles/core/colors.stylex'
import { container, fontFamily, fontSize, fontWeight } from '#/styles/core/tokens.stylex'
import { Separator } from './separator.component'

const meta = {
  title: 'Base Components/Separator',
  component: Separator,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] }
  },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['20px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Separator>

type Story = StoryObj<typeof meta>

const notifications = [
  { title: 'Your invoice has been paid', time: '2h ago' },
  { title: 'New comment on your PR', time: '4h ago' },
  { title: 'Weekly digest is ready', time: '1d ago' }
]

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    gap: 16
  },
  title: {
    fontWeight: fontWeight.medium
  },
  muted: {
    color: colors.foregroundNeutralFaded
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    gap: 16,
    height: 20
  },
  listRoot: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamily.body,
    gap: 12,
    width: container.sm
  },
  listRow: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  time: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1
  }
})

export default meta

export const Playground: Story = {
  render: () => (
    <div {...stylex.props(styles.root)}>
      <div>
        <div {...stylex.props(styles.title)}>Base UI Primitives</div>
        <div {...stylex.props(styles.muted)}>An open-source UI component library.</div>
      </div>
      <Separator />
      <div {...stylex.props(styles.row)}>
        <span>Blog</span>
        <Separator orientation='vertical' />
        <span>Docs</span>
        <Separator orientation='vertical' />
        <span>Source</span>
      </div>
    </div>
  )
}

export const Vertical: Story = {
  render: () => (
    <div {...stylex.props(styles.row)}>
      <span>Blog</span>
      <Separator orientation='vertical' />
      <span>Docs</span>
      <Separator orientation='vertical' />
      <span>Source</span>
    </div>
  )
}

export const List: Story = {
  render: () => (
    <div {...stylex.props(styles.listRoot)}>
      {notifications.map((item, index) => (
        <React.Fragment key={item.title}>
          {index > 0 && <Separator />}
          <div {...stylex.props(styles.listRow)}>
            <span {...stylex.props(styles.title)}>{item.title}</span>
            <span {...stylex.props(styles.time)}>{item.time}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}
