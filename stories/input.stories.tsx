import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { Input } from '#/components/base/input'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Input',
  component: Input,
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search']
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    readOnly: { control: 'boolean' }
  },
  tags: []
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4],
    width: '20rem',
    maxWidth: '100%'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: space[2]
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
  args: { placeholder: 'Enter text...', type: 'text' },
  render: (args) => <Input {...args} />
}

export const States: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Grid>
        <Row label='Default'>
          <Input placeholder='Default input' />
        </Row>
        <Row label='Placeholder'>
          <Input placeholder='Placeholder text...' />
        </Row>
        <Row label='Disabled'>
          <Input placeholder='Disabled input' disabled />
        </Row>
        <Row label='Read only'>
          <Input value='Read only value' readOnly />
        </Row>
        <Row label='Required'>
          <Input placeholder='Required field' required />
        </Row>
        <Row label='Password'>
          <Input type='password' defaultValue='secret123' />
        </Row>
        <Row label='Number'>
          <Input type='number' placeholder='0' />
        </Row>
        <Row label='Email'>
          <Input type='email' placeholder='email@example.com' />
        </Row>
      </Grid>
    </div>
  )
}
