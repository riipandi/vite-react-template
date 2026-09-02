import type { Meta, StoryObj } from '@storybook/react-vite'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import React from 'react'
import { expect } from 'storybook/test'
import { Example, Placeholder } from '#/components/storyblock'
import { Text } from '../text/text.component'
import { View } from './view.component'

export default {
  title: 'Extra Components/View',
  component: View,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof View>

// ---------------------------------------------------------------------------
// padding
// ---------------------------------------------------------------------------

export const Padding: StoryObj = {
  name: 'padding',
  render: () => (
    <Example title='Padding'>
      <Example.Item title={['Padding 2']}>
        <View padding='2' backgroundColor='neutral-faded'>
          Content
        </View>
      </Example.Item>
      <Example.Item title={['Padding 4']}>
        <View padding='4' backgroundColor='neutral-faded'>
          Content
        </View>
      </Example.Item>
      <Example.Item title={['Padding 8']}>
        <View padding='8' backgroundColor='neutral-faded'>
          Content
        </View>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// direction
// ---------------------------------------------------------------------------

export const Direction: StoryObj = {
  name: 'direction',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Example title='Column (default)'>
        <View gap='2'>
          <Placeholder h={40}>Item 1</Placeholder>
          <Placeholder h={40}>Item 2</Placeholder>
          <Placeholder h={40}>Item 3</Placeholder>
        </View>
      </Example>
      <Example title='Row'>
        <View direction='row' gap='2'>
          <Placeholder h={40}>Item 1</Placeholder>
          <Placeholder h={40}>Item 2</Placeholder>
          <Placeholder h={40}>Item 3</Placeholder>
        </View>
      </Example>
      <Example title='Row reverse'>
        <View direction='row-reverse' gap='2'>
          <Placeholder h={40}>Item 1</Placeholder>
          <Placeholder h={40}>Item 2</Placeholder>
          <Placeholder h={40}>Item 3</Placeholder>
        </View>
      </Example>
    </div>
  )
}

// ---------------------------------------------------------------------------
// gap
// ---------------------------------------------------------------------------

export const Gap: StoryObj = {
  name: 'gap',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Example title='Gap 1'>
        <View gap='1' direction='row'>
          <Placeholder h={40}>Item 1</Placeholder>
          <Placeholder h={40}>Item 2</Placeholder>
        </View>
      </Example>
      <Example title='Gap 2'>
        <View gap='2' direction='row'>
          <Placeholder h={40}>Item 1</Placeholder>
          <Placeholder h={40}>Item 2</Placeholder>
        </View>
      </Example>
      <Example title='Gap 4'>
        <View gap='4' direction='row'>
          <Placeholder h={40}>Item 1</Placeholder>
          <Placeholder h={40}>Item 2</Placeholder>
        </View>
      </Example>
      <Example title='Gap 8'>
        <View gap='8' direction='row'>
          <Placeholder h={40}>Item 1</Placeholder>
          <Placeholder h={40}>Item 2</Placeholder>
        </View>
      </Example>
    </div>
  )
}

// ---------------------------------------------------------------------------
// align
// ---------------------------------------------------------------------------

export const Align: StoryObj = {
  name: 'align',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Example title='Start'>
        <View direction='row' align='start' gap='2' style={{ minHeight: '100px' }}>
          <Placeholder h={30}>Small</Placeholder>
          <Placeholder h={60}>Large</Placeholder>
        </View>
      </Example>
      <Example title='Center'>
        <View direction='row' align='center' gap='2' style={{ minHeight: '100px' }}>
          <Placeholder h={30}>Small</Placeholder>
          <Placeholder h={60}>Large</Placeholder>
        </View>
      </Example>
      <Example title='End'>
        <View direction='row' align='end' gap='2' style={{ minHeight: '100px' }}>
          <Placeholder h={30}>Small</Placeholder>
          <Placeholder h={60}>Large</Placeholder>
        </View>
      </Example>
    </div>
  )
}

// ---------------------------------------------------------------------------
// justify
// ---------------------------------------------------------------------------

export const Justify: StoryObj = {
  name: 'justify',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Example title='Start'>
        <View direction='row' justify='start' gap='2'>
          <Placeholder h={40}>Item 1</Placeholder>
          <Placeholder h={40}>Item 2</Placeholder>
        </View>
      </Example>
      <Example title='Center'>
        <View direction='row' justify='center' gap='2'>
          <Placeholder h={40}>Item 1</Placeholder>
          <Placeholder h={40}>Item 2</Placeholder>
        </View>
      </Example>
      <Example title='End'>
        <View direction='row' justify='end' gap='2'>
          <Placeholder h={40}>Item 1</Placeholder>
          <Placeholder h={40}>Item 2</Placeholder>
        </View>
      </Example>
      <Example title='Between'>
        <View direction='row' justify='between' gap='2'>
          <Placeholder h={40}>Item 1</Placeholder>
          <Placeholder h={40}>Item 2</Placeholder>
        </View>
      </Example>
    </div>
  )
}

// ---------------------------------------------------------------------------
// textAlign
// ---------------------------------------------------------------------------

export const TextAlign: StoryObj = {
  name: 'textAlign',
  render: () => (
    <div style={{ maxWidth: '300px' }}>
      <Example title='Text Align'>
        <View textAlign='start'>
          <Text variant='body-1'>Start aligned</Text>
        </View>
        <View textAlign='center'>
          <Text variant='body-1'>Center aligned</Text>
        </View>
        <View textAlign='end'>
          <Text variant='body-1'>End aligned</Text>
        </View>
      </Example>
    </div>
  )
}

