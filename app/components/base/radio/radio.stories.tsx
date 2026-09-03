import type { Meta, StoryObj } from '@storybook/react-vite'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, fn, userEvent } from 'storybook/test'
import { Example } from '#/components/storyblock'
import { RadioGroup } from './radio-group.component'
import { Radio } from './radio.component'

export default {
  title: 'Base Components/Radio',
  component: Radio,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Radio>

function radioInputs(container: HTMLElement): HTMLInputElement[] {
  return Array.from(container.querySelectorAll('input[type="radio"]'))
}

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

interface PlaygroundArgs {
  size: 'small' | 'medium' | 'large'
  hasError: boolean
  disabled: boolean
  handleChange: ReturnType<typeof fn>
}

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { size: 'medium', hasError: false, disabled: false, handleChange: fn() },
  argTypes: {
    size: { control: { type: 'inline-radio' }, options: ['small', 'medium', 'large'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  render: (args) => {
    const { handleChange, ...rest } = args
    return (
      <RadioGroup defaultValue='medium' onValueChange={handleChange}>
        <Radio {...rest} value='small'>
          Small
        </Radio>
        <Radio {...rest} value='medium'>
          Medium
        </Radio>
        <Radio {...rest} value='large'>
          Large
        </Radio>
      </RadioGroup>
    )
  }
}

// ---------------------------------------------------------------------------
// size
// ---------------------------------------------------------------------------

export const Size: StoryObj = {
  name: 'size',
  render: () => (
    <Example title='Sizes'>
      <Example.Item title={['Small']}>
        <RadioGroup defaultValue='small'>
          <Radio size='small' value='small'>
            Small
          </Radio>
        </RadioGroup>
      </Example.Item>
      <Example.Item title={['Medium']}>
        <RadioGroup defaultValue='medium'>
          <Radio size='medium' value='medium'>
            Medium
          </Radio>
        </RadioGroup>
      </Example.Item>
      <Example.Item title={['Large']}>
        <RadioGroup defaultValue='large'>
          <Radio size='large' value='large'>
            Large
          </Radio>
        </RadioGroup>
      </Example.Item>
    </Example>
  ),
  play: ({ canvas }) => {
    expect(canvas.getAllByRole('radio').length).toBe(3)
  }
}

// ---------------------------------------------------------------------------
// hasError
// ---------------------------------------------------------------------------

export const HasError: StoryObj = {
  name: 'hasError',
  render: () => (
    <Example title='Error'>
      <Example.Item title={['hasError']}>
        <RadioGroup hasError defaultValue='a'>
          <Radio value='a'>Choose this option</Radio>
        </RadioGroup>
      </Example.Item>
    </Example>
  ),
  play: ({ canvas }) => {
    expect(canvas.getAllByRole('radio').length).toBe(1)
  }
}

// ---------------------------------------------------------------------------
// name, value
// ---------------------------------------------------------------------------

export const NameValue: StoryObj = {
  name: 'name, value',
  render: () => (
    <RadioGroup name='test-name'>
      <Radio value='test-value'>Content</Radio>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const [input] = radioInputs(canvasElement)
    expect(input).toHaveAttribute('value', 'test-value')
    expect(input).toHaveAttribute('name', 'test-name')
    expect(input).not.toBeChecked()
  }
}

// ---------------------------------------------------------------------------
// value, controlled
// ---------------------------------------------------------------------------

export const Value: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
  name: 'value, controlled',
  args: { handleChange: fn() },
  render: (args) => (
    <RadioGroup name='test-name' value='test-value' onValueChange={args.handleChange}>
      <Radio value='test-value'>Content</Radio>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const [input] = radioInputs(canvasElement)
    expect(input).toBeChecked()
  }
}

// ---------------------------------------------------------------------------
// defaultValue, uncontrolled
// ---------------------------------------------------------------------------

export const DefaultValue: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
  name: 'defaultValue, uncontrolled',
  args: { handleChange: fn() },
  render: (args) => (
    <RadioGroup name='test-name' defaultValue='test-value' onValueChange={args.handleChange}>
      <Radio value='test-value'>Content</Radio>
    </RadioGroup>
  ),
  play: async ({ canvasElement, args }) => {
    const [input] = radioInputs(canvasElement)
    expect(input).toBeChecked()
    await userEvent.click(input!)
    expect(args.handleChange).toHaveBeenCalledTimes(1)
    expect(args.handleChange).toHaveBeenCalledWith(
      'test-value',
      expect.objectContaining({ reason: 'none', event: expect.objectContaining({ target: input }) })
    )
    expect(input).toBeChecked()
  }
}

// ---------------------------------------------------------------------------
// disabled
// ---------------------------------------------------------------------------

export const Disabled: StoryObj = {
  name: 'disabled',
  render: () => (
    <Example title='Disabled'>
      <RadioGroup disabled defaultValue='a'>
        <Radio value='a'>Disabled</Radio>
        <Radio value='b'>Disabled checked</Radio>
      </RadioGroup>
    </Example>
  ),
  play: ({ canvasElement }) => {
    const inputs = radioInputs(canvasElement)
    expect(inputs[0]!).toBeDisabled()
  }
}

// ---------------------------------------------------------------------------
// className, attributes
// ---------------------------------------------------------------------------

export const ClassName: StoryObj = {
  name: 'className, attributes',
  render: () => (
    <RadioGroup defaultValue='a'>
      <Radio className='test-classname' attributes={{ id: 'test-id' }} value='a'>
        Content
      </Radio>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-slot="radio"]')!
    expect(root).toHaveClass('test-classname')
    expect(root).toHaveAttribute('id', 'test-id')
  }
}
