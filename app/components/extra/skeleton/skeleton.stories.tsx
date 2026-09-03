import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { Skeleton } from './skeleton.component'

const meta = {
  title: 'Extra Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Skeleton>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <div {...stylex.props(atoms.display.flex, atoms.flexDirection.column, atoms.gap['12px'])}>
      <div {...stylex.props(atoms.display.flex, atoms.alignItems.center, atoms.gap['12px'])}>
        <Skeleton style={[atoms.width['40px'], atoms.height['40px']]} />
        <div {...stylex.props(atoms.display.flex, atoms.flexDirection.column, atoms.gap['8px'])}>
          <Skeleton style={[atoms.width['240px'], atoms.height['16px']]} />
          <Skeleton style={[atoms.width['160px'], atoms.height['12px']]} />
        </div>
      </div>
      <Skeleton style={[atoms.width['100%'], atoms.height['120px']]} />
    </div>
  )
}
