import type { Meta, StoryObj } from '@storybook/react-vite'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { IconUser } from 'obra-icons-react'
import { expect } from 'storybook/test'
import { Example } from '#/components/storyblock'
import { Avatar } from './avatar.component'

const imgUrl =
  'https://images.unsplash.com/photo-1632502361954-0dd92ce797db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80'

export default {
  title: 'Base Components/Avatar',
  component: Avatar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Avatar>

// ---------------------------------------------------------------------------
// src, alt
// ---------------------------------------------------------------------------

export const Src: StoryObj = {
  name: 'src, alt',
  render: () => (
    <Example>
      <Example.Item title={['Circular']}>
        <Avatar src={imgUrl} alt='Amsterdam canal' />
      </Example.Item>
      <Example.Item title={['Rounded']}>
        <Avatar src={imgUrl} alt='Amsterdam canal' squared />
      </Example.Item>
    </Example>
  ),
  play: ({ canvas }) => {
    const presentation = canvas.getByRole('presentation')
    const img = canvas.getByRole('img')
    expect(presentation).toBeInTheDocument()
    expect(img).toBeInTheDocument()
    expect(img).toHaveAccessibleName('Amsterdam canal')
  }
}

// ---------------------------------------------------------------------------
// initials, icon
// ---------------------------------------------------------------------------

export const Initials: StoryObj = {
  name: 'initials, icon',
  render: () => (
    <Example>
      <Example.Item title={['Initials']}>
        <Avatar initials='JD' />
      </Example.Item>
      <Example.Item title={['Icon']}>
        <Avatar icon={<IconUser />} />
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// size
// ---------------------------------------------------------------------------

export const Size: StoryObj = {
  name: 'size',
  render: () => (
    <Example title='Sizes'>
      <Example.Item title={['Small']}>
        <Avatar src={imgUrl} alt='User' size='small' />
      </Example.Item>
      <Example.Item title={['Medium']}>
        <Avatar src={imgUrl} alt='User' size='medium' />
      </Example.Item>
      <Example.Item title={['Large']}>
        <Avatar src={imgUrl} alt='User' size='large' />
      </Example.Item>
      <Example.Item title={['XLarge']}>
        <Avatar src={imgUrl} alt='User' size='xlarge' />
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// squared
// ---------------------------------------------------------------------------

export const Squared: StoryObj = {
  name: 'squared',
  render: () => (
    <Example title='Squared'>
      <Example.Item title={['Circular']}>
        <Avatar src={imgUrl} alt='User' />
      </Example.Item>
      <Example.Item title={['Rounded']}>
        <Avatar src={imgUrl} alt='User' squared />
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// color, variant
// ---------------------------------------------------------------------------

export const Colors: StoryObj = {
  name: 'color, variant',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Example title='Solid'>
        <Example.Item title={['Neutral']}>
          <Avatar initials='N' color='neutral' />
        </Example.Item>
        <Example.Item title={['Primary']}>
          <Avatar initials='P' color='primary' />
        </Example.Item>
        <Example.Item title={['Critical']}>
          <Avatar initials='C' color='critical' />
        </Example.Item>
        <Example.Item title={['Positive']}>
          <Avatar initials='+' color='positive' />
        </Example.Item>
        <Example.Item title={['Warning']}>
          <Avatar initials='W' color='warning' />
        </Example.Item>
      </Example>
      <Example title='Faded'>
        <Example.Item title={['Neutral']}>
          <Avatar initials='N' color='neutral' variant='faded' />
        </Example.Item>
        <Example.Item title={['Primary']}>
          <Avatar initials='P' color='primary' variant='faded' />
        </Example.Item>
        <Example.Item title={['Critical']}>
          <Avatar initials='C' color='critical' variant='faded' />
        </Example.Item>
        <Example.Item title={['Positive']}>
          <Avatar initials='+' color='positive' variant='faded' />
        </Example.Item>
        <Example.Item title={['Warning']}>
          <Avatar initials='W' color='warning' variant='faded' />
        </Example.Item>
      </Example>
    </div>
  )
}

// ---------------------------------------------------------------------------
// test: fallback
// ---------------------------------------------------------------------------

export const Fallback: StoryObj = {
  name: 'test: fallback',
  render: () => (
    <Example>
      <Example.Item title={['Fallback initials']}>
        <Avatar initials='AB' />
      </Example.Item>
      <Example.Item title={['Fallback icon']}>
        <Avatar icon={<IconUser />} />
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// renderImage
// ---------------------------------------------------------------------------

export const RenderImage: StoryObj = {
  name: 'renderImage',
  render: () => (
    <Example title='renderImage'>
      <Example.Item title={['Custom image render']}>
        <Avatar
          src={imgUrl}
          alt='Amsterdam canal'
          renderImage={(props) => (
            // oxlint-disable-next-line jsx-a11y/alt-text
            <img
              {...props}
              id='test-image'
              className={typeof props.className === 'string' ? props.className : undefined}
              style={{ ...props.style, borderRadius: '8px' }}
            />
          )}
        />
      </Example.Item>
    </Example>
  ),
  play: ({ canvas }) => {
    const img = canvas.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAccessibleName('Amsterdam canal')
    expect(img).toHaveAttribute('id', 'test-image')
  }
}

// ---------------------------------------------------------------------------
// className, attributes, imageAttributes
// ---------------------------------------------------------------------------

export const ClassName: StoryObj = {
  name: 'className, attributes, imageAttributes',
  render: () => (
    <div data-testid='root'>
      <Avatar
        src={imgUrl}
        alt='test image'
        className='test-classname'
        id='test-id'
        imageAttributes={{ id: 'test-image-id' }}
      />
    </div>
  ),
  play: async ({ canvas }) => {
    const root = canvas.getByTestId('root').firstChild
    const img = canvas.getByRole('img')
    expect(root).toHaveClass('test-classname')
    expect(root).toHaveAttribute('id', 'test-id')
    expect(img).toHaveAttribute('id', 'test-image-id')
    expect(img).toHaveAccessibleName('test image')
  }
}
