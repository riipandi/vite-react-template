import type { StoryObj } from '@storybook/react-vite'
import { IconAdd, IconCheck, IconArrowRight, IconDelete, IconSubtract } from 'obra-icons-react'
import { expect, fn, userEvent } from 'storybook/test'
import { Example } from '#/components/storyblock'
import { Button, ButtonGroup } from './button.component'

export default {
  title: 'Base Components/Button',
  component: Button,
  parameters: { layout: 'fullscreen' }
}

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: StoryObj = {
  args: { color: 'primary', variant: 'solid', onClick: fn() },
  render: (args) => <Button {...args}>Button</Button>
}

// ---------------------------------------------------------------------------
// variant, color
// ---------------------------------------------------------------------------

export const VariantAndColor: StoryObj = {
  name: 'variant, color',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Example title='Solid'>
        <Button>Neutral</Button>
        <Button color='primary'>Primary</Button>
        <Button color='critical'>Critical</Button>
        <Button color='positive'>Positive</Button>
      </Example>
      <Example title='Outline'>
        <Button variant='outline'>Neutral</Button>
        <Button variant='outline' color='primary'>
          Primary
        </Button>
        <Button variant='outline' color='critical'>
          Critical
        </Button>
        <Button variant='outline' color='positive'>
          Positive
        </Button>
      </Example>
      <Example title='Ghost'>
        <Button variant='ghost'>Neutral</Button>
        <Button variant='ghost' color='primary'>
          Primary
        </Button>
        <Button variant='ghost' color='critical'>
          Critical
        </Button>
        <Button variant='ghost' color='positive'>
          Positive
        </Button>
      </Example>
    </div>
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
        <Button size='small'>Small</Button>
      </Example.Item>
      <Example.Item title={['Medium']}>
        <Button size='medium'>Medium</Button>
      </Example.Item>
      <Example.Item title={['Large']}>
        <Button size='large'>Large</Button>
      </Example.Item>
      <Example.Item title={['XLarge']}>
        <Button size='xlarge'>XLarge</Button>
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// icon
// ---------------------------------------------------------------------------

export const Icon: StoryObj = {
  name: 'icon',
  render: () => (
    <Example title='Icons'>
      <Example.Item title={['Start icon']}>
        <Button icon={<IconAdd size={16} />}>Add Item</Button>
      </Example.Item>
      <Example.Item title={['End icon']}>
        <Button endIcon={<IconArrowRight size={16} />}>Continue</Button>
      </Example.Item>
      <Example.Item title={['Both icons']}>
        <Button icon={<IconSubtract size={16} />} endIcon={<IconAdd size={16} />}>
          Adjust
        </Button>
      </Example.Item>
      <Example.Item title={['Icon only']}>
        <Button icon={<IconDelete size={16} />} aria-label='Delete' />
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// raised
// ---------------------------------------------------------------------------

export const Raised: StoryObj = {
  name: 'raised',
  render: () => (
    <Example title='Raised'>
      <Button raised>Button</Button>
      <Button raised color='primary'>
        Button
      </Button>
      <Button raised variant='outline'>
        Button
      </Button>
      <Button raised variant='ghost'>
        Button
      </Button>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// rounded
// ---------------------------------------------------------------------------

export const Rounded: StoryObj = {
  name: 'rounded',
  render: () => (
    <Example title='Rounded'>
      <Button rounded>Rounded</Button>
      <Button rounded color='primary'>
        Rounded
      </Button>
      <Button rounded variant='outline'>
        Rounded
      </Button>
      <Button rounded variant='ghost'>
        Rounded
      </Button>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// fullWidth
// ---------------------------------------------------------------------------

export const FullWidth: StoryObj = {
  name: 'fullWidth',
  render: () => (
    <div style={{ width: '300px' }}>
      <Button fullWidth>Full Width Button</Button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// loading
// ---------------------------------------------------------------------------

export const Loading: StoryObj = {
  name: 'loading',
  render: () => (
    <Example title='Loading'>
      <Button loading loadingAriaLabel='Loading'>
        Button
      </Button>
      <Button loading loadingAriaLabel='Loading' color='primary'>
        Button
      </Button>
      <Button loading loadingAriaLabel='Loading' variant='outline'>
        Button
      </Button>
      <Button loading loadingAriaLabel='Loading' icon={<IconCheck size={16} />}>
        Button
      </Button>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// highlighted
// ---------------------------------------------------------------------------

export const Highlighted: StoryObj = {
  name: 'highlighted',
  render: () => (
    <Example title='Highlighted'>
      <Button highlighted>Highlighted</Button>
      <Button highlighted color='primary'>
        Highlighted
      </Button>
      <Button highlighted variant='outline'>
        Highlighted
      </Button>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// disabled
// ---------------------------------------------------------------------------

export const Disabled: StoryObj = {
  name: 'disabled',
  render: () => (
    <Example title='Disabled'>
      <Button disabled>Disabled</Button>
      <Button disabled color='primary'>
        Disabled
      </Button>
      <Button disabled variant='outline'>
        Disabled
      </Button>
      <Button disabled variant='ghost'>
        Disabled
      </Button>
    </Example>
  ),
  play: ({ canvas }) => {
    const el = canvas.getAllByRole('button')[0]
    expect(el).toBeDisabled()
  }
}

// ---------------------------------------------------------------------------
// test: onClick
// ---------------------------------------------------------------------------

export const OnClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
  name: 'onClick',
  args: { handleClick: fn() },
  render: (args) => <Button onClick={args.handleClick}>Click me</Button>,
  play: async ({ canvas, args }) => {
    const { handleClick } = args
    const buttons = canvas.getAllByRole('button')
    const el = buttons[0]
    if (el) {
      await userEvent.click(el)
      expect(el).toHaveAttribute('type', 'button')
      expect(handleClick).toHaveBeenCalledTimes(1)
    }
  }
}

// ---------------------------------------------------------------------------
// group
// ---------------------------------------------------------------------------

export const Group: StoryObj = {
  name: 'group',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Example title='Default Group'>
        <ButtonGroup>
          <Button>One</Button>
          <Button>Two</Button>
        </ButtonGroup>
      </Example>
      <Example title='Primary Group'>
        <ButtonGroup>
          <Button color='primary'>One</Button>
          <Button color='primary'>Two</Button>
          <Button color='primary'>Three</Button>
        </ButtonGroup>
      </Example>
      <Example title='Outline Group'>
        <ButtonGroup>
          <Button variant='outline'>One</Button>
          <Button variant='outline'>Two</Button>
          <Button variant='outline'>Three</Button>
        </ButtonGroup>
      </Example>
    </div>
  ),
  play: async ({ canvas }) => {
    const groups = canvas.getAllByRole('group')
    expect(groups.length).toBeGreaterThan(0)
  }
}
