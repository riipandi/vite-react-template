import type { Meta, StoryObj } from '@storybook/react-vite'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect } from 'storybook/test'
import { Example } from '#/components/storyblock'
import { Separator } from './separator.component'

export default {
  title: 'Base Components/Separator',
  component: Separator,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Separator>

// ---------------------------------------------------------------------------
// base
// ---------------------------------------------------------------------------

export const Base: StoryObj = {
  name: 'base',
  render: () => (
    <div style={{ width: '400px' }}>
      <Separator />
    </div>
  ),
  play: async ({ canvas }) => {
    const [el] = canvas.getAllByRole('separator')
    expect(el).toHaveAttribute('aria-orientation', 'horizontal')
  }
}

// ---------------------------------------------------------------------------
// color
// ---------------------------------------------------------------------------

export const Color: StoryObj = {
  name: 'color',
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Example title='Colors'>
        <Example.Item title={['Neutral faded (default)']}>
          <Separator color='neutral-faded' />
        </Example.Item>
        <Example.Item title={['Neutral']}>
          <Separator color='neutral' />
        </Example.Item>
      </Example>
    </div>
  )
}

// ---------------------------------------------------------------------------
// vertical
// ---------------------------------------------------------------------------

export const Vertical: StoryObj = {
  name: 'vertical',
  render: () => (
    <Example title='Vertical'>
      <Example.Item title={['Default vertical']}>
        <div style={{ height: '100px' }}>
          <Separator vertical />
        </div>
      </Example.Item>
    </Example>
  ),
  play: async ({ canvas }) => {
    const [el] = canvas.getAllByRole('separator')
    expect(el).toHaveAttribute('aria-orientation', 'vertical')
  }
}

// ---------------------------------------------------------------------------
// inset
// ---------------------------------------------------------------------------

export const Inset: StoryObj = {
  name: 'inset',
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Example title='Inset'>
        <Example.Item title={['No inset']}>
          <Separator inset='0' />
        </Example.Item>
        <Example.Item title={['Inset 2']}>
          <Separator inset='2' />
        </Example.Item>
        <Example.Item title={['Inset 4']}>
          <Separator inset='4' />
        </Example.Item>
        <Example.Item title={['Inset 8']}>
          <Separator inset='8' />
        </Example.Item>
      </Example>
    </div>
  )
}

// ---------------------------------------------------------------------------
// children, contentPosition
// ---------------------------------------------------------------------------

export const ContentPosition: StoryObj = {
  name: 'children, contentPosition',
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Example title='Content position'>
        <Example.Item title={['Center (default)']}>
          <Separator contentPosition='center'>Centered label</Separator>
        </Example.Item>
        <Example.Item title={['Start']}>
          <Separator contentPosition='start'>Start label</Separator>
        </Example.Item>
        <Example.Item title={['End']}>
          <Separator contentPosition='end'>End label</Separator>
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
    <div data-testid='root' style={{ width: '400px' }}>
      <Separator className='test-classname' id='test-id' />
    </div>
  ),
  play: async ({ canvas }) => {
    const root = canvas.getByTestId('root').firstChild
    expect(root).toHaveClass('test-classname')
    expect(root).toHaveAttribute('id', 'test-id')
  }
}
