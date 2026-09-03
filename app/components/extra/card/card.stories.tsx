import type { Meta, StoryObj } from '@storybook/react-vite'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'
import { expect, fn, userEvent } from 'storybook/test'
import { Example, Placeholder } from '#/components/storyblock'
import { Card } from './card.component'

export default {
  title: 'Extra Components/Card',
  component: Card,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Card>

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type Justify = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
interface PlaygroundArgs {
  padding: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  borderRadius: 'none' | 'small' | 'medium' | 'large'
  selected: boolean
  raised: boolean
  direction?: 'row' | 'column'
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  align?: Align
  justify?: Justify
  handleClick: ReturnType<typeof fn>
}

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    padding: 4,
    borderRadius: 'large',
    selected: false,
    raised: false,
    direction: 'column',
    gap: 4,
    align: 'start',
    justify: 'center',
    handleClick: fn()
  },
  argTypes: {
    padding: { control: { type: 'range', min: 0, max: 8, step: 1 } },
    borderRadius: {
      control: { type: 'inline-radio' },
      options: ['none', 'small', 'medium', 'large']
    },
    selected: { control: 'boolean' },
    raised: { control: 'boolean' },
    direction: { control: { type: 'inline-radio' }, options: ['row', 'column'] },
    gap: { control: { type: 'range', min: 0, max: 8, step: 1 } },
    align: {
      control: { type: 'inline-radio' },
      options: ['start', 'center', 'end', 'stretch', 'baseline']
    },
    justify: {
      control: { type: 'inline-radio' },
      options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']
    }
  },
  render: (args) => {
    const { handleClick, ...rest } = args
    return (
      <Card {...rest} onClick={handleClick}>
        <Placeholder w='100%' h={40} />
        <Placeholder w='100%' h={24} />
      </Card>
    )
  }
}

// ---------------------------------------------------------------------------
// padding
// ---------------------------------------------------------------------------