// ---------------------------------------------------------------------------
// backgroundColor
// ---------------------------------------------------------------------------

export const BackgroundColor: StoryObj = {
  name: 'backgroundColor',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <View padding='4' backgroundColor='neutral-faded'>
        <Text variant='body-2'>neutral-faded</Text>
      </View>
      <View padding='4' backgroundColor='primary-faded'>
        <Text variant='body-2'>primary-faded</Text>
      </View>
      <View padding='4' backgroundColor='critical-faded'>
        <Text variant='body-2'>critical-faded</Text>
      </View>
      <View padding='4' backgroundColor='positive-faded'>
        <Text variant='body-2'>positive-faded</Text>
      </View>
      <View padding='4' backgroundColor='warning-faded'>
        <Text variant='body-2'>warning-faded</Text>
      </View>
    </div>
  )
}

// ---------------------------------------------------------------------------
// border
// ---------------------------------------------------------------------------

export const Border: StoryObj = {
  name: 'border',
  render: () => (
    <Example title='Border'>
      <Example.Item title={['Faded']}>
        <View padding='4' border='faded'>
          Content
        </View>
      </Example.Item>
      <Example.Item title={['Strong']}>
        <View padding='4' border='strong'>
          Content
        </View>
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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <View padding='4' border='faded' borderRadius='small'>
        <Text variant='body-2'>small</Text>
      </View>
      <View padding='4' border='faded' borderRadius='medium'>
        <Text variant='body-2'>medium</Text>
      </View>
      <View padding='4' border='faded' borderRadius='large'>
        <Text variant='body-2'>large</Text>
      </View>
      <View padding='4' border='faded' borderRadius='circular'>
        <Text variant='body-2'>circular</Text>
      </View>
    </div>
  )
}

// ---------------------------------------------------------------------------
// shadow
// ---------------------------------------------------------------------------

export const Shadow: StoryObj = {
  name: 'shadow',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <View padding='4' shadow='outline'>
        <Text variant='body-2'>outline</Text>
      </View>
      <View padding='4' shadow='raised'>
        <Text variant='body-2'>raised</Text>
      </View>
      <View padding='4' shadow='overlay'>
        <Text variant='body-2'>overlay</Text>
      </View>
    </div>
  )
}

// ---------------------------------------------------------------------------
// overflow
// ---------------------------------------------------------------------------

export const Overflow: StoryObj = {
  name: 'overflow',
  render: () => (
    <Example title='Overflow'>
      <Example.Item title={['Hidden']}>
        <View style={{ width: '150px', height: '50px' }} overflow='hidden'>
          <Text variant='body-1'>
            This is a very long text that should be hidden when it overflows the container.
          </Text>
        </View>
      </Example.Item>
      <Example.Item title={['Scroll']}>
        <View style={{ width: '150px', height: '50px' }} overflow='scroll'>
          <Text variant='body-1'>
            This is a very long text that should be scrollable when it overflows the container.
          </Text>
        </View>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// position
// ---------------------------------------------------------------------------

export const Position: StoryObj = {
  name: 'position',
  render: () => (
    <Example title='Position'>
      <Example.Item title={['Relative']}>
        <View position='relative' style={{ height: '100px' }}>
          <View position='absolute' inset='0' backgroundColor='neutral-faded' padding='2'>
            Absolute overlay
          </View>
        </View>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// divided
// ---------------------------------------------------------------------------

export const Divided: StoryObj = {
  name: 'divided',
  render: () => (
    <Example title='Divided'>
      <Example.Item title={['Column divided']}>
        <View divided gap='0'>
          <Placeholder h={40}>Item 1</Placeholder>
          <Placeholder h={40}>Item 2</Placeholder>
          <Placeholder h={40}>Item 3</Placeholder>
        </View>
      </Example.Item>
      <Example.Item title={['Row divided']}>
        <View direction='row' divided dividedDirection='row' gap='0'>
          <Placeholder h={40}>Item 1</Placeholder>
          <Placeholder h={40}>Item 2</Placeholder>
          <Placeholder h={40}>Item 3</Placeholder>
        </View>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// animated
// ---------------------------------------------------------------------------

export const Animated: StoryObj = {
  name: 'animated',
  render: () => {
    const [bg, setBg] = React.useState<'neutral-faded' | 'primary-faded'>('neutral-faded')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button
          type='button'
          onClick={() => setBg(bg === 'neutral-faded' ? 'primary-faded' : 'neutral-faded')}
        >
          Toggle background
        </button>
        <View padding='4' backgroundColor={bg} animated>
          <Text variant='body-1'>Content</Text>
        </View>
      </div>
    )
  }
}

// ---------------------------------------------------------------------------
// render (polymorphism)
// ---------------------------------------------------------------------------

export const Render: StoryObj = {
  name: 'render',
  render: () => (
    <Example title='Render prop'>
      <Example.Item title={['As section']}>
        <View render={<section />} padding='4' backgroundColor='neutral-faded'>
          <Text variant='body-1'>Rendered as section</Text>
        </View>
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
    <div data-testid='root'>
      <View className='test-classname' id='test-id' padding='4'>
        Content
      </View>
    </div>
  ),
  play: async ({ canvas }) => {
    const root = canvas.getByTestId('root').firstChild
    expect(root).toHaveClass('test-classname')
    expect(root).toHaveAttribute('id', 'test-id')
  }
}
