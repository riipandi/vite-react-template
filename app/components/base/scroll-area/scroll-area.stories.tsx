import type { Meta, StoryObj } from '@storybook/react-vite'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect } from 'storybook/test'
import { Example } from '#/components/storyblock'
import { ScrollArea } from './scroll-area.component'

export default {
  title: 'Base Components/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div
        {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}
        style={{ minHeight: '400px' }}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ScrollArea>

const lorem = (
  <>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only
      five centuries, but also the leap into electronic typesetting.
    </p>
    <p>
      It is a long established fact that a reader will be distracted by the readable content of a
      page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
      normal distribution of letters, as opposed to using Content here, content here.
    </p>
    <p>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
      classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
      Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
      words.
    </p>
    <p>
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered
      alteration in some form, by injected humour, or randomised words which don&apos;t look even
      slightly believable.
    </p>
    <p>
      The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
      interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also
      reproduced in their exact original form, accompanied by English versions.
    </p>
  </>
)

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

interface PlaygroundArgs {
  height: 1 | 2 | 3 | 4 | 5
  orientation: 'both' | 'vertical' | 'horizontal'
  scrollbarDisplay: 'hover' | 'scroll' | 'hidden'
  overscrollBehavior: 'auto' | 'contain' | 'none'
  fade: boolean
}

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    height: 4,
    orientation: 'both',
    scrollbarDisplay: 'hover',
    overscrollBehavior: 'auto',
    fade: false
  },
  argTypes: {
    height: { control: { type: 'inline-radio' }, options: [1, 2, 3, 4, 5] },
    orientation: {
      control: { type: 'inline-radio' },
      options: ['both', 'vertical', 'horizontal']
    },
    scrollbarDisplay: {
      control: { type: 'inline-radio' },
      options: ['hover', 'scroll', 'hidden']
    },
    overscrollBehavior: {
      control: { type: 'inline-radio' },
      options: ['auto', 'contain', 'none']
    },
    fade: { control: 'boolean' }
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{lorem}</div>
    </ScrollArea>
  )
}

// ---------------------------------------------------------------------------
// base
// ---------------------------------------------------------------------------

export const Base: StoryObj = {
  name: 'base',
  render: () => (
    <Example title='Base'>
      <ScrollArea height={4}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{lorem}</div>
      </ScrollArea>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// orientation
// ---------------------------------------------------------------------------

export const Orientation: StoryObj = {
  name: 'orientation',
  render: () => (
    <Example title='Orientation'>
      <Example.Item title={['Vertical']}>
        <ScrollArea orientation='vertical' height={4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{lorem}</div>
        </ScrollArea>
      </Example.Item>
      <Example.Item title={['Horizontal']}>
        <ScrollArea orientation='horizontal' height={3}>
          <div style={{ display: 'flex', gap: '0.75rem', width: 'max-content' }}>
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                style={{
                  width: '96px',
                  height: '96px',
                  flexShrink: 0,
                  background: '#eee',
                  borderRadius: '8px'
                }}
              >
                Item {index + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// scrollbarDisplay
// ---------------------------------------------------------------------------

export const ScrollbarDisplay: StoryObj = {
  name: 'scrollbarDisplay',
  render: () => (
    <Example title='Scrollbar display'>
      <Example.Item title={['Hover']}>
        <ScrollArea scrollbarDisplay='hover' height={3}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{lorem}</div>
        </ScrollArea>
      </Example.Item>
      <Example.Item title={['Scroll']}>
        <ScrollArea scrollbarDisplay='scroll' height={3}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{lorem}</div>
        </ScrollArea>
      </Example.Item>
      <Example.Item title={['Hidden']}>
        <ScrollArea scrollbarDisplay='hidden' height={3}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{lorem}</div>
        </ScrollArea>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// overscrollBehavior
// ---------------------------------------------------------------------------

export const OverscrollBehavior: StoryObj = {
  name: 'overscrollBehavior',
  render: () => (
    <Example title='Overscroll behavior'>
      <Example.Item title={['Contain']}>
        <ScrollArea overscrollBehavior='contain' height={4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{lorem}</div>
        </ScrollArea>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// fade
// ---------------------------------------------------------------------------

export const Fade: StoryObj = {
  name: 'fade',
  render: () => (
    <Example title='Fade'>
      <ScrollArea fade height={4}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{lorem}</div>
      </ScrollArea>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// height, maxHeight
// ---------------------------------------------------------------------------

export const Height: StoryObj = {
  name: 'height, maxHeight',
  render: () => (
    <Example title='Heights'>
      <Example.Item title={['Height 4']}>
        <ScrollArea height={4}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{lorem}</div>
        </ScrollArea>
      </Example.Item>
      <Example.Item title={['Max height 3']}>
        <ScrollArea maxHeight={3}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{lorem}</div>
        </ScrollArea>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// className, attributes
// ---------------------------------------------------------------------------

export const ClassName: StoryObj = {
  name: 'className, attributes',
  render: () => (
    <ScrollArea className='test-classname' attributes={{ id: 'test-id' }} height={3}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{lorem}</div>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-slot="scroll-area"]')!
    expect(root).toHaveClass('test-classname')
    expect(root).toHaveAttribute('id', 'test-id')
  }
}
