import type { StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Example } from '#/components/storyblock'
import { Text } from './text.component'

export default {
  title: 'Extra Components/Text',
  component: Text,
  parameters: { layout: 'fullscreen' }
}

// ---------------------------------------------------------------------------
// variant
// ---------------------------------------------------------------------------

export const Variant: StoryObj = {
  name: 'variant',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Example title='Headline'>
        <Text variant='headline-1'>Headline 1</Text>
        <Text variant='headline-2'>Headline 2</Text>
        <Text variant='headline-3'>Headline 3</Text>
      </Example>
      <Example title='Featured'>
        <Text variant='featured-1'>Featured 1</Text>
        <Text variant='featured-2'>Featured 2</Text>
        <Text variant='featured-3'>Featured 3</Text>
        <Text variant='featured-4'>Featured 4</Text>
        <Text variant='featured-5'>Featured 5</Text>
        <Text variant='featured-6'>Featured 6</Text>
      </Example>
      <Example title='Body'>
        <Text variant='body-1'>Body 1</Text>
        <Text variant='body-2'>Body 2</Text>
      </Example>
      <Example title='Caption'>
        <Text variant='caption-1'>Caption 1</Text>
        <Text variant='caption-2'>Caption 2</Text>
      </Example>
    </div>
  )
}

// ---------------------------------------------------------------------------
// weight
// ---------------------------------------------------------------------------

export const Weight: StoryObj = {
  name: 'weight',
  render: () => (
    <Example title='Weight'>
      <Text variant='body-1' weight='regular'>
        Regular
      </Text>
      <Text variant='body-1' weight='medium'>
        Medium
      </Text>
      <Text variant='body-1' weight='semibold'>
        Semibold
      </Text>
      <Text variant='body-1' weight='bold'>
        Bold
      </Text>
      <Text variant='body-1' weight='extrabold'>
        Extrabold
      </Text>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// color
// ---------------------------------------------------------------------------

export const Color: StoryObj = {
  name: 'color',
  render: () => (
    <Example title='Color'>
      <Text variant='body-1' color='neutral'>
        Neutral
      </Text>
      <Text variant='body-1' color='neutral-faded'>
        Faded
      </Text>
      <Text variant='body-1' color='positive'>
        Positive
      </Text>
      <Text variant='body-1' color='warning'>
        Warning
      </Text>
      <Text variant='body-1' color='critical'>
        Critical
      </Text>
      <Text variant='body-1' color='primary'>
        Primary
      </Text>
      <Text variant='body-1' color='disabled'>
        Disabled
      </Text>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// decoration
// ---------------------------------------------------------------------------

export const Decoration: StoryObj = {
  name: 'decoration',
  render: () => (
    <Example title='Decoration'>
      <Text variant='body-1' decoration='line-through'>
        Line through
      </Text>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// wrap
// ---------------------------------------------------------------------------

export const Wrap: StoryObj = {
  name: 'wrap',
  render: () => (
    <div style={{ maxWidth: '300px' }}>
      <Example title='Wrap'>
        <Text variant='body-1' wrap='balance'>
          The design system you want to build
        </Text>
      </Example>
    </div>
  )
}

// ---------------------------------------------------------------------------
// monospace
// ---------------------------------------------------------------------------

export const Monospace: StoryObj = {
  name: 'monospace',
  render: () => (
    <Example title='Monospace'>
      <Text variant='body-1' monospace>
        Content
      </Text>
      <Text variant='body-1'>Content</Text>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// maxLines
// ---------------------------------------------------------------------------

export const MaxLines: StoryObj = {
  name: 'maxLines',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Example title='MaxLines'>
        <Text variant='body-1' maxLines={3}>
          There are many variations of passages of Lorem Ipsum available, but the majority have
          suffered alteration in some form, by injected humour, or randomised words which don't look
          even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
          sure there isn't anything embarrassing hidden in the middle of text.
        </Text>
      </Example>
    </div>
  )
}

// ---------------------------------------------------------------------------
// numeric
// ---------------------------------------------------------------------------

export const Numeric: StoryObj = {
  name: 'numeric',
  render: () => (
    <Example title='Numeric'>
      <Text variant='body-1' numeric>
        1234567890
      </Text>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// align
// ---------------------------------------------------------------------------

export const Align: StoryObj = {
  name: 'align',
  render: () => (
    <div style={{ maxWidth: '300px' }}>
      <Example title='Align'>
        <Text variant='body-1' align='start'>
          Text content
        </Text>
        <Text variant='body-1' align='center'>
          Text content
        </Text>
        <Text variant='body-1' align='end'>
          Text content
        </Text>
      </Example>
    </div>
  )
}

// ---------------------------------------------------------------------------
// render (polymorphism)
// ---------------------------------------------------------------------------

export const Render: StoryObj = {
  name: 'render',
  render: () => (
    <Example title='Render prop'>
      <Text variant='body-1' render={<p />}>
        Content as paragraph
      </Text>
      <Text variant='body-1' render={<span />}>
        Content as span
      </Text>
      <Text variant='body-1' render={<strong />}>
        Content as strong
      </Text>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// className, attributes
// ---------------------------------------------------------------------------

export const ClassName: StoryObj = {
  name: 'className, attributes',
  render: () => (
    <div data-testid='root'>
      <Text variant='body-1' className='test-classname' id='test-id'>
        Content
      </Text>
    </div>
  ),
  play: async ({ canvas }) => {
    const root = canvas.getByTestId('root').firstChild
    expect(root).toHaveClass('test-classname')
    expect(root).toHaveAttribute('id', 'test-id')
  }
}
