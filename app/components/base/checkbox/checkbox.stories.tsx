import type { Meta, StoryObj } from '@storybook/react-vite'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, fn, userEvent } from 'storybook/test'
import { Example } from '#/components/storyblock'
import { Checkbox } from './checkbox.component'

export default {
  title: 'Base Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Checkbox>

function checkboxInput(container: HTMLElement): HTMLInputElement {
  return container.querySelector('input[type="checkbox"]') as HTMLInputElement
}

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

interface PlaygroundArgs {
  size: 'small' | 'medium' | 'large'
  hasError: boolean
  disabled: boolean
  indeterminate: boolean
  name: string
  value: string
  handleChange: ReturnType<typeof fn>
}

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    size: 'medium',
    hasError: false,
    disabled: false,
    indeterminate: false,
    name: 'test-name',
    value: 'test-value',
    handleChange: fn()
  },
  argTypes: {
    size: { control: { type: 'inline-radio' }, options: ['small', 'medium', 'large'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' }
  },
  render: (args) => {
    const { handleChange, ...props } = args
    return (
      <Checkbox {...props} onCheckedChange={handleChange}>
        Accept terms and conditions
      </Checkbox>
    )
  }
}

// ---------------------------------------------------------------------------
// name, value
// ---------------------------------------------------------------------------

export const NameValue: StoryObj = {
  name: 'name, value',
  render: () => (
    <Checkbox name='test-name' value='test-value'>
      Content
    </Checkbox>
  ),
  play: async ({ canvasElement }) => {
    const input = checkboxInput(canvasElement)
    expect(input).toHaveAttribute('value', 'test-value')
    expect(input).toHaveAttribute('name', 'test-name')
    expect(input).not.toBeChecked()
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
        <Checkbox size='small'>Small</Checkbox>
      </Example.Item>
      <Example.Item title={['Medium']}>
        <Checkbox size='medium'>Medium</Checkbox>
      </Example.Item>
      <Example.Item title={['Large']}>
        <Checkbox size='large'>Large</Checkbox>
      </Example.Item>
    </Example>
  ),
  play: ({ canvas }) => {
    expect(canvas.getAllByRole('checkbox').length).toBe(3)
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
        <Checkbox hasError>Accept the terms to continue</Checkbox>
      </Example.Item>
      <Example.Item title={['hasError', 'Checked']}>
        <Checkbox hasError defaultChecked>
          Accept the terms to continue
        </Checkbox>
      </Example.Item>
    </Example>
  ),
  play: ({ canvas }) => {
    expect(canvas.getAllByRole('checkbox').length).toBe(2)
  }
}

// ---------------------------------------------------------------------------
// disabled
// ---------------------------------------------------------------------------

export const Disabled: StoryObj = {
  name: 'disabled',
  render: () => (
    <Example title='Disabled'>
      <Example.Item title={['Unchecked', 'Disabled']}>
        <Checkbox disabled>Disabled</Checkbox>
      </Example.Item>
      <Example.Item title={['Checked', 'Disabled']}>
        <Checkbox disabled defaultChecked>
          Disabled checked
        </Checkbox>
      </Example.Item>
      <Example.Item title={['Indeterminate', 'Disabled']}>
        <Checkbox disabled indeterminate>
          Disabled indeterminate
        </Checkbox>
      </Example.Item>
    </Example>
  ),
  play: ({ canvasElement }) => {
    const inputs = Array.from(canvasElement.querySelectorAll('input[type="checkbox"]'))
    expect(inputs[0]).toBeDisabled()
  }
}

// ---------------------------------------------------------------------------
// checked, controlled
// ---------------------------------------------------------------------------

export const Checked: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
  name: 'checked, controlled',
  args: { handleChange: fn() },
  render: (args) => (
    <Checkbox checked onCheckedChange={args.handleChange} name='test-name' value='test-value'>
      Content
    </Checkbox>
  ),
  play: async ({ canvasElement, args }) => {
    const input = checkboxInput(canvasElement)
    expect(input).toBeChecked()
    await userEvent.click(input)
    expect(args.handleChange).toHaveBeenCalledTimes(1)
    expect(args.handleChange).toHaveBeenCalledWith(
      false,
      expect.objectContaining({ reason: 'none', event: expect.objectContaining({ target: input }) })
    )
    // Still checked because it's controlled
    expect(input).toBeChecked()
  }
}

// ---------------------------------------------------------------------------
// defaultChecked, uncontrolled
// ---------------------------------------------------------------------------

export const DefaultChecked: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
  name: 'defaultChecked, uncontrolled',
  args: { handleChange: fn() },
  render: (args) => (
    <Checkbox
      defaultChecked
      onCheckedChange={args.handleChange}
      name='test-name'
      value='test-value'
    >
      Content
    </Checkbox>
  ),
  play: async ({ canvasElement, args }) => {
    const input = checkboxInput(canvasElement)
    expect(input).toBeChecked()
    await userEvent.click(input)
    expect(args.handleChange).toHaveBeenCalledTimes(1)
    expect(args.handleChange).toHaveBeenCalledWith(
      false,
      expect.objectContaining({ reason: 'none', event: expect.objectContaining({ target: input }) })
    )
    expect(input).not.toBeChecked()
  }
}

// ---------------------------------------------------------------------------
// indeterminate
// ---------------------------------------------------------------------------

export const Indeterminate: StoryObj = {
  name: 'indeterminate',
  render: () => <Checkbox indeterminate>Content</Checkbox>,
  play: async ({ canvasElement }) => {
    expect(checkboxInput(canvasElement).indeterminate).toBeTruthy()
  }
}

// ---------------------------------------------------------------------------
// className, attributes
// ---------------------------------------------------------------------------

export const ClassName: StoryObj = {
  name: 'className, attributes',
  render: () => (
    <Checkbox className='test-classname' attributes={{ id: 'test-id' }}>
      Content
    </Checkbox>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('label[data-slot="checkbox"]')!
    expect(root).toHaveClass('test-classname')
    expect(root).toHaveAttribute('id', 'test-id')
  }
}

// ---------------------------------------------------------------------------
// form integration
// ---------------------------------------------------------------------------

export const FormSubmission: StoryObj<{ submitData: ReturnType<typeof fn> }> = {
  name: 'form submission',
  args: { submitData: fn() },
  render: (args) => (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        args.submitData(new FormData(event.currentTarget).get('newsletter'))
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}
    >
      <Checkbox name='newsletter' value='yes' defaultChecked>
        Subscribe to the newsletter
      </Checkbox>
      <button type='submit'>Submit</button>
    </form>
  ),
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }))
    expect(args.submitData).toHaveBeenCalledWith('yes')
  }
}
