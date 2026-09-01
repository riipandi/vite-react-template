import type { StoryObj } from '@storybook/react-vite'
import { IconCheck, IconAdd, IconFavorite } from 'obra-icons-react'
import React from 'react'
import { expect, fn, userEvent } from 'storybook/test'
import { Example } from '#/components/storyblock'
import { Badge, BadgeContainer } from './badge.component'

export default {
  title: 'Extra Components/Badge',
  component: Badge,
  parameters: { layout: 'fullscreen' }
}

// ---------------------------------------------------------------------------
// variant, color
// ---------------------------------------------------------------------------

export const Color: StoryObj = {
  name: 'variant, color',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Example title='Solid'>
        <Badge>Neutral</Badge>
        <Badge color='primary'>Primary</Badge>
        <Badge color='critical'>Critical</Badge>
        <Badge color='positive'>Positive</Badge>
        <Badge color='warning'>Warning</Badge>
      </Example>
      <Example title='Faded'>
        <Badge variant='faded'>Neutral</Badge>
        <Badge variant='faded' color='primary'>
          Primary
        </Badge>
        <Badge variant='faded' color='critical'>
          Critical
        </Badge>
        <Badge variant='faded' color='positive'>
          Positive
        </Badge>
        <Badge variant='faded' color='warning'>
          Warning
        </Badge>
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
        <Badge size='small'>Small</Badge>
      </Example.Item>
      <Example.Item title={['Medium']}>
        <Badge size='medium'>Medium</Badge>
      </Example.Item>
      <Example.Item title={['Large']}>
        <Badge size='large'>Large</Badge>
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
        <Badge icon={<IconCheck size={12} />}>Completed</Badge>
      </Example.Item>
      <Example.Item title={['End icon']}>
        <Badge endIcon={<IconAdd size={12} />}>Add</Badge>
      </Example.Item>
      <Example.Item title={['Both icons']}>
        <Badge icon={<IconCheck size={12} />} endIcon={<IconFavorite size={12} />}>
          Favorite
        </Badge>
      </Example.Item>
      <Example.Item title={['Icon only (touch hitbox)']}>
        <Badge icon={<IconCheck size={12} />} size='large' />
      </Example.Item>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// onDismiss, dismissAriaLabel
// ---------------------------------------------------------------------------

export const OnDismiss: StoryObj<{ handleDismiss: ReturnType<typeof fn> }> = {
  name: 'onDismiss, dismissAriaLabel',
  args: { handleDismiss: fn() },
  render: (args) => (
    <Example title='Dismiss'>
      <Example.Item title={['With dismiss']}>
        <Badge onDismiss={args.handleDismiss} dismissAriaLabel='Dismiss'>
          Dismissible
        </Badge>
      </Example.Item>
      <Example.Item title={['Primary with dismiss']}>
        <Badge color='primary' onDismiss={args.handleDismiss} dismissAriaLabel='Dismiss'>
          Dismissible
        </Badge>
      </Example.Item>
    </Example>
  ),
  play: async ({ canvas, args }) => {
    const buttons = canvas.getAllByRole('button')
    const dismissTrigger = buttons[0]
    if (dismissTrigger) {
      await userEvent.click(dismissTrigger)
      expect(dismissTrigger).toHaveAccessibleName('Dismiss')
      expect(args.handleDismiss).toHaveBeenCalledTimes(1)
    }
  }
}

// ---------------------------------------------------------------------------
// rounded
// ---------------------------------------------------------------------------

export const Rounded: StoryObj = {
  name: 'rounded',
  render: () => (
    <Example title='Rounded'>
      <Badge rounded>Badge</Badge>
      <Badge rounded color='primary'>
        Badge
      </Badge>
      <Badge rounded icon={<IconCheck size={12} />}>
        2
      </Badge>
      <Badge rounded icon={<IconCheck size={12} />} color='primary'>
        2
      </Badge>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// empty
// ---------------------------------------------------------------------------

export const Empty: StoryObj = {
  name: 'empty',
  render: () => (
    <Example title='Empty (dot)'>
      <Example.Item title={['Small']}>
        <Badge size='small' />
      </Example.Item>
      <Example.Item title={['Medium']}>
        <Badge size='medium' />
      </Example.Item>
      <Example.Item title={['Large']}>
        <Badge size='large' />
      </Example.Item>
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
      <Badge highlighted>Badge</Badge>
      <Badge highlighted color='primary'>
        Badge
      </Badge>
    </Example>
  )
}

// ---------------------------------------------------------------------------
// container
// ---------------------------------------------------------------------------

export const Container: StoryObj = {
  name: 'container',
  render: () => {
    const [hidden, setHidden] = React.useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <button type='button' onClick={() => setHidden(!hidden)}>
          Toggle badges
        </button>
        <Example title='Container positions'>
          <Example.Item title={['Top end']}>
            <BadgeContainer position='top-end'>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#e5e5e5',
                  borderRadius: '8px'
                }}
              />
              <Badge hidden={hidden}>5</Badge>
            </BadgeContainer>
          </Example.Item>
          <Example.Item title={['Bottom end']}>
            <BadgeContainer position='bottom-end'>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#e5e5e5',
                  borderRadius: '8px'
                }}
              />
              <Badge hidden={hidden}>5</Badge>
            </BadgeContainer>
          </Example.Item>
          <Example.Item title={['Overlap']}>
            <BadgeContainer position='top-end' overlap>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#e5e5e5',
                  borderRadius: '50%'
                }}
              />
              <Badge hidden={hidden}>123</Badge>
            </BadgeContainer>
          </Example.Item>
        </Example>
      </div>
    )
  }
}

// ---------------------------------------------------------------------------
// onClick
// ---------------------------------------------------------------------------

export const OnClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
  name: 'onClick',
  args: { handleClick: fn() },
  render: (args) => (
    <Badge onClick={args.handleClick} color='primary'>
      Clickable
    </Badge>
  ),
  play: async ({ canvas, args }) => {
    const buttons = canvas.getAllByRole('button')
    const button = buttons[0]
    if (button) {
      await userEvent.click(button)
      expect(args.handleClick).toHaveBeenCalledTimes(1)
    }
  }
}

// ---------------------------------------------------------------------------
// className, attributes
// ---------------------------------------------------------------------------

export const ClassName: StoryObj = {
  name: 'className, attributes',
  render: () => (
    <div data-testid='root'>
      <Badge className='test-classname' id='test-id'>
        Badge
      </Badge>
    </div>
  ),
  play: async ({ canvas }) => {
    const root = canvas.getByTestId('root').firstChild
    expect(root).toHaveClass('test-classname')
    expect(root).toHaveAttribute('id', 'test-id')
  }
}

// ---------------------------------------------------------------------------
// test: animated
// ---------------------------------------------------------------------------

export const Animated: StoryObj = {
  name: 'test: animated',
  render: () => {
    const [active, setActive] = React.useState(false)
    return (
      <Badge onClick={() => setActive(!active)} color={active ? 'primary' : 'neutral'}>
        Badge
      </Badge>
    )
  }
}