export const Padding: StoryObj = {
  name: 'padding',
  render: () => (
    <Example title='Padding'>
      <Example.Item title={['Padding 0']}>
        <Card padding={0}>
          <Placeholder w='100%' h={32} />
        </Card>
      </Example.Item>
      <Example.Item title={['Padding 2']}>
        <Card padding={2}>
          <Placeholder w='100%' h={32} />
        </Card>
      </Example.Item>
      <Example.Item title={['Padding 4']}>
        <Card padding={4}>
          <Placeholder w='100%' h={32} />
        </Card>
      </Example.Item>
      <Example.Item title={['Padding 8']}>
        <Card padding={8}>
          <Placeholder w='100%' h={32} />
        </Card>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// borderRadius
// ---------------------------------------------------------------------------

export const BorderRadius: StoryObj = {
  name: 'borderRadius',
  render: () => (
    <Example title='Border radius'>
      <Example.Item title={['None']}>
        <Card borderRadius='none'>
          <Placeholder w='100%' h={32} />
        </Card>
      </Example.Item>
      <Example.Item title={['Small']}>
        <Card borderRadius='small'>
          <Placeholder w='100%' h={32} />
        </Card>
      </Example.Item>
      <Example.Item title={['Medium']}>
        <Card borderRadius='medium'>
          <Placeholder w='100%' h={32} />
        </Card>
      </Example.Item>
      <Example.Item title={['Large']}>
        <Card borderRadius='large'>
          <Placeholder w='100%' h={32} />
        </Card>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// selected
// ---------------------------------------------------------------------------

export const Selected: StoryObj = {
  name: 'selected',
  render: () => {
    const [selected, setSelected] = useState(true)
    return (
      <Example title='Selected'>
        <Card selected={selected} onClick={() => setSelected((current) => !current)}>
          <Placeholder w='100%' h={40} />
        </Card>
      </Example>
    )
  }
}

// ---------------------------------------------------------------------------
// raised
// ---------------------------------------------------------------------------

export const Raised: StoryObj = {
  name: 'raised',
  render: () => (
    <Example title='Raised'>
      <Example.Item title={['Default']}>
        <Card>
          <Placeholder w='100%' h={32} />
        </Card>
      </Example.Item>
      <Example.Item title={['Raised']}>
        <Card raised>
          <Placeholder w='100%' h={32} />
        </Card>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// bleed
// ---------------------------------------------------------------------------

export const Bleed: StoryObj = {
  name: 'bleed',
  render: () => (
    <Example title='Bleed'>
      <Example.Item title={['Bleed 2']}>
        <Card padding={6} bleed={2}>
          <Placeholder w='100%' h={64} />
        </Card>
      </Example.Item>
      <Example.Item title={['Bleed 4']}>
        <Card padding={6} bleed={4}>
          <Placeholder w='100%' h={64} />
        </Card>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// layout
// ---------------------------------------------------------------------------

export const Layout: StoryObj = {
  name: 'height, direction, gap, align, justify',
  render: () => (
    <Example title='Layout'>
      <Example.Item title={['Column', 'gap 4', 'align center']}>
        <Card direction='column' gap={4} align='center'>
          <Placeholder w='100%' h={24} />
          <Placeholder w='60%' h={24} />
          <Placeholder w='80%' h={24} />
        </Card>
      </Example.Item>
      <Example.Item title={['Row', 'gap 2', 'justify space-between']}>
        <Card direction='row' gap={2} justify='space-between'>
          <Placeholder w={40} h={24} />
          <Placeholder w={40} h={24} />
          <Placeholder w={40} h={24} />
        </Card>
      </Example.Item>
      <Example.Item title={['Height full']}>
        <div style={{ display: 'flex', height: '120px', gap: '8px' }}>
          <Card height='full' align='end'>
            <Placeholder w='100%' h={48} />
          </Card>
          <Card height='full' align='center'>
            <Placeholder w='100%' h={48} />
          </Card>
        </div>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// onClick
// ---------------------------------------------------------------------------

export const OnClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
  name: 'onClick',
  args: { handleClick: fn() },
  render: (args) => (
    <Card onClick={args.handleClick}>
      <Placeholder w='100%' h={48}>
        Trigger
      </Placeholder>
    </Card>
  ),
  play: async ({ canvas, args }) => {
    const el = canvas.getAllByRole('button')[0]!
    await userEvent.click(el)
    expect(args.handleClick).toHaveBeenCalledTimes(1)
    expect(args.handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: el }))
  }
}

// ---------------------------------------------------------------------------
// href
// ---------------------------------------------------------------------------

export const Href: StoryObj = {
  name: 'href',
  render: () => (
    <Card href='https://reshaped.so'>
      <Placeholder w='100%' h={48}>
        Trigger
      </Placeholder>
    </Card>
  ),
  play: async ({ canvas }) => {
    const el = canvas.getByRole('link')
    expect(el).toHaveAttribute('href', 'https://reshaped.so')
  }
}

// ---------------------------------------------------------------------------
// as (render prop)
// ---------------------------------------------------------------------------

export const As: StoryObj = {
  name: 'as',
  render: () => (
    <Card render={<span data-testid='root' />}>
      <Placeholder w='100%' h={48} />
    </Card>
  ),
  play: ({ canvas }) => {
    const root = canvas.getByTestId('root')
    expect(root.tagName).toBe('SPAN')
  }
}

// ---------------------------------------------------------------------------
// className, attributes
// ---------------------------------------------------------------------------

export const ClassName: StoryObj = {
  name: 'className, attributes',
  render: () => (
    <Card className='test-classname' attributes={{ id: 'test-id' }}>
      <Placeholder w='100%' h={48} />
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-slot="card"]')!
    expect(root).toHaveClass('test-classname')
    expect(root).toHaveAttribute('id', 'test-id')
  }
}
