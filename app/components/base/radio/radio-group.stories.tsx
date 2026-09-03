import type { Meta, StoryObj } from '@storybook/react-vite'
import atoms from '@stylexjs/atoms'
import * as stylex from '@stylexjs/stylex'
import { expect, fn, userEvent } from 'storybook/test'
import { Example } from '#/components/storyblock'
import { RadioGroup } from './radio-group.component'
import { Radio } from './radio.component'

export default {
  title: 'Base Components/Radio Group',
  component: RadioGroup,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div {...stylex.props(atoms.padding['12px'], atoms.minWidth['448px'], atoms.width['100%'])}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof RadioGroup>

function radioInputs(container: HTMLElement): HTMLInputElement[] {
  return Array.from(container.querySelectorAll('input[type="radio"]'))
}

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

interface PlaygroundArgs {
  hasError: boolean
  disabled: boolean
  handleChange: ReturnType<typeof fn>
}

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { hasError: false, disabled: false, handleChange: fn() },
  argTypes: {
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  render: (args) => {
    const { handleChange, ...rest } = args
    return (
      <RadioGroup {...rest} defaultValue='a' onValueChange={handleChange}>
        <Radio value='a'>Option A</Radio>
        <Radio value='b'>Option B</Radio>
        <Radio value='c'>Option C</Radio>
      </RadioGroup>
    )
  }
}

// ---------------------------------------------------------------------------
// value, controlled
// ---------------------------------------------------------------------------

export const Value: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
  name: 'value, controlled',
  args: { handleChange: fn() },
  render: (args) => (
    <RadioGroup name='test-name' value='1' onValueChange={args.handleChange}>
      <Radio value='1'>Content</Radio>
      <Radio value='2'>Content 2</Radio>
    </RadioGroup>
  ),
  play: async ({ canvasElement, args }) => {
    const inputs = radioInputs(canvasElement)
    const first = inputs[0]!
    const second = inputs[1]!
    expect(first).toBeChecked()
    await userEvent.click(second)
    expect(args.handleChange).toHaveBeenCalledTimes(1)
    expect(args.handleChange).toHaveBeenCalledWith(
      '2',
      expect.objectContaining({
        reason: 'none',
        event: expect.objectContaining({ target: second })
      })
    )
    // Still controlled
    expect(first).toBeChecked()
    expect(second).not.toBeChecked()
  }
}

// ---------------------------------------------------------------------------
// defaultValue, uncontrolled
// ---------------------------------------------------------------------------

export const DefaultValue: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
  name: 'defaultValue, uncontrolled',
  args: { handleChange: fn() },
  render: (args) => (
    <RadioGroup name='test-name' defaultValue='1' onValueChange={args.handleChange}>
      <Radio value='1'>Content</Radio>
      <Radio value='2'>Content 2</Radio>
    </RadioGroup>
  ),
  play: async ({ canvasElement, args }) => {
    const inputs = radioInputs(canvasElement)
    const first = inputs[0]!
    const second = inputs[1]!
    expect(first).toBeChecked()
    await userEvent.click(second)
    expect(args.handleChange).toHaveBeenCalledTimes(1)
    expect(args.handleChange).toHaveBeenCalledWith(
      '2',
      expect.objectContaining({
        reason: 'none',
        event: expect.objectContaining({ target: second })
      })
    )
    expect(first).not.toBeChecked()
    expect(second).toBeChecked()
  }
}

// ---------------------------------------------------------------------------
// disabled
// ---------------------------------------------------------------------------

export const Disabled: StoryObj = {
  name: 'disabled',
  render: () => (
    <Example title='Disabled'>
      <RadioGroup disabled defaultValue='1'>
        <Radio value='1'>Item 1</Radio>
        <Radio value='2'>Item 2</Radio>
      </RadioGroup>
    </Example>
  ),
  play: ({ canvasElement }) => {
    const [input] = radioInputs(canvasElement)
    expect(input).toBeDisabled()
  }
}

// ---------------------------------------------------------------------------
// hasError
// ---------------------------------------------------------------------------

export const HasError: StoryObj = {
  name: 'hasError',
  render: () => (
    <Example title='Error'>
      <RadioGroup hasError defaultValue='1'>
        <Radio value='1'>Item 1</Radio>
        <Radio value='2'>Item 2</Radio>
      </RadioGroup>
    </Example>
  ),
  play: ({ canvas }) => {
    expect(canvas.getAllByRole('radio').length).toBe(2)
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
        args.submitData(new FormData(event.currentTarget).get('size'))
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}
    >
      <RadioGroup name='size' defaultValue='medium'>
        <Radio value='small'>Small</Radio>
        <Radio value='medium'>Medium</Radio>
        <Radio value='large'>Large</Radio>
      </RadioGroup>
      <button type='submit'>Submit</button>
    </form>
  ),
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }))
    expect(args.submitData).toHaveBeenCalledWith('medium')
  }
}
