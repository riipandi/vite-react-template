import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Kbd, KbdGroup } from '#/components/base/kbd'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Kbd',
  component: Kbd,
  parameters: { layout: 'centered' },
  argTypes: {
    children: { control: 'text' }
  },
  tags: []
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[6],
    width: '24rem',
    maxWidth: '100%'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: space[3]
  },
  rowLabel: {
    minWidth: '5rem',
    fontSize: '0.875rem'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[3]
  }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)}>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)}>{children}</div>
)

export const Playground: Story = {
  args: { children: '\u2318K' },
  render: (args) => <Kbd {...args} />
}

export const Default: Story = {
  name: 'Common shortcuts',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Grid>
        <Row label='Save'>
          <KbdGroup>
            <Kbd>\u2318</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </Row>
        <Row label='Copy'>
          <KbdGroup>
            <Kbd>\u2318</Kbd>
            <Kbd>C</Kbd>
          </KbdGroup>
        </Row>
        <Row label='Paste'>
          <KbdGroup>
            <Kbd>\u2318</Kbd>
            <Kbd>V</Kbd>
          </KbdGroup>
        </Row>
        <Row label='Find'>
          <KbdGroup>
            <Kbd>\u2318</Kbd>
            <Kbd>F</Kbd>
          </KbdGroup>
        </Row>
        <Row label='Select all'>
          <KbdGroup>
            <Kbd>\u2318</Kbd>
            <Kbd>A</Kbd>
          </KbdGroup>
        </Row>
        <Row label='Undo'>
          <KbdGroup>
            <Kbd>\u2318</Kbd>
            <Kbd>Z</Kbd>
          </KbdGroup>
        </Row>
        <Row label='Search'>
          <KbdGroup>
            <Kbd>\u2318</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Row>
      </Grid>
    </div>
  )
}

export const Group: Story = {
  name: 'Chord combos',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Grid>
        <Row label='Zoom in'>
          <KbdGroup>
            <Kbd>\u2318</Kbd>
            <Kbd>+</Kbd>
          </KbdGroup>
        </Row>
        <Row label='Zoom out'>
          <KbdGroup>
            <Kbd>\u2318</Kbd>
            <Kbd>-</Kbd>
          </KbdGroup>
        </Row>
        <Row label='Dev tools'>
          <KbdGroup>
            <Kbd>\u2318</Kbd>
            <Kbd>\u21E7</Kbd>
            <Kbd>I</Kbd>
          </KbdGroup>
        </Row>
        <Row label='Terminal'>
          <KbdGroup>
            <Kbd>\u2318</Kbd>
            <Kbd>\u2325</Kbd>
            <Kbd>T</Kbd>
          </KbdGroup>
        </Row>
      </Grid>
    </div>
  )
}
