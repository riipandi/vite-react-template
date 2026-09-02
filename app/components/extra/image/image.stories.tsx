import type { Meta, StoryObj } from '@storybook/react-vite'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, fn, type Mock, waitFor } from 'storybook/test'
import { Example } from '#/components/storyblock'
import { Image } from './image.component'

const imgUrl =
  'https://images.unsplash.com/photo-1536880756060-98a6a140f0a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80'

export default {
  title: 'Extra Components/Image',
  component: Image,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Image>

// ---------------------------------------------------------------------------
// src, alt
// ---------------------------------------------------------------------------

export const Src: StoryObj = {
  name: 'src, alt',
  render: () => (
    <Example title='Source'>
      <Example.Item title={['With alt']}>
        <Image src={imgUrl} alt='Image alt' width='200px' height='200px' />
      </Example.Item>
      <Example.Item title={['Without alt (presentation)']}>
        <Image src={imgUrl} width='200px' height='200px' />
      </Example.Item>
    </Example>
  ),
  play: ({ canvas }) => {
    const img = canvas.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAccessibleName('Image alt')
  }
}

// ---------------------------------------------------------------------------
// width, height, maxWidth, aspectRatio
// ---------------------------------------------------------------------------

export const Size: StoryObj = {
  name: 'width, height, maxWidth, aspectRatio',
  render: () => (
    <Example title='Size'>
      <Example.Item title={['Fixed size']}>
        <Image src={imgUrl} alt='Photo' width='200px' height='150px' />
      </Example.Item>
      <Example.Item title={['Max width']}>
        <Image src={imgUrl} alt='Photo' maxWidth='300px' />
      </Example.Item>
      <Example.Item title={['Aspect ratio 16/9']}>
        <Image src={imgUrl} alt='Photo' aspectRatio='16 / 9' width='300px' />
      </Example.Item>
      <Example.Item title={['Aspect ratio 1/1']}>
        <Image src={imgUrl} alt='Photo' aspectRatio='1 / 1' width='200px' />
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
    <Example title='Border Radius'>
      <Example.Item title={['None']}>
        <Image src={imgUrl} alt='Photo' width='150px' height='150px' borderRadius='none' />
      </Example.Item>
      <Example.Item title={['Small']}>
        <Image src={imgUrl} alt='Photo' width='150px' height='150px' borderRadius='small' />
      </Example.Item>
      <Example.Item title={['Medium']}>
        <Image src={imgUrl} alt='Photo' width='150px' height='150px' borderRadius='medium' />
      </Example.Item>
      <Example.Item title={['Large']}>
        <Image src={imgUrl} alt='Photo' width='150px' height='150px' borderRadius='large' />
      </Example.Item>
      <Example.Item title={['Circular']}>
        <Image src={imgUrl} alt='Photo' width='150px' height='150px' borderRadius='circular' />
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// displayMode
// ---------------------------------------------------------------------------

export const DisplayMode: StoryObj = {
  name: 'displayMode',
  render: () => (
    <Example title='Display Mode'>
      <Example.Item title={['Cover (default)']}>
        <Image src={imgUrl} alt='Photo' width='200px' height='150px' displayMode='cover' />
      </Example.Item>
      <Example.Item title={['Contain']}>
        <Image src={imgUrl} alt='Photo' width='200px' height='150px' displayMode='contain' />
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// outline
// ---------------------------------------------------------------------------

export const Outline: StoryObj = {
  name: 'outline',
  render: () => (
    <Example title='Outline'>
      <Example.Item title={['With outline']}>
        <Image src={imgUrl} alt='Photo' width='200px' height='150px' outline />
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// onLoad
// ---------------------------------------------------------------------------

export const OnLoad: StoryObj<{ handleLoad: ReturnType<typeof fn> }> = {
  name: 'onLoad',
  args: { handleLoad: fn() },
  render: (args) => <Image src={imgUrl} alt='photo' width='200px' onLoad={args.handleLoad} />,
  play: async ({ args }) => {
    const { handleLoad } = args
    await waitFor(() => {
      expect(handleLoad).toHaveBeenCalledTimes(1)
    })
  }
}

// ---------------------------------------------------------------------------
// onError
// ---------------------------------------------------------------------------

export const OnError: StoryObj<{ handleError: Mock }> = {
  name: 'onError',
  args: { handleError: fn() },
  render: (args) => (
    <Image src='/invalid.png' alt='error' width='200px' onError={args.handleError} />
  ),
  play: async ({ args }) => {
    const { handleError } = args
    await waitFor(() => {
      expect(handleError).toHaveBeenCalledTimes(1)
    })
  }
}

// ---------------------------------------------------------------------------
// fallback
// ---------------------------------------------------------------------------

export const Fallback: StoryObj = {
  name: 'fallback',
  render: () => (
    <Example title='Fallback'>
      <Example.Item title={['String fallback']}>
        <Image src='/invalid.png' alt='error' fallback='error' width='200px' />
      </Example.Item>
      <Example.Item title={['ReactNode fallback']}>
        <Image
          src='/invalid.png'
          alt='error'
          fallback={<div style={{ padding: '1rem', background: '#f0f0f0' }}>Custom fallback</div>}
          width='200px'
        />
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
      <Example.Item title={['Custom render']}>
        <Image
          src={imgUrl}
          alt='Amsterdam canal'
          width='200px'
          height='150px'
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
      <Image
        src={imgUrl}
        alt='photo'
        width='200px'
        className='test-classname'
        id='test-id'
        imageAttributes={{ id: 'test-img-id' } as React.ComponentProps<'img'>}
      />
    </div>
  ),
  play: async ({ canvas }) => {
    const img = canvas.getByRole('img')
    const root = canvas.getByTestId('root').firstChild
    expect(root).toHaveClass('test-classname')
    expect(root).toHaveAttribute('id', 'test-id')
    expect(img).toHaveAttribute('id', 'test-img-id')
  }
}
