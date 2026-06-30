import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldControl
} from '#/components/base/field'
import { Input } from '#/components/base/input'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Field',
  component: Field,
  parameters: { layout: 'centered' },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal']
    }
  },
  tags: []
} satisfies Meta<typeof Field>

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
    gap: space[2]
  },
  rowLabel: {
    minWidth: '5rem'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: space[4]
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
  args: { orientation: 'vertical' },
  render: (args) => (
    <Field {...args}>
      <FieldLabel>Username</FieldLabel>
      <FieldControl>
        <Input placeholder='Enter username' />
      </FieldControl>
      <FieldDescription>This will be your public display name.</FieldDescription>
      <FieldError />
    </Field>
  )
}

export const OrientationShowcase: Story = {
  name: 'Orientations',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Grid>
        <Row label='Vertical'>
          <Field orientation='vertical'>
            <FieldLabel>Email</FieldLabel>
            <FieldControl>
              <Input type='email' placeholder='email@example.com' />
            </FieldControl>
            <FieldDescription>We will never share your email.</FieldDescription>
          </Field>
        </Row>
        <Row label='Horizontal'>
          <Field orientation='horizontal'>
            <FieldLabel>Email</FieldLabel>
            <FieldControl>
              <Input type='email' placeholder='email@example.com' />
            </FieldControl>
            <FieldDescription>We will never share your email.</FieldDescription>
          </Field>
        </Row>
      </Grid>
    </div>
  )
}
