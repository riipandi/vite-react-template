import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import { fn } from 'storybook/test'
import { Textarea } from '#/components/extra/textarea'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Extended/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    rows: { control: { type: 'number', min: 1, max: 20 } }
  },
  tags: [],
  args: { onClick: fn() }
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[6] },
  row: { display: 'flex', flexDirection: 'column', gap: space[1] },
  rowLabel: { fontSize: '0.875rem', fontWeight: 500 }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='textarea-row'>
    <span
      {...stylex.props(layoutStyles.rowLabel)}
      id={`textarea-label-${label.replace(/\s+/g, '-')}`}
    >
      {label}
    </span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='textarea-grid'>
    {children}
  </div>
)

export const Playground: Story = {
  args: {
    placeholder: 'Enter your message...',
    rows: 4
  },
  render: (args) => <Textarea id='textarea-playground' {...args} />
}

export const States: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      <Row label='Default'>
        <Textarea placeholder='Type something...' rows={3} id='textarea-default' />
      </Row>
      <Row label='With Value'>
        <Textarea
          defaultValue='This is some pre-filled content in the textarea.'
          rows={3}
          id='textarea-value'
        />
      </Row>
      <Row label='Disabled'>
        <Textarea placeholder='Cannot edit...' disabled rows={3} id='textarea-disabled' />
      </Row>
      <Row label='Read Only'>
        <Textarea value='This content is read only.' readOnly rows={3} id='textarea-readonly' />
      </Row>
      <Row label='Long Content'>
        <Textarea
          defaultValue={
            'Line 1: First item\nLine 2: Second item\nLine 3: Third item\nLine 4: Fourth item\nLine 5: Fifth item'
          }
          rows={6}
          id='textarea-long'
        />
      </Row>
    </Grid>
  )
}
