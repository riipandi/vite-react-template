import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as React from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator
} from '#/components/base/select'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/Select',
  component: Select,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: []
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const sizes = ['sm', 'md', 'lg'] as const

const layoutStyles = stylex.create({
  grid: { display: 'flex', flexDirection: 'column', gap: space[4] },
  row: { display: 'flex', alignItems: 'center', gap: space[2] },
  rowLabel: { minWidth: '5rem' }
})

const Row = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div {...stylex.props(layoutStyles.row)} id='select-row'>
    <span {...stylex.props(layoutStyles.rowLabel)}>{label}</span>
    {children}
  </div>
)

const Grid = ({ children }: React.PropsWithChildren) => (
  <div {...stylex.props(layoutStyles.grid)} id='select-grid'>
    {children}
  </div>
)

const renderSelect = (size: 'sm' | 'md' | 'lg' | undefined, wrapperId: string) => (
  <div id={`${wrapperId}-root`}>
    <Select>
      <SelectTrigger size={size}>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem value='orange'>Orange</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value='carrot'>Carrot</SelectItem>
          <SelectItem value='broccoli'>Broccoli</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
)

export const Playground: Story = {
  render: () => renderSelect('md', 'select-playground')
}

export const SizeShowcase: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid>
      {sizes.map((s) => (
        <Row key={s} label={s}>
          {renderSelect(s, `select-size-${s}`)}
        </Row>
      ))}
    </Grid>
  )
}

export const Default: Story = {
  name: 'Default',
  parameters: { controls: { disable: true } },
  render: () => renderSelect('md', 'select-default')
}
