import type { Meta, StoryObj } from '@storybook/react-vite'
import * as stylex from '@stylexjs/stylex'
import * as Lucide from 'lucide-react'
import * as React from 'react'
import { Input } from '#/components/base/input'
import { InputWrapper, InputIcon, InputAffix } from '#/components/base/input-group'
import { space } from '#/styles/tokens.stylex'

const meta = {
  title: 'Component/InputGroup',
  component: InputWrapper,
  parameters: { layout: 'centered' },
  argTypes: {},
  tags: []
} satisfies Meta<typeof InputWrapper>

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
    gap: space[2],
    flexWrap: 'wrap'
  },
  rowLabel: {
    minWidth: '5rem',
    fontSize: '0.875rem'
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
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <InputWrapper>
        <InputIcon>
          <Lucide.Search size={16} />
        </InputIcon>
        <Input placeholder='Search...' />
        <InputAffix inline>/docs</InputAffix>
      </InputWrapper>
    </div>
  )
}

export const Default: Story = {
  name: 'Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <Grid>
        <Row label='Icon prefix'>
          <InputWrapper>
            <InputIcon>
              <Lucide.Mail size={16} />
            </InputIcon>
            <Input placeholder='Email address' />
          </InputWrapper>
        </Row>
        <Row label='Icon suffix'>
          <InputWrapper>
            <Input type='password' placeholder='Password' />
            <InputIcon>
              <Lucide.Eye size={16} />
            </InputIcon>
          </InputWrapper>
        </Row>
        <Row label='Affix prefix'>
          <InputWrapper>
            <InputAffix inline>https://</InputAffix>
            <Input placeholder='example.com' />
          </InputWrapper>
        </Row>
        <Row label='Affix suffix'>
          <InputWrapper>
            <Input type='number' placeholder='0' />
            <InputAffix inline>kg</InputAffix>
          </InputWrapper>
        </Row>
        <Row label='Both icons'>
          <InputWrapper>
            <InputIcon>
              <Lucide.Search size={16} />
            </InputIcon>
            <Input placeholder='Search...' />
            <InputIcon>
              <Lucide.SlidersHorizontal size={16} />
            </InputIcon>
          </InputWrapper>
        </Row>
        <Row label='Both affixes'>
          <InputWrapper>
            <InputAffix inline>$</InputAffix>
            <Input type='number' placeholder='0.00' />
            <InputAffix inline>USD</InputAffix>
          </InputWrapper>
        </Row>
      </Grid>
    </div>
  )
}
