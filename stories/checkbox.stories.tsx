import type { Meta, StoryObj } from '@storybook/react-vite'
import x from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { CheckBox } from '#/components/base/checkbox'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/CheckBox',
  component: CheckBox,
  parameters: { layout: 'centered' },
  argTypes: {
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  tags: [],
  decorators: [
    (Story) => (
      <div
        {...stylex.props(
          x.display.flex,
          x.width['100%'],
          x.minWidth['28rem'],
          x.alignItems.center,
          x.justifyContent.center
        )}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4]
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: space[3]
  },
  rowLabel: {
    minWidth: '6rem'
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
  args: { defaultChecked: false },
  render: (args) => (
    <CheckBox
      id='checkbox-playground'
      defaultChecked={args.defaultChecked}
      disabled={args.disabled}
    />
  )
}

export const States: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      <Row label='Unchecked'>
        <CheckBox id='checkbox-unchecked' />
      </Row>
      <Row label='Checked'>
        <CheckBox id='checkbox-checked' defaultChecked />
      </Row>
      <Row label='Disabled'>
        <CheckBox id='checkbox-disabled' disabled />
      </Row>
      <Row label='Disabled Checked'>
        <CheckBox id='checkbox-disabled-checked' disabled defaultChecked />
      </Row>
    </Grid>
  )
}
