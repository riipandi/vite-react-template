import type { Meta, StoryObj } from '@storybook/tanstack-react'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { ScrollArea } from './scroll-area.component'

const meta = {
  title: 'Base Components/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'fullscreen' },
  tags: [], // ['autodocs']
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ScrollArea>

type Story = StoryObj<typeof meta>

export default meta

export const Playground: Story = {
  render: () => (
    <ScrollArea style={atoms.height['240px']}>
      <div {...stylex.props(atoms.padding['16px'])}>
        <p>Kafka, twelve monkeys, temporal blues, time is the fire in which we burn.</p>
        <p>Long time no see the apocalypse. Great minds think alike, but fools rarely differ.</p>
        <p>It is a curious thing, the death of a human being, even one we love.</p>
        <p>Don't panic. We're in the golden age of remembering what we've forgotten.</p>
        <p>Everything inside this box scrolls vertically with a custom scrollbar.</p>
      </div>
    </ScrollArea>
  )
}

export const Fade: Story = {
  render: () => (
    <ScrollArea fade style={atoms.height['240px']}>
      <div {...stylex.props(atoms.padding['16px'])}>
        <p style={{ height: 48 }}>
          Kafka, twelve monkeys, temporal blues, time is the fire in which we burn.
        </p>
        <p style={{ height: 48 }}>
          Long time no see the apocalypse. Great minds think alike, but fools rarely differ.
        </p>
        <p style={{ height: 48 }}>
          It is a curious thing, the death of a human being, even one we love.
        </p>
        <p style={{ height: 48 }}>
          Don't panic. We're in the golden age of remembering what we've forgotten.
        </p>
        <p style={{ height: 48 }}>
          Everything inside this box scrolls vertically with a custom scrollbar.
        </p>
        <p style={{ height: 48 }}>The fade mask follows the scroll position on every edge.</p>
      </div>
    </ScrollArea>
  )
}
