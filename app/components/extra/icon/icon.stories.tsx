import type { Meta, StoryObj } from '@storybook/react-vite'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { IconUser, IconSettings, IconFavorite, IconArrowRight, IconAdd } from 'obra-icons-react'
import { expect } from 'storybook/test'
import { Example } from '#/components/storyblock'
import { Icon } from './icon.component'

export default {
  title: 'Extra Components/Icon',
  component: Icon,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Icon>

// ---------------------------------------------------------------------------
// size
// ---------------------------------------------------------------------------

export const Size: StoryObj = {
  name: 'size',
  render: () => (
    <Example title='Sizes'>
      <Example.Item title={['2 (8px)']}>
        <Icon svg={<IconUser />} size='2' />
      </Example.Item>
      <Example.Item title={['3 (12px)']}>
        <Icon svg={<IconUser />} size='3' />
      </Example.Item>
      <Example.Item title={['4 (16px)']}>
        <Icon svg={<IconUser />} size='4' />
      </Example.Item>
      <Example.Item title={['5 (20px)']}>
        <Icon svg={<IconUser />} size='5' />
      </Example.Item>
      <Example.Item title={['6 (24px)']}>
        <Icon svg={<IconUser />} size='6' />
      </Example.Item>
      <Example.Item title={['8 (32px)']}>
        <Icon svg={<IconUser />} size='8' />
      </Example.Item>
      <Example.Item title={['10 (40px)']}>
        <Icon svg={<IconUser />} size='10' />
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// color
// ---------------------------------------------------------------------------

export const Color: StoryObj = {
  name: 'color',
  render: () => (
    <Example title='Colors'>
      <Example.Item title={['Default']}>
        <Icon svg={<IconUser />} size='6' />
      </Example.Item>
      <Example.Item title={['Neutral']}>
        <Icon svg={<IconUser />} size='6' color='neutral' />
      </Example.Item>
      <Example.Item title={['Neutral faded']}>
        <Icon svg={<IconUser />} size='6' color='neutral-faded' />
      </Example.Item>
      <Example.Item title={['Primary']}>
        <Icon svg={<IconUser />} size='6' color='primary' />
      </Example.Item>
      <Example.Item title={['Positive']}>
        <Icon svg={<IconUser />} size='6' color='positive' />
      </Example.Item>
      <Example.Item title={['Critical']}>
        <Icon svg={<IconUser />} size='6' color='critical' />
      </Example.Item>
      <Example.Item title={['Warning']}>
        <Icon svg={<IconUser />} size='6' color='warning' />
      </Example.Item>
      <Example.Item title={['Disabled']}>
        <Icon svg={<IconUser />} size='6' color='disabled' />
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// autoWidth
// ---------------------------------------------------------------------------

export const AutoWidth: StoryObj = {
  name: 'autoWidth',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <Example title='AutoWidth'>
        <Example.Item title={['Default (square)']}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon svg={<IconArrowRight />} size='4' />
            <span>Text</span>
          </div>
        </Example.Item>
        <Example.Item title={['Auto width']}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon svg={<IconArrowRight />} size='4' autoWidth />
            <span>Text</span>
          </div>
        </Example.Item>
      </Example>
    </div>
  )
}

// ---------------------------------------------------------------------------
// className, attributes
// ---------------------------------------------------------------------------

export const ClassName: StoryObj = {
  name: 'className, attributes',
  render: () => (
    <div data-testid='root'>
      <Icon svg={<IconUser />} className='test-classname' id='test-id' />
    </div>
  ),
  play: async ({ canvas }) => {
    const root = canvas.getByTestId('root').firstChild
    expect(root).toHaveClass('test-classname')
    expect(root).toHaveAttribute('id', 'test-id')
  }
}

// ---------------------------------------------------------------------------
// test: hidden from sr
// ---------------------------------------------------------------------------

export const HiddenFromSr: StoryObj = {
  name: 'test: hidden from sr',
  render: () => (
    <div data-testid='root'>
      <span aria-hidden='true'>
        <Icon svg={<IconUser />} />
      </span>
    </div>
  ),
  play: ({ canvas }) => {
    const root = canvas.getByTestId('root').firstChild
    expect(root).toBeInTheDocument()
    expect(root).toHaveAttribute('aria-hidden')
  }
}

// ---------------------------------------------------------------------------
// various icons
// ---------------------------------------------------------------------------

export const VariousIcons: StoryObj = {
  name: 'various icons',
  render: () => (
    <Example title='Various Icons'>
      <Example.Item title={['User']}>
        <Icon svg={<IconUser />} size='6' />
      </Example.Item>
      <Example.Item title={['Settings']}>
        <Icon svg={<IconSettings />} size='6' />
      </Example.Item>
      <Example.Item title={['Favorite']}>
        <Icon svg={<IconFavorite />} size='6' />
      </Example.Item>
      <Example.Item title={['Arrow']}>
        <Icon svg={<IconArrowRight />} size='6' />
      </Example.Item>
      <Example.Item title={['Add']}>
        <Icon svg={<IconAdd />} size='6' />
      </Example.Item>
    </Example>
  )
}
